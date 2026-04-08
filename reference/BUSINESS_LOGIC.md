# Builder Network — Business Logic Specification

---

## 1. Job Posting Flow (Full FSM)

### States & Transitions

```
                    ┌───────────┐
         ┌─────────│   DRAFT   │  (future: save partial jobs)
         │         └─────┬─────┘
         │               │ homeowner submits
         │               ▼
         │         ┌───────────┐
         │         │  ACTIVE   │◄──────────────────────┐
         │         └─────┬─────┘                       │
         │               │                              │
         │    ┌──────────┼──────────┐                  │
         │    │          │          │                   │
         │    │  at least 1         │                   │
         │    │  interested         │ homeowner         │
         │    │          │          │ cancels            │
         │    │          ▼          │                   │
         │    │  ┌─────────────┐   │                   │
         │    │  │SHORTLISTING │   │                   │
         │    │  └──────┬──────┘   │                   │
         │    │         │          │                   │
         │    │  homeowner         │                   │
         │    │  accepts a         ▼                   │
         │    │  quote     ┌─────────────┐             │
         │    │         │  │ CANCELLED   │             │
         │    │         │  └─────────────┘             │
         │    │         ▼                               │
         │    │  ┌─────────────┐                       │
         │    │  │ IN_PROGRESS │                       │
         │    │  └──────┬──────┘                       │
         │    │         │                               │
         │    │  homeowner marks                       │
         │    │  complete                               │
         │    │         ▼                               │
         │    │  ┌─────────────┐                       │
         │    │  │ COMPLETED   │                       │
         │    │  └──────┬──────┘                       │
         │    │         │                               │
         │    │  after review or                       │
         │    │  30 days                                │
         │    │         ▼                               │
         │    │  ┌─────────────┐                       │
         │    └─►│   CLOSED    │◄──────────────────────┘
         │       └─────────────┘   (auto: no interest after 14 days)
         │
         └────── homeowner cancels at any time ──► CANCELLED
```

### Transition Rules

| From | To | Trigger | Conditions |
|---|---|---|---|
| ACTIVE | SHORTLISTING | Auto | First tradesperson expresses interest |
| ACTIVE | CANCELLED | Homeowner | Any time |
| ACTIVE | CLOSED | Auto | 14 days with 0 interest |
| SHORTLISTING | IN_PROGRESS | Homeowner | Accepts a quote |
| SHORTLISTING | CANCELLED | Homeowner | Any time |
| IN_PROGRESS | COMPLETED | Homeowner | Marks job done |
| IN_PROGRESS | CANCELLED | Homeowner | Rare, requires confirmation |
| COMPLETED | CLOSED | Auto | Review submitted OR 30 days elapsed |
| Any (except COMPLETED) | CANCELLED | Homeowner | Explicit cancellation |

### Job Expiration Cron
- Runs daily at 02:00 UTC
- ACTIVE jobs with 0 leads interested after 14 days → CLOSED
- COMPLETED jobs older than 30 days without review → CLOSED

---

## 2. Tradesperson Matching Algorithm

### When a Job is Posted

```
Input:
  job.serviceSlug    — e.g. "plumbing"
  job.latitude       — from postcodes.io geocoding
  job.longitude
  job.tradeSlug?     — optional, more specific (e.g. "plumber")

Algorithm:
  1. Query tradesperson_profiles WHERE:
     a. EXISTS in tradesperson_services WHERE serviceSlug = job.serviceSlug
        (AND tradeSlug = job.tradeSlug IF provided)
     b. verificationStatus = 'APPROVED'  (only verified tradespeople)
     c. user.emailVerified = true

  2. For each candidate, calculate distance:
     distanceMiles = haversine(job.lat, job.lng, tp.lat, tp.lng)

  3. Filter: distanceMiles <= tp.workRadiusMiles

  4. For each matched tradesperson:
     - Create Lead row:
       { jobId, tradespersonId, status: AVAILABLE, creditCost, distanceMiles, expiresAt: now + 7d }
     - Calculate creditCost (see section 3)
     - Send notification (NEW_LEAD type)

  5. Return matchedCount to homeowner
```

### Haversine Formula (PostgreSQL)
```sql
-- Can be done as a Prisma raw query or PostGIS extension
SELECT *,
  (3959 * acos(
    cos(radians($lat)) * cos(radians(latitude)) *
    cos(radians(longitude) - radians($lng)) +
    sin(radians($lat)) * sin(radians(latitude))
  )) AS distance_miles
FROM tradesperson_profiles
WHERE ...
HAVING distance_miles <= work_radius_miles
ORDER BY distance_miles ASC;
```

### Match Ranking (for homeowner's "Recommended" view)
```
score = (0.4 × normalizedRating)
      + (0.3 × normalizedReviewCount)
      + (0.2 × (1 - normalizedDistance))
      + (0.1 × responseTimeScore)
```

---

## 3. Lead Credit System

### Credit Pricing Tiers

| Job Category | Credit Cost |
|---|---|
| Handyman / Small jobs | 3-5 credits |
| Standard trade (plumbing, electrical, tiling) | 8-12 credits |
| Large projects (extensions, loft conversions, new builds) | 15-25 credits |
| Specialist services (architectural, structural) | 20-30 credits |

### Pricing Algorithm
```typescript
function calculateCreditCost(serviceSlug: string, answersJson: Record<string, unknown>): number {
  const baseCost = SERVICE_CREDIT_MAP[serviceSlug] ?? 10;

  // Adjust based on job complexity signals
  let multiplier = 1.0;

  // If description length > 500 chars, likely a bigger job
  const descLength = (answersJson["description"] as string)?.length ?? 0;
  if (descLength > 500) multiplier += 0.2;

  // If has attachments, more serious inquiry
  if (answersJson["attachments"]) multiplier += 0.1;

  return Math.round(baseCost * multiplier);
}
```

### Credit Pack Options (Stripe Checkout)

| Pack | Credits | Price | Price/Credit |
|---|---|---|---|
| Starter | 25 | £25 | £1.00 |
| Standard | 60 | £50 | £0.83 |
| Pro | 150 | £100 | £0.67 |
| Enterprise | 400 | £200 | £0.50 |

### Deduction Rules
1. Credits deducted atomically when tradesperson calls `POST /leads/:id/express-interest`
2. If `balance < creditCost` → return 402 with `{ error: "INSUFFICIENT_CREDITS", required: creditCost, balance }`
3. Deduction is a database transaction:
```typescript
await prisma.$transaction(async (tx) => {
  const credit = await tx.leadCredit.findUnique({ where: { userId } });
  if (credit.balance < creditCost) throw new InsufficientCreditsError();

  await tx.leadCredit.update({
    where: { userId },
    data: { balance: { decrement: creditCost } },
  });

  await tx.lead.update({
    where: { id: leadId },
    data: { status: "INTERESTED", interestedAt: new Date() },
  });
});
```

### Auto-Topup Logic
```
On every credit deduction:
  IF user.autoTopup = true
  AND newBalance < user.topupThreshold
  THEN:
    1. Create Stripe PaymentIntent for user.topupAmount credits
    2. Charge saved payment method
    3. On success: increment balance
    4. On failure: send CREDIT_LOW notification
```

### Refund Policy
- If homeowner cancels job within 24h of posting AND tradesperson expressed interest:
  credits are refunded to tradesperson
- If job auto-closes (expired): no refund (tradesperson had the opportunity)

---

## 4. Quote System

### Quote States

```
  ┌─────────┐
  │ PENDING │ ← tradesperson submits with express-interest
  └────┬────┘
       │
  ┌────┼─────────┐
  │    │          │
  │    ▼          ▼
  │ ┌────────┐ ┌──────────┐
  │ │ACCEPTED│ │ DECLINED │
  │ └────────┘ └──────────┘
  │
  ▼
┌──────────┐
│WITHDRAWN │ ← tradesperson retracts
└──────────┘
```

### Quote Acceptance Flow
1. Homeowner clicks "Accept" on a quote
2. Backend:
   - Sets quote.status = ACCEPTED
   - Sets lead.status = HIRED for this tradesperson
   - Sets lead.status = REJECTED for all other leads on this job
   - Sets all other quotes.status = DECLINED
   - Sets job.status = IN_PROGRESS
   - Creates notification for hired tradesperson: "You've been hired!"
   - Creates notification for rejected tradespeople: "The homeowner chose another tradesperson"

### Quote Contents
```typescript
interface Quote {
  message: string;        // Required. Tradesperson's pitch/description of how they'd do the job
  amountPence?: number;   // Optional. Estimated cost in pence (£50.00 = 5000)
  estimateRange?: string; // Optional. "£500 - £800" free-text range
}
```

---

## 5. Review Eligibility Rules

### When Can a Homeowner Leave a Review?

| Rule | Condition |
|---|---|
| Job must be COMPLETED | `job.status === "COMPLETED"` |
| Reviewer must be job's homeowner | `review.authorId === job.homeownerId` |
| Subject must be the hired tradesperson | `lead.status === "HIRED" && lead.tradespersonId === review.subjectId` |
| One review per job | Unique constraint on `(jobId, authorId)` |
| Within 90 days of completion | `job.completedAt + 90 days > now()` |
| Rating is 1-5 | Integer, validated server-side |
| Comment min 20 chars | Prevents spam/low-effort reviews |

### Review Moderation
- Reviews are published immediately (no pre-moderation)
- Admin can flag/hide reviews if reported
- Tradesperson can reply ONCE to any review
- Reviews cannot be edited after 48 hours
- Reviews cannot be deleted by the author (only by admin)

### Rating Calculation
```typescript
// On every new review, recalculate:
const reviews = await prisma.review.findMany({ where: { subjectId: tradespersonId } });
const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
const reviewCount = reviews.length;

await prisma.tradespersonProfile.update({
  where: { userId: tradespersonId },
  data: { avgRating: Math.round(avgRating * 10) / 10, reviewCount },
});
```

---

## 6. Notification Trigger Matrix

| Event | Notification Type | Recipient | Title Template | Link |
|---|---|---|---|---|
| Job posted + matches found | `NEW_LEAD` | Each matched tradesperson | "New {serviceSlug} job in {placeName}" | `/tradesperson/my-leads/{leadId}` |
| Tradesperson expresses interest | `NEW_INTEREST` | Homeowner | "{tradesperson.name} is interested in your job" | `/homeowner/my-jobs/{jobId}` |
| Tradesperson sends quote | `NEW_QUOTE` | Homeowner | "New quote for {job.title}" | `/homeowner/my-jobs/{jobId}` |
| New message in conversation | `NEW_MESSAGE` | Other party | "New message from {sender.name}" | `/homeowner/my-jobs/{jobId}` or `/tradesperson/contacts` |
| Homeowner leaves review | `NEW_REVIEW` | Tradesperson | "New {rating}★ review for {job.title}" | `/tradesperson/profile?tab=reviews` |
| Job marked complete | `JOB_COMPLETED` | Tradesperson | "Job complete: {job.title}" | `/tradesperson/my-leads/{leadId}` |
| Job cancelled | `JOB_CANCELLED` | All interested tradespeople | "Job cancelled: {job.title}" | n/a |
| Lead expires (7 days) | `LEAD_EXPIRED` | Tradesperson | "Lead expired: {job.title}" | n/a |
| Credit balance < threshold | `CREDIT_LOW` | Tradesperson | "Your credit balance is low ({balance} remaining)" | `/tradesperson/profile?tab=balance` |
| Auto-topup charged | `CREDIT_TOPUP` | Tradesperson | "{credits} credits added to your balance" | `/tradesperson/profile?tab=balance` |
| Account verified by admin | `ACCOUNT_VERIFIED` | Tradesperson | "Your account has been verified!" | `/tradesperson/profile` |
| New answer to question | `NEW_ANSWER` | Question author | "New answer to your question" | `/questions/{questionId}` |
| Answer liked | `ANSWER_LIKED` | Answer author | "Someone liked your answer" | `/questions/{questionId}` |

### Delivery Channels
1. **In-app** (always) — stored in `notifications` table, shown in bell dropdown
2. **Email** (configurable) — sent via Resend for important events (NEW_LEAD, NEW_INTEREST, NEW_QUOTE, NEW_REVIEW)
3. **WebSocket** (when online) — pushed in real-time via `/ws/notifications`

---

## 7. Job Status FSM (ASCII Diagram)

```
┌──────────────────────────────────────────────────────────────┐
│                      JOB STATUS FSM                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   [DRAFT] ──submit──► [ACTIVE]                               │
│                          │                                   │
│                ┌─────────┼─────────┐                        │
│                │         │         │                        │
│            1st interest  │     14d no     homeowner          │
│                │         │     interest   cancels            │
│                ▼         │         │         │               │
│         [SHORTLISTING]   │         ▼         ▼               │
│                │         │     [CLOSED]  [CANCELLED]         │
│          accept quote    │                                   │
│                │         │                                   │
│                ▼         │                                   │
│          [IN_PROGRESS]───┘                                   │
│                │                                             │
│          mark complete                                       │
│                │                                             │
│                ▼                                             │
│          [COMPLETED]                                         │
│                │                                             │
│          review or 30d                                       │
│                │                                             │
│                ▼                                             │
│            [CLOSED]                                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 8. Lead Lifecycle FSM (ASCII Diagram)

```
┌──────────────────────────────────────────────────────────────┐
│                     LEAD LIFECYCLE FSM                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   Job posted ──matching──► [AVAILABLE]                       │
│                                │                             │
│                     ┌──────────┼──────────┐                 │
│                     │          │          │                 │
│              tp expresses    7d pass    job cancelled        │
│              interest          │          │                 │
│                     │          ▼          ▼                 │
│                     │      [EXPIRED]  [EXPIRED]             │
│                     ▼                                        │
│               [INTERESTED]                                   │
│                     │                                        │
│          ┌──────────┼──────────┐                            │
│          │          │          │                            │
│    homeowner    homeowner    another tp                      │
│    shortlists   rejects      hired                          │
│          │          │          │                            │
│          ▼          ▼          ▼                            │
│    [SHORTLISTED] [REJECTED] [REJECTED]                      │
│          │                                                   │
│    homeowner initiates chat                                  │
│          │                                                   │
│          ▼                                                   │
│    [CONTACTED]                                               │
│          │                                                   │
│    homeowner accepts quote                                   │
│          │                                                   │
│          ▼                                                   │
│       [HIRED]                                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Transitions:
  AVAILABLE   → INTERESTED   (tp pays credits)
  AVAILABLE   → EXPIRED      (7 days timeout or job cancelled)
  INTERESTED  → SHORTLISTED  (homeowner shortlists)
  INTERESTED  → REJECTED     (homeowner rejects or another tp hired)
  SHORTLISTED → CONTACTED    (homeowner starts chat)
  SHORTLISTED → REJECTED     (homeowner rejects)
  CONTACTED   → HIRED        (homeowner accepts quote)
  CONTACTED   → REJECTED     (homeowner rejects)
```

---

## 9. Tradesperson Verification Workflow

```
  New registration
       │
       ▼
  [PENDING] ── tp uploads ID doc ──► Admin review queue
       │                                    │
       │                          ┌─────────┼─────────┐
       │                          │         │          │
       │                    docs valid   docs invalid  │
       │                          │         │          │
       │                          ▼         ▼          │
       │                    [APPROVED]  [REJECTED]     │
       │                          │         │          │
       │                          │    email with      │
       │                          │    reason sent     │
       │                          │         │          │
       │                    can receive  can resubmit  │
       │                    leads        documents     │
       │                                    │          │
       └────────────────────────────────────┘          │
                                                       │
  APPROVED tradespeople:                               │
    ✓ Appear in search results                         │
    ✓ Receive lead notifications                       │
    ✓ Can express interest on leads                    │
    ✓ Show "Verified" badge on profile                 │
                                                       │
  PENDING/REJECTED tradespeople:                       │
    ✗ Cannot see leads                                 │
    ✗ Cannot express interest                          │
    ✗ Do not appear in search results                  │
    ✓ Can complete profile setup                       │
    ✓ Can browse public pages                          │
```

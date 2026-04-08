# Builder Network — API Reference

> Base URL: `{BACKEND_URL}/api/v1`
> Auth: JWT Bearer token in `Authorization` header unless marked PUBLIC.

---

## Shared Types

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

type SortOrder = "asc" | "desc";
```

---

## 1. AUTH MODULE

### POST /auth/register
**Auth:** PUBLIC  
```typescript
// Request
interface RegisterRequest {
  email: string;
  password: string;     // min 8 chars, 1 uppercase, 1 number
  name: string;
  role: "HOMEOWNER" | "TRADESPERSON";
  phone?: string;
}

// Response 201
interface RegisterResponse {
  user: {
    id: string;
    email: string;
    role: "HOMEOWNER" | "TRADESPERSON";
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}
```
**Side effects:** Creates User row. If TRADESPERSON, creates empty TradespersonProfile + LeadCredit (balance=0). Sends verification email via Resend.

### POST /auth/login
**Auth:** PUBLIC  
```typescript
// Request
interface LoginRequest {
  email: string;
  password: string;
}

// Response 200
interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: "HOMEOWNER" | "TRADESPERSON";
    name: string;
    username?: string;     // only for tradesperson
    avatarUrl?: string;
  };
  accessToken: string;     // 15min expiry
  refreshToken: string;    // 7d expiry
}
```
**Side effects:** None.

### POST /auth/refresh
**Auth:** PUBLIC (requires valid refreshToken)  
```typescript
// Request
interface RefreshRequest {
  refreshToken: string;
}

// Response 200
interface RefreshResponse {
  accessToken: string;
  refreshToken: string;    // rotated
}
```
**Side effects:** Old refresh token invalidated.

### POST /auth/forgot-password
**Auth:** PUBLIC  
```typescript
// Request
interface ForgotPasswordRequest {
  email: string;
}

// Response 200  
{ message: "If that email exists, a reset link has been sent." }
```
**Side effects:** Sends password reset email with token (valid 1h).

### POST /auth/reset-password
**Auth:** PUBLIC  
```typescript
// Request
interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Response 200
{ message: "Password updated." }
```

### GET /auth/me
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
// Response 200
interface MeResponse {
  id: string;
  email: string;
  role: "HOMEOWNER" | "TRADESPERSON";
  name: string;
  phone?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  username?: string;
  createdAt: string;
}
```

### POST /auth/verify-email
**Auth:** PUBLIC  
```typescript
// Request
interface VerifyEmailRequest {
  token: string;
}

// Response 200
{ message: "Email verified." }
```
**Side effects:** Sets user.emailVerified = true.

---

## 2. USERS MODULE

### GET /users/me/profile
**Auth:** TRADESPERSON  
```typescript
// Response 200
interface TradespersonProfileResponse {
  id: string;
  username: string;
  companyName?: string;
  bio?: string;
  trade?: string;
  postcode?: string;
  workRadiusMiles: number;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  guarantee: boolean;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  services: Array<{ serviceSlug: string; tradeSlug?: string }>;
  qualifications: Array<{ id: string; name: string; verified: boolean; year?: number }>;
  portfolioItems: Array<{ id: string; imageUrl: string; title?: string; category?: string }>;
  insurance: {
    publicLiability?: string;
    employersLiability?: string;
    professionalIndemnity?: string;
    verified: boolean;
    expiresAt?: string;
  };
  messageTemplates: Array<{ id: string; name: string; body: string }>;
}
```

### PATCH /users/me/profile
**Auth:** TRADESPERSON  
```typescript
// Request (all fields optional)
interface UpdateProfileRequest {
  companyName?: string;
  bio?: string;
  trade?: string;
  postcode?: string;        // triggers geocode on server
  workRadiusMiles?: number;
  guarantee?: boolean;
}

// Response 200 — updated TradespersonProfileResponse
```
**Side effects:** If postcode changes, server calls postcodes.io to get lat/lng.

### POST /users/me/services
**Auth:** TRADESPERSON  
```typescript
// Request
interface AddServiceRequest {
  serviceSlug: string;
  tradeSlug?: string;
}

// Response 201 — { id, serviceSlug, tradeSlug }
```

### DELETE /users/me/services/:id
**Auth:** TRADESPERSON  
**Response:** 204 No Content

### POST /users/me/qualifications
**Auth:** TRADESPERSON  
```typescript
// Request
interface AddQualificationRequest {
  name: string;
  year?: number;
}

// Response 201 — { id, name, verified: false, year }
```

### DELETE /users/me/qualifications/:id
**Auth:** TRADESPERSON  
**Response:** 204

### POST /users/me/portfolio
**Auth:** TRADESPERSON  
```typescript
// Request — multipart/form-data
// Fields: image (file, max 15MB, JPEG/PNG), title?, category?

// Response 201 — { id, imageUrl, title, category }
```
**Side effects:** Uploads file to R2, stores URL.

### DELETE /users/me/portfolio/:id
**Auth:** TRADESPERSON  
**Response:** 204  
**Side effects:** Deletes file from R2.

### POST /users/me/message-templates
**Auth:** TRADESPERSON  
```typescript
interface CreateTemplateRequest {
  name: string;
  body: string;
}
// Response 201
```

### PATCH /users/me/message-templates/:id
**Auth:** TRADESPERSON  

### DELETE /users/me/message-templates/:id
**Auth:** TRADESPERSON  

### POST /users/me/avatar
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
// Request — multipart/form-data
// Fields: avatar (file, max 5MB, JPEG/PNG)

// Response 200 — { avatarUrl: string }
```

### POST /users/me/id-document
**Auth:** TRADESPERSON  
```typescript
// Request — multipart/form-data  
// Fields: document (file, max 10MB, JPEG/PNG/PDF)

// Response 200 — { message: "Document uploaded. Verification pending." }
```
**Side effects:** Sets verificationStatus=PENDING. Creates notification for admin.

### GET /users/:username
**Auth:** PUBLIC  
```typescript
// Response 200
interface PublicProfileResponse {
  username: string;
  name: string;
  companyName?: string;
  trade?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  bio?: string;
  location?: string;
  postcode?: string;
  memberSince: string;
  lastActive?: string;
  responseTime?: string;
  verified: boolean;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  badges: string[];
  services: string[];
  qualifications: Array<{ name: string; verified: boolean }>;
  insurance: {
    publicLiability?: string;
    employersLiability?: string;
    professionalIndemnity?: string;
    verified: boolean;
    expiresAt?: string;
  };
  portfolioItems: Array<{
    id: string;
    imageUrl: string;
    title?: string;
    category?: string;
  }>;
  ratingBreakdown: Record<string, number>;  // "1"..  "5" → count
  reviews: Array<{
    id: string;
    authorName: string;
    authorAvatar?: string;
    rating: number;
    comment: string;
    jobTitle: string;
    createdAt: string;
    reply?: { body: string; createdAt: string };
  }>;
}
```

### PATCH /users/me
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
interface UpdateUserRequest {
  name?: string;
  phone?: string;
}
// Response 200 — updated MeResponse
```

---

## 3. JOBS MODULE

### POST /jobs
**Auth:** HOMEOWNER  
```typescript
// Request — multipart/form-data
interface CreateJobRequest {
  title: string;           // max 70 chars
  description: string;
  serviceSlug: string;
  tradeSlug?: string;
  postcode: string;
  answersJson: string;     // JSON-stringified Record<string, AnswerValue>
  attachments?: File[];    // max 5 files, 15MB each, JPEG/PNG/PDF
}

// Response 201
interface CreateJobResponse {
  id: string;
  title: string;
  status: "ACTIVE";
  matchedCount: number;    // how many tradespeople were notified
  createdAt: string;
}
```
**Side effects:**
1. Geocodes postcode via postcodes.io
2. Runs matching algorithm → creates Lead rows for matched tradespeople
3. Sends NEW_LEAD notification to each matched tradesperson
4. Uploads attachments to R2

### GET /jobs
**Auth:** HOMEOWNER (own jobs only)  
```typescript
// Query params
interface GetJobsQuery {
  status?: "ACTIVE" | "SHORTLISTING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "CLOSED";
  page?: number;           // default 1
  perPage?: number;        // default 20
  sort?: "createdAt";
  order?: SortOrder;
}

// Response 200
type GetJobsResponse = PaginatedResponse<{
  id: string;
  title: string;
  status: JobStatus;
  serviceSlug: string;
  postcode: string;
  placeName?: string;
  interestedCount: number;
  quoteCount: number;
  newResponsesCount: number;
  createdAt: string;
}>;
```

### GET /jobs/:id
**Auth:** HOMEOWNER (own job) | TRADESPERSON (if has lead for this job)  
```typescript
// Response 200
interface JobDetailResponse {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  serviceSlug: string;
  tradeSlug?: string;
  postcode: string;
  placeName?: string;
  answersJson: Record<string, any>;
  attachments: Array<{ id: string; fileUrl: string; fileName: string }>;
  interestedCount: number;
  quoteCount: number;
  createdAt: string;
  // Only for homeowner:
  responses?: Array<{
    tradesperson: {
      id: string;
      username: string;
      name: string;
      companyName?: string;
      avatarUrl?: string;
      avgRating: number;
      reviewCount: number;
      verified: boolean;
    };
    lead: { id: string; status: LeadStatus; interestedAt?: string };
    quote?: { id: string; message: string; amountPence?: number; status: QuoteStatus };
  }>;
}
```

### PATCH /jobs/:id
**Auth:** HOMEOWNER (own job)  
```typescript
interface UpdateJobRequest {
  status?: "CANCELLED" | "CLOSED";  // only these transitions allowed by homeowner
}
```

### POST /jobs/:id/complete
**Auth:** HOMEOWNER (own job, status must be IN_PROGRESS)  
```typescript
// Request
interface CompleteJobRequest {
  tradespersonId: string;  // who did the work
}

// Response 200 — { status: "COMPLETED" }
```
**Side effects:** Updates job status. Increments tradesperson completedJobs. Sends JOB_COMPLETED notification. Unlocks review eligibility.

---

## 4. LEADS MODULE

### GET /leads
**Auth:** TRADESPERSON  
```typescript
// Query params
interface GetLeadsQuery {
  status?: "AVAILABLE" | "INTERESTED" | "SHORTLISTED" | "CONTACTED" | "HIRED";
  serviceSlug?: string;
  maxDistanceMiles?: number;
  page?: number;
  perPage?: number;
  sort?: "createdAt" | "distanceMiles" | "creditCost";
  order?: SortOrder;
}

// Response 200
type GetLeadsResponse = PaginatedResponse<{
  id: string;
  job: {
    id: string;
    title: string;
    serviceSlug: string;
    postcode: string;
    placeName?: string;
    description: string;
    createdAt: string;
  };
  status: LeadStatus;
  creditCost: number;
  distanceMiles?: number;
  createdAt: string;
}>;
```

### GET /leads/:id
**Auth:** TRADESPERSON (own lead)  
```typescript
// Response 200
interface LeadDetailResponse {
  id: string;
  status: LeadStatus;
  creditCost: number;
  distanceMiles?: number;
  job: {
    id: string;
    title: string;
    description: string;
    serviceSlug: string;
    tradeSlug?: string;
    postcode: string;
    placeName?: string;
    answersJson: Record<string, any>;
    attachments: Array<{ fileUrl: string; fileName: string }>;
    createdAt: string;
  };
  // Available after expressing interest:
  homeowner?: {
    name: string;
    avatarUrl?: string;
  };
  quote?: {
    id: string;
    message: string;
    amountPence?: number;
    status: QuoteStatus;
  };
}
```

### POST /leads/:id/express-interest
**Auth:** TRADESPERSON (lead must be AVAILABLE)  
```typescript
// Request
interface ExpressInterestRequest {
  message: string;         // initial message to homeowner
  quoteAmountPence?: number;
}

// Response 200
interface ExpressInterestResponse {
  leadStatus: "INTERESTED";
  creditsDeducted: number;
  newBalance: number;
  quoteId?: string;
}
```
**Side effects:**
1. Deducts lead credits (atomic transaction)
2. Creates Quote row
3. Creates Conversation + first Message
4. Sends NEW_INTEREST notification to homeowner
5. Sends NEW_QUOTE notification to homeowner

### POST /leads/:id/save
**Auth:** TRADESPERSON  
**Response:** 200  
Note: "Save" is a UI-only bookmark (stored client-side or as a simple flag).

---

## 5. QUOTES MODULE

### GET /jobs/:jobId/quotes
**Auth:** HOMEOWNER (own job)  
```typescript
// Response 200
interface QuotesListResponse {
  quotes: Array<{
    id: string;
    tradesperson: {
      id: string;
      username: string;
      name: string;
      companyName?: string;
      avatarUrl?: string;
      avgRating: number;
      reviewCount: number;
    };
    message: string;
    amountPence?: number;
    estimateRange?: string;
    status: QuoteStatus;
    createdAt: string;
  }>;
}
```

### PATCH /quotes/:id/accept
**Auth:** HOMEOWNER  
```typescript
// Response 200 — { status: "ACCEPTED" }
```
**Side effects:** Declines all other quotes for this job. Updates lead to HIRED. Sets job status to IN_PROGRESS. Notifies hired tradesperson + rejected ones.

### PATCH /quotes/:id/decline
**Auth:** HOMEOWNER  
```typescript
// Response 200 — { status: "DECLINED" }
```
**Side effects:** Sets lead to REJECTED. Notifies tradesperson.

### PATCH /quotes/:id
**Auth:** TRADESPERSON (own quote, status must be PENDING)  
```typescript
interface UpdateQuoteRequest {
  message?: string;
  amountPence?: number;
}
```

### DELETE /quotes/:id
**Auth:** TRADESPERSON (own quote, status must be PENDING)  
**Response:** 204  
**Side effects:** Sets quote status to WITHDRAWN.

---

## 6. MESSAGING MODULE

### GET /conversations
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
// Response 200
interface ConversationsListResponse {
  conversations: Array<{
    id: string;
    job: { id: string; title: string };
    otherParty: {
      id: string;
      name: string;
      companyName?: string;
      avatarUrl?: string;
      username?: string;
    };
    lastMessage?: {
      body: string;
      senderId: string;
      createdAt: string;
    };
    unreadCount: number;
    createdAt: string;
  }>;
}
```

### GET /conversations/:id/messages
**Auth:** HOMEOWNER | TRADESPERSON (participant only)  
```typescript
// Query: ?page=1&perPage=50
// Response 200
type MessagesResponse = PaginatedResponse<{
  id: string;
  senderId: string;
  body: string;
  readAt?: string;
  createdAt: string;
}>;
```
**Side effects:** Marks unread messages from other party as read.

### POST /conversations/:id/messages
**Auth:** HOMEOWNER | TRADESPERSON (participant only)  
```typescript
interface SendMessageRequest {
  body: string;    // max 2000 chars
}

// Response 201
interface SendMessageResponse {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
}
```
**Side effects:** Sends NEW_MESSAGE notification to other party. Emits WebSocket event.

### WebSocket: /ws/chat
**Auth:** JWT token in handshake query  
```typescript
// Client → Server events
interface WsJoinConversation { conversationId: string }
interface WsSendMessage { conversationId: string; body: string }
interface WsTyping { conversationId: string }

// Server → Client events
interface WsNewMessage { id: string; senderId: string; body: string; createdAt: string }
interface WsUserTyping { conversationId: string; userId: string }
interface WsMessageRead { conversationId: string; messageIds: string[] }
```

---

## 7. REVIEWS MODULE

### POST /reviews
**Auth:** HOMEOWNER  
```typescript
interface CreateReviewRequest {
  jobId: string;
  tradespersonId: string;
  rating: number;          // 1-5
  comment: string;         // min 20 chars
}

// Response 201
interface CreateReviewResponse {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}
```
**Side effects:** Updates tradesperson avgRating + reviewCount (denormalized). Sends NEW_REVIEW notification.

### GET /reviews
**Auth:** PUBLIC  
```typescript
// Query: ?tradespersonId=X&page=1&perPage=10&sort=createdAt&order=desc
type ReviewsResponse = PaginatedResponse<{
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  jobTitle: string;
  createdAt: string;
  reply?: { body: string; createdAt: string };
}>;
```

### POST /reviews/:id/reply
**Auth:** TRADESPERSON (review subject only)  
```typescript
interface ReplyReviewRequest {
  body: string;     // max 1000 chars
}
// Response 201
```
**Side effects:** Notifies review author.

---

## 8. QUESTIONS MODULE

### POST /questions
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
interface CreateQuestionRequest {
  title: string;
  body: string;
  serviceSlug?: string;
}

// Response 201 — { id, title, body, serviceSlug, createdAt }
```

### GET /questions
**Auth:** PUBLIC  
```typescript
// Query: ?serviceSlug=plumbing&page=1&perPage=20&sort=createdAt|answerCount&order=desc
type QuestionsResponse = PaginatedResponse<{
  id: string;
  title: string;
  body: string;
  serviceSlug?: string;
  authorName: string;
  answerCount: number;
  hasBestAnswer: boolean;
  createdAt: string;
}>;
```

### GET /questions/:id
**Auth:** PUBLIC  
```typescript
interface QuestionDetailResponse {
  id: string;
  title: string;
  body: string;
  serviceSlug?: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  answers: Array<{
    id: string;
    authorName: string;
    authorAvatar?: string;
    authorUsername?: string;
    authorTrade?: string;
    body: string;
    isBest: boolean;
    likesCount: number;
    likedByMe: boolean;    // requires auth, false if not logged in
    createdAt: string;
  }>;
}
```

### POST /questions/:id/answers
**Auth:** TRADESPERSON  
```typescript
interface CreateAnswerRequest {
  body: string;
}
// Response 201
```
**Side effects:** Increments question.answerCount. Sends NEW_ANSWER notification to question author.

### POST /answers/:id/like
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
// Response 200 — { liked: boolean; likesCount: number }
```
**Side effects:** Toggles like. Updates likesCount.

### PATCH /answers/:id/best
**Auth:** HOMEOWNER (question author only)  
```typescript
// Response 200 — { isBest: true }
```
**Side effects:** Unsets any previous best answer on same question.

---

## 9. PAYMENTS MODULE

### GET /payments/balance
**Auth:** TRADESPERSON  
```typescript
interface BalanceResponse {
  balance: number;          // credits
  autoTopup: boolean;
  topupAmount?: number;
  topupThreshold?: number;
  lastTopupAt?: string;
}
```

### POST /payments/checkout
**Auth:** TRADESPERSON  
```typescript
interface CheckoutRequest {
  creditAmount: number;    // e.g. 50, 100, 200
}

// Response 200
interface CheckoutResponse {
  checkoutUrl: string;     // Stripe Checkout URL to redirect to
  sessionId: string;
}
```
**Side effects:** Creates Payment row (PENDING). Creates Stripe Checkout Session.

### POST /payments/webhook
**Auth:** PUBLIC (Stripe signature validation)  
```typescript
// Stripe webhook event — not called by frontend
```
**Side effects:** On checkout.session.completed: updates Payment to COMPLETED, adds credits to LeadCredit.balance. On charge.refunded: creates REFUND Payment, deducts credits.

### GET /payments/history
**Auth:** TRADESPERSON  
```typescript
// Query: ?page=1&perPage=20
type PaymentHistoryResponse = PaginatedResponse<{
  id: string;
  type: "CREDIT_PURCHASE" | "SUBSCRIPTION" | "REFUND";
  amountPence: number;
  credits?: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  description?: string;
  createdAt: string;
}>;
```

### PATCH /payments/auto-topup
**Auth:** TRADESPERSON  
```typescript
interface AutoTopupRequest {
  enabled: boolean;
  topupAmount?: number;       // credits to buy
  topupThreshold?: number;    // trigger when balance drops below this
}
// Response 200 — updated BalanceResponse
```

---

## 10. NOTIFICATIONS MODULE

### GET /notifications
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
// Query: ?page=1&perPage=20&unreadOnly=true
type NotificationsResponse = PaginatedResponse<{
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  linkUrl?: string;
  read: boolean;
  createdAt: string;
}>;
```

### PATCH /notifications/:id/read
**Auth:** HOMEOWNER | TRADESPERSON  
**Response:** 200

### POST /notifications/read-all
**Auth:** HOMEOWNER | TRADESPERSON  
**Response:** 200  
**Side effects:** Marks all unread notifications as read.

### GET /notifications/unread-count
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
// Response 200
{ count: number }
```

### WebSocket: /ws/notifications
**Auth:** JWT in handshake  
```typescript
// Server → Client
interface WsNotification {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  linkUrl?: string;
}
```

---

## 11. SEARCH MODULE

### GET /search/tradespeople
**Auth:** PUBLIC  
```typescript
// Query params
interface SearchTradespeopleQuery {
  serviceSlug?: string;
  tradeSlug?: string;
  postcode?: string;       // geocoded server-side
  radiusMiles?: number;    // default 25
  minRating?: number;
  verified?: boolean;
  page?: number;
  perPage?: number;
  sort?: "avgRating" | "reviewCount" | "distanceMiles";
  order?: SortOrder;
}

// Response 200
type SearchTradespeopleResponse = PaginatedResponse<{
  username: string;
  name: string;
  companyName?: string;
  trade?: string;
  avatarUrl?: string;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  verified: boolean;
  distanceMiles?: number;
  services: string[];
}>;
```

### GET /search/jobs
**Auth:** TRADESPERSON  
```typescript
// Same as GET /leads but without auth-specific filtering
```

---

## 12. UPLOADS MODULE

### POST /uploads/signed-url
**Auth:** HOMEOWNER | TRADESPERSON  
```typescript
interface SignedUrlRequest {
  fileName: string;
  fileType: string;        // MIME type
  purpose: "avatar" | "portfolio" | "job-attachment" | "id-document";
}

// Response 200
interface SignedUrlResponse {
  uploadUrl: string;       // PUT this URL with file body
  fileUrl: string;         // public URL after upload
  expiresAt: string;
}
```

---

## 13. ADMIN MODULE

### GET /admin/users
**Auth:** ADMIN  
```typescript
// Query: ?role=TRADESPERSON&verificationStatus=PENDING&page=1
type AdminUsersResponse = PaginatedResponse<{
  id: string;
  email: string;
  name: string;
  role: string;
  verificationStatus?: string;
  createdAt: string;
}>;
```

### PATCH /admin/users/:id/verify
**Auth:** ADMIN  
```typescript
interface VerifyUserRequest {
  status: "APPROVED" | "REJECTED";
  reason?: string;
}
// Response 200
```
**Side effects:** Sends ACCOUNT_VERIFIED notification to tradesperson.

### GET /admin/jobs
**Auth:** ADMIN  
```typescript
// Paginated job list with filters
```

### GET /admin/stats
**Auth:** ADMIN  
```typescript
interface AdminStatsResponse {
  totalUsers: number;
  totalTradespeople: number;
  totalHomeowners: number;
  totalJobs: number;
  totalReviews: number;
  pendingVerifications: number;
}
```

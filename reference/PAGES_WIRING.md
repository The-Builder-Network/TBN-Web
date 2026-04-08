# Builder Network — Pages Wiring Guide

> For every page that currently uses hardcoded/mock data, this document specifies
> exactly what to remove, what API calls to add, and what UI states to implement.

---

## 1. LoginModal

**File:** `src/components/modals/LoginModal.tsx`

### Remove
- The "Log in" button currently has no `onClick` handler.

### Add
```typescript
import { useLogin } from "@/api/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// Inside component:
const form = useForm({ resolver: zodResolver(loginSchema) });
const loginMutation = useLogin();

const onSubmit = form.handleSubmit((data) => {
  loginMutation.mutate(data, {
    onSuccess: () => {
      onOpenChange(false);
      toast({ title: "Welcome back!" });
    },
    onError: (err) => {
      toast({ title: "Login failed", description: extractError(err), variant: "destructive" });
    },
  });
});
```

### Loading state
- Disable button + show spinner while `loginMutation.isPending`

### Error state
- Show inline error below form from `form.formState.errors` or mutation error

---

## 2. Registration Steps

**Files:**
- `src/components/register/StepCreateAccount.tsx`
- `src/components/register/StepIDCheck.tsx`
- `src/components/register/StepProfileSetup.tsx`
- `src/components/register/StepSafetyQuality.tsx`
- `src/components/register/StepWorkDetails.tsx`

### Architecture change
Create a registration store to hold cross-step state:

```typescript
// src/stores/registrationStore.ts
import { create } from "zustand";

interface RegistrationState {
  step: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: "HOMEOWNER" | "TRADESPERSON";
  // Tradesperson-specific
  idDocument?: File;
  bio?: string;
  services: string[];
  workRadiusMiles: number;
  postcode: string;
  portfolioFiles: File[];
  qualifications: string[];
  // Actions
  setField: (key: string, value: unknown) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}
```

### StepCreateAccount — wire to API
```typescript
// On final step completion (or on StepCreateAccount for homeowners):
const registerMutation = useRegister();

registerMutation.mutate({
  email: store.email,
  password: store.password,
  name: store.name,
  role: store.role,
  phone: store.phone,
});
```

### Remove
- Manual `useState` validation in each step → replace with `react-hook-form` + `zod`
- `alert()` calls in StepIDCheck and StepSafetyQuality → replace with `toast()`

### Loading state
- Show spinner on the "Continue" / "Create account" button while mutation is pending

### Error state
- Toast on registration failure with the specific error message

---

## 3. PostJobPage (JobFunnel completion)

**File:** `src/pages/PostJobPage.tsx` + `src/components/post-job/JobFunnel.tsx`

### Remove
```typescript
// In JobFunnel.tsx — remove this line:
console.log("Job funnel complete!", finalAnswers);
```

### Add
```typescript
import { useCreateJob } from "@/api/jobs";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

// In JobFunnel or PostJobPage:
const createJobMutation = useCreateJob();
const navigate = useNavigate();
const { isAuthenticated } = useAuth();

// On funnel completion:
function handleFunnelComplete(answers: Record<string, AnswerValue>, serviceSlug: string) {
  if (!isAuthenticated) {
    // Open login modal, then retry
    return;
  }

  // Extract special fields from answers
  const title = answers["title"] as string;
  const description = answers["description"] as string;
  const postcode = answers["postcode"] as string;
  const attachments = answers["attachments"] as File[] | undefined;

  createJobMutation.mutate(
    { title, description, serviceSlug, postcode, answersJson: answers, attachments },
    {
      onSuccess: (data) => {
        navigate(`/homeowner/my-jobs/${data.id}`, {
          state: { justPosted: true, matchedCount: data.matchedCount },
        });
      },
      onError: (err) => {
        toast({ title: "Failed to post job", description: extractError(err), variant: "destructive" });
      },
    }
  );
}
```

### Loading state
- Show a "Posting your job..." overlay with spinner after funnel completion
- Disable the submit button

### Error state
- Toast notification with retry option

---

## 4. HomeownerMyJobsPage

**File:** `src/pages/protected/homeowner/HomeownerMyJobsPage.tsx`

### Remove
```typescript
// Delete the entire hardcoded jobs array:
const jobs = [
  { id: "1", title: "Security Systems Installation", ... },
  { id: "2", title: "Kitchen Renovation", ... },
  { id: "3", title: "Garden Landscaping", ... },
  { id: "4", title: "Electrical Installation", ... },
  { id: "5", title: "Bathroom Fitting", ... },
];
```

### Add
```typescript
import { useJobs } from "@/api/jobs";
import { SkeletonCard } from "@/components/shared/SkeletonCard";

const [statusFilter, setStatusFilter] = useState<string | undefined>();
const { data, isLoading, error } = useJobs({ status: statusFilter, sort: "createdAt", order: "desc" });

const jobs = data?.data ?? [];
```

### Loading state
```tsx
{isLoading && (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
  </div>
)}
```

### Error state
```tsx
{error && (
  <div className="text-center py-12">
    <p className="text-destructive">Failed to load jobs. Please try again.</p>
    <Button onClick={() => refetch()} variant="outline" className="mt-4">Retry</Button>
  </div>
)}
```

### Empty state
```tsx
{!isLoading && jobs.length === 0 && (
  <div className="text-center py-12">
    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 className="mt-4 text-lg font-semibold">No jobs posted yet</h3>
    <p className="text-muted-foreground mt-1">Post your first job to get started</p>
    <Button asChild className="mt-4"><Link to="/post-job">Post a job</Link></Button>
  </div>
)}
```

---

## 5. HomeownerJobDetailPage (JobResponses)

**File:** `src/pages/protected/homeowner/HomeownerJobDetailPage.tsx`

### Currently
Stub/redirect page. Currently routes to a temporary `JobwithnoResponses` component.

### Add
```typescript
import { useJob } from "@/api/jobs";
import { useParams } from "react-router-dom";

const { jobId } = useParams<{ jobId: string }>();
const { data: job, isLoading, error } = useJob(jobId!);
```

### This page should render:
1. Job summary card (title, status, postcode, date)
2. List of interested tradespeople (from `job.responses[]`)
3. Each response shows: tradesperson avatar, name, rating, quote amount, message
4. Actions: "Shortlist", "Start chat", "View profile"
5. Tab to switch between "Interested" / "Shortlisted" / "Quotes"

### Loading / Error / Empty states
- Skeleton for job card + response list
- Error with retry button
- Empty: "No tradespeople have expressed interest yet. We've notified X tradespeople in your area."

---

## 6. HomeownerMyQuestionsPage

**File:** `src/pages/protected/homeowner/HomeownerMyQuestionsPage.tsx`

### Currently
Shows empty state only.

### Add
```typescript
import { useQuestions } from "@/api/questions";

// Filter to only questions by current user (needs backend support or client filter)
const { data, isLoading } = useQuestions({ page: 1 });
```

---

## 7. HomeownerProfilePage

**File:** `src/pages/protected/homeowner/HomeownerProfilePage.tsx`

### Add
```typescript
import { useMe } from "@/api/auth";

const { data: user, isLoading } = useMe();
```

### Wire
- Name edit → `useUpdateUser` mutation
- Phone edit → `useUpdateUser` mutation
- Avatar upload → `useUploadAvatar` mutation

---

## 8. TradespersonMyLeadsPage

**File:** `src/pages/protected/tradesperson/TradespersonMyLeadsPage.tsx`

### Remove
```typescript
// Delete the entire hardcoded LEADS array:
const LEADS = [
  { id: 1, title: "Structural engineer", category: "Architecture", ... },
  // ... 7 entries
];
```

### Add
```typescript
import { useLeads } from "@/api/leads";

const [filters, setFilters] = useState<{
  serviceSlug?: string;
  maxDistanceMiles?: number;
  sort: "createdAt" | "distanceMiles" | "creditCost";
  order: "asc" | "desc";
}>({ sort: "createdAt", order: "desc" });

const { data, isLoading, error } = useLeads({
  status: "AVAILABLE",
  ...filters,
});

const leads = data?.data ?? [];
```

### Loading state
- Skeleton cards (3 items)

### Error state
- "Failed to load leads" with retry

### Empty state
```tsx
<div className="text-center py-12">
  <Search className="mx-auto h-12 w-12 text-muted-foreground" />
  <h3 className="mt-4 text-lg font-semibold">No leads available</h3>
  <p className="text-muted-foreground mt-1">
    New leads matching your services and work area will appear here.
  </p>
</div>
```

---

## 9. TradespersonLeadDetailPage

**File:** `src/pages/protected/tradesperson/TradespersonLeadDetailPage.tsx`

### Currently
Stub page.

### Add
```typescript
import { useLead, useExpressInterest } from "@/api/leads";
import { useBalance } from "@/api/payments";
import { useParams } from "react-router-dom";

const { leadId } = useParams<{ leadId: string }>();
const { data: lead, isLoading } = useLead(leadId!);
const { data: balance } = useBalance();
const expressInterestMutation = useExpressInterest();
```

### This page should render:
1. Job details card (title, description, answers, photos, postcode, date)
2. Credit cost badge ("This lead costs X credits")
3. Current balance display
4. "Express Interest" button with message textarea
5. If already interested: show quote status, homeowner contact info, conversation link

### Loading / Error / Empty
- Full page skeleton
- "Lead not found" 404 state

---

## 10. TradespersonProfilePage

**File:** `src/pages/protected/tradesperson/TradespersonProfilePage.tsx`

### Remove
- All hardcoded tab content, the static PROFESSIONS array, mock rating display

### Add
```typescript
import { useMyProfile, useUpdateMyProfile, useAddService,
         useRemoveService, useUploadPortfolio, useDeletePortfolioItem,
         useUploadIdDocument } from "@/api/users";
import { useBalance, usePaymentHistory, useUpdateAutoTopup } from "@/api/payments";
import { useReviews } from "@/api/reviews";

const { data: profile, isLoading } = useMyProfile();
const { data: balance } = useBalance();
const updateMutation = useUpdateMyProfile();
```

### Wire each tab:
- **Company Description:** `useUpdateMyProfile({ bio, companyName, guarantee })`
- **Reviews:** `useReviews(profile.userId)` with pagination
- **Portfolio:** `useUploadPortfolio` + `useDeletePortfolioItem`
- **Contact Details:** `useUploadIdDocument` for ID verification
- **Work Area:** `useUpdateMyProfile({ postcode, workRadiusMiles })`
- **Services:** `useAddService` / `useRemoveService`
- **Balance:** `useBalance()` for display, `useCreateCheckout` for purchase
- **Payments:** `usePaymentHistory()` for transaction list
- **Subscription:** Phase 6+ (placeholder for now)

### Loading state
- Skeleton for sidebar + content area

---

## 11. TradespersonPublicProfilePage

**File:** `src/pages/trades/TradespersonPublicProfilePage.tsx`

### Remove
```typescript
// Delete the entire hardcoded tradesperson object:
const tradesperson = {
  id: 1,
  name: "James Wilson",
  company: "Wilson Building Services",
  // ... 30+ fields of mock data
};
```

### Add
```typescript
import { usePublicProfile } from "@/api/users";
import { useParams } from "react-router-dom";

const { username } = useParams<{ username: string }>();
const { data: profile, isLoading, error } = usePublicProfile(username!);
```

### Loading state
- Full profile skeleton (cover image placeholder, avatar circle, text lines)

### Error state
- 404: "Tradesperson not found"
- Generic: "Failed to load profile" with retry

### Empty state (for reviews/portfolio tabs)
- "No reviews yet" / "No portfolio items yet"

---

## 12. TradespersonContactsPage

**File:** `src/pages/protected/tradesperson/TradespersonContactsPage.tsx`

### Currently
Shows tabs (Active / Archived) with empty state.

### Add
```typescript
import { useConversations } from "@/api/messaging";

const { data, isLoading } = useConversations();
const conversations = data?.conversations ?? [];
```

### Render
- List of conversation cards with: homeowner name, job title, last message preview, unread badge
- Click → navigate to chat view

---

## 13. QuestionsPage

**File:** `src/pages/questions/QuestionsPage.tsx`

### Remove
```typescript
// Delete the hardcoded questions array:
const questions = [
  { category: "Painting & Decorating", title: "Concrete/cement interior wall", ... },
  // ... all mock questions
];

// Delete: console.log("Sorting by:", sort);
```

### Add
```typescript
import { useQuestions } from "@/api/questions";
import { useSearchParams } from "react-router-dom";

const [searchParams, setSearchParams] = useSearchParams();
const serviceSlug = searchParams.get("service") ?? undefined;
const sort = searchParams.get("sort") as "createdAt" | "answerCount" ?? "createdAt";
const page = Number(searchParams.get("page")) || 1;

const { data, isLoading, error } = useQuestions({ serviceSlug, sort, order: "desc", page });
```

### Loading / Error / Empty
- Skeleton question cards
- "No questions found" for empty + "Ask a question" CTA
- Pagination controls at bottom

---

## 14. QuestionPage

**File:** `src/pages/questions/QuestionPage.tsx`

### Remove
- Hardcoded question object + answers array

### Add
```typescript
import { useQuestion, useCreateAnswer, useToggleAnswerLike } from "@/api/questions";
import { useParams } from "react-router-dom";

const { questionId } = useParams<{ questionId: string }>();
const { data: question, isLoading } = useQuestion(questionId!);
const createAnswerMutation = useCreateAnswer();
const likeMutation = useToggleAnswerLike();
```

### Wire
- Answer form → `createAnswerMutation.mutate({ questionId, body })`
- Like button → `likeMutation.mutate(answerId)`
- "Mark as best" → `markBestAnswer(answerId)` (only if current user is question author)

---

## 15. AskQuestionModal

**File:** `src/components/modals/AskQuestionModal.tsx`

### Add
```typescript
import { useCreateQuestion } from "@/api/questions";

const mutation = useCreateQuestion();

const onSubmit = (data: { title: string; body: string; serviceSlug?: string }) => {
  mutation.mutate(data, {
    onSuccess: (res) => {
      onOpenChange(false);
      navigate(`/questions/${res.id}`);
    },
  });
};
```

---

## 16. Header (NotificationBell)

**File:** `src/components/layout/Header.tsx`

### Add
```typescript
import { useUnreadCount } from "@/api/notifications";
import { NotificationBell } from "@/components/shared/NotificationBell";

// In header, next to user menu:
const { data: unread } = useUnreadCount();
// Render: <NotificationBell count={unread?.count ?? 0} />
```

---

## 17. ForgotPasswordModal

**File:** `src/components/modals/ForgotPasswordModal.tsx`

### Add
```typescript
import { useForgotPassword } from "@/api/auth";

const mutation = useForgotPassword();

const onSubmit = (email: string) => {
  mutation.mutate(email, {
    onSuccess: () => {
      toast({ title: "Check your email for a reset link" });
    },
  });
};
```

# Builder Network — Phase-by-Phase Execution Plan

> Each phase has a goal, task checklist, files to create/modify, acceptance criteria,
> and an exact Copilot prompt to paste at the start of the coding session.

---

## Phase 0: Cleanup & Foundation

**Goal:** Clean the existing codebase of tech debt, remove duplicates, set up project hygiene before building anything new.

### Tasks
- [ ] 0.1 — Delete duplicate file `src/pages/trades/TradesPage.tsx` (keep `Trades.tsx`). Update any imports in `App.tsx`.
- [ ] 0.2 — Delete duplicate data file `src/data/services.ts` (keep `src/constants/services.ts`). Update imports.
- [ ] 0.3 — Remove all `console.log` debug statements from: `src/components/post-job/JobFunnel.tsx`, `src/pages/questions/QuestionsPage.tsx`, `src/components/tradesnetwork/HeroSection.tsx`.
- [ ] 0.4 — Replace all `alert()` calls with toast notifications in: `src/components/register/StepIDCheck.tsx`, `src/components/register/StepSafetyQuality.tsx`.
- [ ] 0.5 — Add `React.lazy()` + `Suspense` for route-level code splitting in `src/App.tsx`. Every page import should be lazy.
- [ ] 0.6 — Enable `strictNullChecks: true` in `tsconfig.app.json` and fix resulting type errors.
- [ ] 0.7 — Install missing dependencies: `axios`, `zustand`, `react-helmet-async`.
- [ ] 0.8 — Create `src/api/client.ts` — the Axios wrapper with JWT interceptors (from `FRONTEND_API_LAYER.md`).
- [ ] 0.9 — Create `src/api/types.ts` — all shared API type definitions.
- [ ] 0.10 — Create empty stub files for all API modules: `src/api/auth.ts`, `src/api/jobs.ts`, `src/api/leads.ts`, `src/api/users.ts`, `src/api/quotes.ts`, `src/api/messaging.ts`, `src/api/reviews.ts`, `src/api/questions.ts`, `src/api/payments.ts`, `src/api/notifications.ts`, `src/api/search.ts`, `src/api/index.ts`.
- [ ] 0.11 — Extract shared `<Breadcrumb>` component from duplicated breadcrumb code in ServicePage, TradePage, QuestionPage.
- [ ] 0.12 — Add `react-helmet-async` provider in `App.tsx` and add `<title>` + `<meta description>` to Home, Trades, Services, PostJob pages.

### Files to create
- `src/api/client.ts`
- `src/api/types.ts`
- `src/api/auth.ts` (stub)
- `src/api/jobs.ts` (stub)
- `src/api/leads.ts` (stub)
- `src/api/users.ts` (stub)
- `src/api/quotes.ts` (stub)
- `src/api/messaging.ts` (stub)
- `src/api/reviews.ts` (stub)
- `src/api/questions.ts` (stub)
- `src/api/payments.ts` (stub)
- `src/api/notifications.ts` (stub)
- `src/api/search.ts` (stub)
- `src/api/index.ts`
- `src/components/shared/Breadcrumb.tsx`

### Files to modify
- `src/App.tsx` (lazy imports, HelmetProvider, fix TradesPage reference)
- `src/components/post-job/JobFunnel.tsx` (remove console.log)
- `src/pages/questions/QuestionsPage.tsx` (remove console.log)
- `src/components/tradesnetwork/HeroSection.tsx` (remove console.log)
- `src/components/register/StepIDCheck.tsx` (alert → toast)
- `src/components/register/StepSafetyQuality.tsx` (alert → toast)
- `tsconfig.app.json` (strictNullChecks)
- `package.json` (new deps)

### Files to delete
- `src/pages/trades/TradesPage.tsx`
- `src/data/services.ts`

### Acceptance criteria
- `pnpm build` succeeds with zero errors
- No `console.log` or `alert()` in non-dev code
- All routes lazy-loaded (check network tab: page chunks loaded on navigation)
- `src/api/` folder exists with client + types + stubs
- Breadcrumb component extracted and used in 3+ pages

### Copilot Prompt
```
Read reference/CONTEXT.md and reference/PHASES.md for project context.

Execute Phase 0: Cleanup & Foundation.

Tasks:
1. Delete src/pages/trades/TradesPage.tsx. In src/App.tsx, find the import for TradesPage and redirect it to Trades from src/pages/trades/Trades.tsx.
2. Delete src/data/services.ts. Search for any imports of "@/data/services" and replace with "@/constants/services".
3. Remove all console.log() calls from: src/components/post-job/JobFunnel.tsx, src/pages/questions/QuestionsPage.tsx, src/components/tradesnetwork/HeroSection.tsx.
4. In src/components/register/StepIDCheck.tsx and StepSafetyQuality.tsx, replace alert() calls with toast() from @/hooks/use-toast.
5. In src/App.tsx, convert all page imports to React.lazy() with a Suspense wrapper showing a loading spinner.
6. Install: pnpm add axios zustand react-helmet-async
7. Create the full src/api/client.ts file from reference/FRONTEND_API_LAYER.md.
8. Create src/api/types.ts with all shared API types from reference/FRONTEND_API_LAYER.md.
9. Create stub files for all API modules (auth, jobs, leads, users, quotes, messaging, reviews, questions, payments, notifications, search, index) with just the imports and empty exports.
10. Extract a <Breadcrumb> component from the breadcrumb patterns in ServicePage.tsx, TradePage.tsx, and QuestionPage.tsx. Replace inline breadcrumbs with the shared component.
11. Wrap App with HelmetProvider and add <Helmet> with title + meta description to Home.tsx, PostJobPage.tsx, TradesnetworkPage.tsx.
12. Enable strictNullChecks in tsconfig.app.json and fix any resulting type errors.

Run pnpm build at the end to verify everything compiles.
```

---

## Phase 1: Backend Scaffold

**Goal:** Set up the NestJS project with Prisma, PostgreSQL, and the full database schema. No business logic yet — just the skeleton.

### Tasks
- [ ] 1.1 — Initialize NestJS project in `TBN-Server/` with TypeScript.
- [ ] 1.2 — Install and configure Prisma with PostgreSQL.
- [ ] 1.3 — Copy the full schema from `reference/DATABASE.md` into `prisma/schema.prisma`.
- [ ] 1.4 — Run initial migration (`prisma migrate dev --name init`).
- [ ] 1.5 — Seed the `services` and `trades` tables from `src/constants/services.ts` and `src/constants/trades.ts` data.
- [ ] 1.6 — Create NestJS module structure: `AuthModule`, `UsersModule`, `JobsModule`, `LeadsModule`, `QuotesModule`, `MessagingModule`, `ReviewsModule`, `QuestionsModule`, `PaymentsModule`, `NotificationsModule`, `UploadsModule`, `SearchModule`, `AdminModule`.
- [ ] 1.7 — Set up environment configuration (`@nestjs/config`) with validation (Joi).
- [ ] 1.8 — Set up CORS for frontend origin.
- [ ] 1.9 — Add global ValidationPipe with whitelist + transform.
- [ ] 1.10 — Create health check endpoint: `GET /api/v1/health`.

### Files to create
- `TBN-Server/src/main.ts`
- `TBN-Server/src/app.module.ts`
- `TBN-Server/prisma/schema.prisma`
- `TBN-Server/prisma/seed.ts`
- `TBN-Server/src/modules/{auth,users,jobs,leads,quotes,messaging,reviews,questions,payments,notifications,uploads,search,admin}/` — each with `*.module.ts`, `*.controller.ts`, `*.service.ts`
- `TBN-Server/.env`

### Acceptance criteria
- `pnpm start:dev` runs without errors
- `GET /api/v1/health` returns `{ status: "ok" }`
- `prisma studio` shows all tables created and empty
- Services/trades tables seeded with correct data
- All 13 NestJS modules registered in AppModule

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/DATABASE.md, and reference/PHASES.md for context.

Execute Phase 1: Backend Scaffold.

1. Initialize NestJS in the TBN-Server/ directory: nest new . --package-manager pnpm --skip-git
2. Install Prisma: pnpm add prisma @prisma/client && npx prisma init
3. Copy the FULL Prisma schema from reference/DATABASE.md into prisma/schema.prisma.
5. Create .env with DATABASE_URL pointing to 'postgresql://neondb_owner:npg_loc9pW7UNqvP@ep-solitary-mountain-a17hmmgt-pooler.ap-southeast-1.aws.neon.tech/tbn?sslmode=require&channel_binding=require'
6. Run: npx prisma migrate dev --name init
7. Create prisma/seed.ts that imports services and trades data from the frontend's src/constants/services.ts and src/constants/trades.ts, then seeds the Service and Trade tables.
8. Create a NestJS module for each domain: auth, users, jobs, leads, quotes, messaging, reviews, questions, payments, notifications, uploads, search, admin. Each module should have a module file, controller, and service — all with empty/placeholder implementations.
9. Set up ConfigModule with .env validation using Joi (require DATABASE_URL, JWT_SECRET, FRONTEND_URL).
10. Add global ValidationPipe in main.ts with whitelist, transform, and forbidNonWhitelisted.
11. Add CORS configuration allowing FRONTEND_URL origin.
12. Create GET /api/v1/health endpoint returning { status: "ok", timestamp }.
13. Register all modules in AppModule.

Verify: pnpm start:dev runs, health check works, prisma studio shows all tables.
```

---

## Phase 2: Authentication System

**Goal:** Full auth flow — register, login, JWT tokens, refresh, password reset, email verification. Frontend wired to real auth.

### Tasks
- [ ] 2.1 — Backend: Implement `POST /auth/register` with bcrypt password hashing + JWT generation.
- [ ] 2.2 — Backend: Implement `POST /auth/login` with password verification + JWT.
- [ ] 2.3 — Backend: Implement `POST /auth/refresh` with token rotation.
- [ ] 2.4 — Backend: Implement `GET /auth/me` (JWT-protected).
- [ ] 2.5 — Backend: Implement `POST /auth/forgot-password` + `POST /auth/reset-password` with email (Resend).
- [ ] 2.6 — Backend: Implement `POST /auth/verify-email`.
- [ ] 2.7 — Backend: Create JwtAuthGuard and RolesGuard decorators.
- [ ] 2.8 — Frontend: Rewrite `AuthContext.tsx` to use `useMe()` query instead of localStorage.
- [ ] 2.9 — Frontend: Fill in `src/api/auth.ts` with full implementation (from `FRONTEND_API_LAYER.md`).
- [ ] 2.10 — Frontend: Wire `LoginModal.tsx` to `useLogin()` mutation with react-hook-form + zod.
- [ ] 2.11 — Frontend: Wire `ForgotPasswordModal.tsx` to `useForgotPassword()`.
- [ ] 2.12 — Frontend: Build registration submission: create Zustand store for multi-step state, wire StepCreateAccount to `useRegister()`.
- [ ] 2.13 — Frontend: Add "Session expired" toast + redirect logic in API client interceptor.
- [ ] 2.14 — Test: Register homeowner, login, verify JWT, access protected route, refresh token, logout.

### Acceptance criteria
- Can register as homeowner and tradesperson via the UI
- Login modal works with real email/password
- Protected routes redirect to home when not logged in
- Token refresh works transparently (no visible re-login)
- Forgot password sends email (check Resend dashboard)

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/API.md (Section 1: Auth), reference/FRONTEND_API_LAYER.md (auth.ts), and reference/PAGES_WIRING.md (LoginModal, Registration Steps) for context.

Execute Phase 2: Authentication System.

BACKEND (TBN-Server/):
1. Install: pnpm add @nestjs/passport @nestjs/jwt passport passport-jwt bcrypt class-validator class-transformer resend
2. Install: pnpm add -D @types/passport-jwt @types/bcrypt
3. In auth module, implement:
   - POST /auth/register: validate input (class-validator), hash password (bcrypt, 12 rounds), create User (+ TradespersonProfile + LeadCredit if role=TRADESPERSON), generate JWT access (15min) + refresh (7d) tokens
   - POST /auth/login: find user by email, verify password, return tokens
   - POST /auth/refresh: validate refresh token, rotate it, return new pair
   - GET /auth/me: return authenticated user data
   - POST /auth/forgot-password: generate reset token, send email via Resend
   - POST /auth/reset-password: validate token, update password
4. Create JwtStrategy (passport-jwt) extracting token from Bearer header
5. Create JwtAuthGuard and RolesGuard with @Roles('HOMEOWNER', 'TRADESPERSON') decorator
6. Add guards to GET /auth/me

FRONTEND (src/):
7. Fill in src/api/auth.ts with the full code from reference/FRONTEND_API_LAYER.md
8. Rewrite src/contexts/AuthContext.tsx:
   - Replace localStorage hydration with useMe() query
   - login() should call loginApi() then invalidate 'auth/me' query
   - logout() should call logoutApi() then clear query cache
   - isLoading = useMe query isLoading
9. Wire LoginModal.tsx: add react-hook-form with zod schema, onSubmit calls useLogin() mutation, show loading spinner on button, show error toast on failure, close modal on success
10. Wire ForgotPasswordModal.tsx to useForgotPassword()
11. Create src/stores/registrationStore.ts (zustand) for multi-step registration state
12. In StepCreateAccount.tsx: on "Create account", call useRegister() with store data

Test the full flow: register → login → access /homeowner/profile → logout → verify redirect.
```

---

## Phase 3: Job Posting End-to-End

**Goal:** Homeowner posts a job → backend stores it → matching algorithm finds tradespeople → leads created.

### Tasks
- [ ] 3.1 — Backend: Implement `POST /jobs` with multipart file upload (Multer) + postcodes.io geocoding.
- [ ] 3.2 — Backend: Set up Cloudflare R2 file upload service.
- [ ] 3.3 — Backend: Implement matching algorithm (service + geo + radius query).
- [ ] 3.4 — Backend: Create leads for matched tradespeople with credit cost calculation.
- [ ] 3.5 — Backend: Implement `GET /jobs` (homeowner's own jobs, paginated).
- [ ] 3.6 — Backend: Implement `GET /jobs/:id` (job detail with responses).
- [ ] 3.7 — Backend: Implement `PATCH /jobs/:id` (cancel/close).
- [ ] 3.8 — Frontend: Wire JobFunnel completion to `useCreateJob()` mutation.
- [ ] 3.9 — Frontend: Create job success page/modal showing match count.
- [ ] 3.10 — Frontend: Wire `HomeownerMyJobsPage` to `useJobs()` — remove hardcoded data.
- [ ] 3.11 — Frontend: Build `HomeownerJobDetailPage` with `useJob()`.
- [ ] 3.12 — Frontend: Add loading skeletons and empty states to job pages.

### Acceptance criteria
- Post a job via the question funnel → see it in My Jobs with "Active" status
- Job detail shows title, description, answers, attachments
- Matching: create a verified tradesperson with matching service + radius → lead appears
- Cancel a job → status changes to CANCELLED

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/API.md (Sections 3-4: Jobs & Leads), reference/BUSINESS_LOGIC.md (Sections 1-2: Job Flow & Matching), reference/PAGES_WIRING.md (PostJobPage, HomeownerMyJobsPage, HomeownerJobDetailPage), and reference/FRONTEND_API_LAYER.md (jobs.ts) for context.

Execute Phase 3: Job Posting End-to-End.

BACKEND:
1. Install: pnpm add @nestjs/platform-express multer @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
2. Create UploadsService that uploads files to Cloudflare R2 (S3-compatible) and returns public URLs.
3. Create a PostcodeService that calls postcodes.io to geocode a postcode → returns { latitude, longitude, placeName }.
4. In jobs controller, implement POST /jobs:
   - Auth: HOMEOWNER only
   - Accept multipart form data (title, description, serviceSlug, postcode, answersJson, attachments[])
   - Geocode postcode, upload attachments to R2, create Job + JobAttachment rows
   - Run matching algorithm: find verified tradespeople with matching serviceSlug whose haversine distance ≤ workRadiusMiles
   - Create Lead rows for each match with creditCost from calculateCreditCost()
   - Return { id, status, matchedCount, createdAt }
5. Implement GET /jobs (paginated, homeowner's own) and GET /jobs/:id (with responses populated)
6. Implement PATCH /jobs/:id for status changes (CANCELLED, CLOSED)

FRONTEND:
7. Fill in src/api/jobs.ts with full code from reference/FRONTEND_API_LAYER.md
8. In JobFunnel.tsx: replace console.log on completion with a callback prop. In PostJobPage.tsx, handle the callback: check auth, call useCreateJob() mutation, on success navigate to /homeowner/my-jobs/:id with success state.
9. Rewrite HomeownerMyJobsPage.tsx: remove hardcoded jobs array, use useJobs() hook, add SkeletonCard loading state, add empty state with "Post a job" CTA.
10. Build HomeownerJobDetailPage.tsx: use useJob(jobId), show job info + responses list. Create the SkeletonCard component at src/components/shared/SkeletonCard.tsx.

Test: Post a job → verify in DB → check My Jobs page → view detail page.
```

---

## Phase 4: Leads & Express Interest

**Goal:** Tradespeople see matching leads, express interest (spend credits), homeowners see responses.

### Tasks
- [ ] 4.1 — Backend: Implement `GET /leads` (tradesperson's available leads, paginated + filtered).
- [ ] 4.2 — Backend: Implement `GET /leads/:id` (lead detail).
- [ ] 4.3 — Backend: Implement `POST /leads/:id/express-interest` with credit deduction (atomic transaction).
- [ ] 4.4 — Backend: Create LeadCredit balance management (deduct, check balance).
- [ ] 4.5 — Backend: Implement `GET /payments/balance` for tradesperson.
- [ ] 4.6 — Frontend: Fill in `src/api/leads.ts` and `src/api/payments.ts`.
- [ ] 4.7 — Frontend: Wire `TradespersonMyLeadsPage` to `useLeads()` — remove hardcoded LEADS.
- [ ] 4.8 — Frontend: Build `TradespersonLeadDetailPage` with job info, credit cost, express interest button.
- [ ] 4.9 — Frontend: Wire HomeownerJobDetailPage responses to show real interested tradespeople.
- [ ] 4.10 — Frontend: Add credit balance display in tradesperson dashboard sidebar.

### Acceptance criteria
- Tradesperson sees leads matching their services/radius
- Clicking "Express Interest" deducts credits, creates quote, notifies homeowner
- Insufficient credits shows error with "Top up" link
- Homeowner sees interested tradespeople on their job detail page

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/API.md (Sections 4-5: Leads & Quotes), reference/BUSINESS_LOGIC.md (Sections 3-4: Credits & Quotes), reference/PAGES_WIRING.md (TradespersonMyLeadsPage, TradespersonLeadDetailPage), and reference/FRONTEND_API_LAYER.md (leads.ts, payments.ts) for context.

Execute Phase 4: Leads & Express Interest.

BACKEND:
1. In leads controller: implement GET /leads (TRADESPERSON auth, paginated, filterable by status/service/distance, sorted)
2. Implement GET /leads/:id (TRADESPERSON auth, own lead only)
3. Implement POST /leads/:id/express-interest:
   - Validate lead status is AVAILABLE
   - Atomic transaction: check balance >= creditCost, deduct credits, update lead to INTERESTED, create Quote row, create Conversation + first Message
   - Return { leadStatus, creditsDeducted, newBalance, quoteId }
4. In payments controller: implement GET /payments/balance (returns LeadCredit balance + auto-topup settings)

FRONTEND:
5. Fill in src/api/leads.ts and src/api/payments.ts from reference/FRONTEND_API_LAYER.md
6. Rewrite TradespersonMyLeadsPage.tsx: remove LEADS array, use useLeads({ status: "AVAILABLE" }), add filtering by service and distance, add SkeletonCard loading, add empty state
7. Build TradespersonLeadDetailPage.tsx: use useLead(id), show job details + credit cost + "Express Interest" button with message textarea. Wire button to useExpressInterest() mutation. Show balance. Block if insufficient credits.
8. Update HomeownerJobDetailPage: show responses from useJob() data — tradesperson cards with avatar, rating, quote amount
9. Create CreditBalance component showing balance in tradesperson sidebar/header

Test: Seed a tradesperson with 50 credits → post a job that matches → see lead → express interest → verify credit deduction → homeowner sees response.
```

---

## Phase 5: Profiles & Reviews

**Goal:** Public tradesperson profiles with real data, profile settings that save, review system.

### Tasks
- [ ] 5.1 — Backend: Implement `GET /users/:username` (public profile).
- [ ] 5.2 — Backend: Implement `GET /users/me/profile` (own tradesperson profile).
- [ ] 5.3 — Backend: Implement `PATCH /users/me/profile` (update bio, postcode, radius, etc.).
- [ ] 5.4 — Backend: Implement CRUD for services, qualifications, portfolio, message templates.
- [ ] 5.5 — Backend: Implement avatar + ID document upload.
- [ ] 5.6 — Backend: Implement `POST /reviews` with eligibility checks.
- [ ] 5.7 — Backend: Implement `GET /reviews` (paginated, by tradesperson).
- [ ] 5.8 — Backend: Implement `POST /reviews/:id/reply`.
- [ ] 5.9 — Frontend: Fill in `src/api/users.ts` and `src/api/reviews.ts`.
- [ ] 5.10 — Frontend: Wire `TradespersonPublicProfilePage` to `usePublicProfile()`.
- [ ] 5.11 — Frontend: Wire `TradespersonProfilePage` all tabs to real mutations.
- [ ] 5.12 — Frontend: Build review submission form for completed jobs.
- [ ] 5.13 — Frontend: Build ReviewCard component.

### Acceptance criteria
- Public profile page loads real data from API
- Tradesperson can edit bio, company name, postcode, work radius — changes persist
- Can upload portfolio images and avatar
- Homeowner can leave a review on a completed job
- Tradesperson can reply to review
- Average rating recalculates on new review

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/API.md (Sections 2, 7: Users & Reviews), reference/BUSINESS_LOGIC.md (Section 5: Review Eligibility), reference/PAGES_WIRING.md (TradespersonProfilePage, TradespersonPublicProfilePage), reference/FRONTEND_API_LAYER.md (users.ts, reviews.ts), and reference/COMPONENTS_TO_BUILD.md (ReviewCard, ReviewForm) for context.

Execute Phase 5: Profiles & Reviews.

BACKEND:
1. In users controller: implement GET /users/:username (public profile aggregation — profile + services + qualifications + portfolio + rating breakdown + recent reviews)
2. Implement GET /users/me/profile (TRADESPERSON auth)
3. Implement PATCH /users/me/profile (update fields, geocode if postcode changes)
4. Implement CRUD endpoints: POST/DELETE /users/me/services, POST/DELETE /users/me/qualifications, POST/DELETE /users/me/portfolio (with R2 upload), POST/PATCH/DELETE /users/me/message-templates
5. Implement POST /users/me/avatar and POST /users/me/id-document (file upload)
6. In reviews controller: implement POST /reviews with eligibility validation (job COMPLETED, correct homeowner, hired tradesperson, within 90 days, unique per job)
7. Implement GET /reviews?tradespersonId=X (paginated)
8. Implement POST /reviews/:id/reply (TRADESPERSON, review subject only, one reply per review)
9. On new review: recalculate avgRating + reviewCount on tradesperson_profiles

FRONTEND:
10. Fill in src/api/users.ts and src/api/reviews.ts from reference/FRONTEND_API_LAYER.md
11. Rewrite TradespersonPublicProfilePage: remove hardcoded tradesperson object, use usePublicProfile(username)
12. Wire TradespersonProfilePage tabs: Company Description → useUpdateMyProfile, Portfolio → useUploadPortfolio, Services → useAddService/useRemoveService, Work Area → useUpdateMyProfile, etc.
13. Create ReviewCard and ReviewForm components
14. Add review form on completed job detail page (homeowner view)

Test: Create tradesperson → edit profile → upload portfolio → complete a job → homeowner leaves review → review appears on public profile.
```

---

## Phase 6: Questions & Answers

**Goal:** Wire the Q&A community features to real backend data.

### Tasks
- [ ] 6.1 — Backend: Implement questions CRUD (`POST /questions`, `GET /questions`, `GET /questions/:id`).
- [ ] 6.2 — Backend: Implement answers (`POST /questions/:id/answers`, `POST /answers/:id/like`, `PATCH /answers/:id/best`).
- [ ] 6.3 — Frontend: Fill in `src/api/questions.ts`.
- [ ] 6.4 — Frontend: Wire `QuestionsPage` to `useQuestions()` — remove hardcoded data.
- [ ] 6.5 — Frontend: Wire `QuestionPage` to `useQuestion()` — remove hardcoded data.
- [ ] 6.6 — Frontend: Wire `AskQuestionModal` to `useCreateQuestion()`.
- [ ] 6.7 — Frontend: Wire answer submission + likes.

### Acceptance criteria
- Questions page loads real data with service filtering + sorting + pagination
- Question detail shows real answers
- Can ask a new question via modal
- Tradesperson can post an answer
- Like button toggles and updates count
- Mark best answer works (question author only)

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/API.md (Section 8: Questions), reference/PAGES_WIRING.md (QuestionsPage, QuestionPage, AskQuestionModal), and reference/FRONTEND_API_LAYER.md (questions.ts) for context.

Execute Phase 6: Questions & Answers.

BACKEND:
1. In questions controller: implement POST /questions (any authenticated user), GET /questions (public, paginated, filterable by serviceSlug, sortable by createdAt/answerCount), GET /questions/:id (with answers populated, include likedByMe for authenticated users)
2. Implement POST /questions/:id/answers (TRADESPERSON auth), which increments question.answerCount
3. Implement POST /answers/:id/like (toggle, unique per user, update likesCount)
4. Implement PATCH /answers/:id/best (only question author can set, unsets previous best on same question)

FRONTEND:
5. Fill in src/api/questions.ts from reference/FRONTEND_API_LAYER.md
6. Rewrite QuestionsPage: remove hardcoded questions array and console.log, use useQuestions() with URL-synced filters (serviceSlug, sort, page), add skeleton loading, empty state, pagination
7. Rewrite QuestionPage: remove hardcoded question/answers, use useQuestion(id), wire answer form to useCreateAnswer(), wire like button to useToggleAnswerLike(), wire "Mark best" to markBestAnswer()
8. Wire AskQuestionModal: useCreateQuestion() mutation, on success navigate to new question page

Test: Ask a question → answer it as tradesperson → like the answer → mark as best → verify on questions list page.
```

---

## Phase 7: Messaging & Notifications

**Goal:** Real-time chat between homeowners and tradespeople. Notification system.

### Tasks
- [ ] 7.1 — Backend: Implement conversations CRUD (`GET /conversations`, `GET /conversations/:id/messages`, `POST /conversations/:id/messages`).
- [ ] 7.2 — Backend: Set up NestJS WebSocket gateway for chat.
- [ ] 7.3 — Backend: Implement notification CRUD + creation triggers.
- [ ] 7.4 — Backend: Set up WebSocket gateway for notifications.
- [ ] 7.5 — Frontend: Fill in `src/api/messaging.ts` and `src/api/notifications.ts`.
- [ ] 7.6 — Frontend: Build ChatWindow + MessageBubble components.
- [ ] 7.7 — Frontend: Wire TradespersonContactsPage to real conversations.
- [ ] 7.8 — Frontend: Build NotificationBell + NotificationDropdown components.
- [ ] 7.9 — Frontend: Add notification bell to Header.

### Acceptance criteria
- Conversations created when tradesperson expresses interest
- Messages display in real-time (WebSocket or polling fallback)
- Unread count shows in notification bell
- Notifications created for key events (new lead, new interest, new message)
- Notification dropdown shows recent notifications with links

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/API.md (Sections 6, 10: Messaging & Notifications), reference/BUSINESS_LOGIC.md (Section 6: Notification Matrix), reference/COMPONENTS_TO_BUILD.md (ChatWindow, MessageBubble, NotificationBell, NotificationDropdown), and reference/FRONTEND_API_LAYER.md (messaging.ts, notifications.ts) for context.

Execute Phase 7: Messaging & Notifications.

BACKEND:
1. Install: pnpm add @nestjs/websockets @nestjs/platform-socket.io socket.io
2. In messaging controller: implement GET /conversations (list for current user with last message + unread count), GET /conversations/:id/messages (paginated, marks as read), POST /conversations/:id/messages
3. Create ChatGateway (@WebSocketGateway): handle join_conversation, send_message, typing events. Emit new_message to room. Authenticate via JWT in handshake.
4. In notifications service: create a createNotification() method called by other services. Implement all triggers from the notification matrix in reference/BUSINESS_LOGIC.md.
5. In notifications controller: implement GET /notifications (paginated), GET /notifications/unread-count, PATCH /notifications/:id/read, POST /notifications/read-all
6. Create NotificationGateway: emit real-time notifications to connected users

FRONTEND:
7. Fill in src/api/messaging.ts and src/api/notifications.ts
8. Build ChatWindow component: message list (scrollable, auto-scroll to bottom), message input, typing indicator. Use useMessages() with polling, upgrade to WebSocket later.
9. Build MessageBubble component: sender alignment (left/right), timestamp, read status
10. Wire TradespersonContactsPage: use useConversations(), list conversation cards, click → show ChatWindow
11. Build NotificationBell (bell icon + unread count badge) and NotificationDropdown (list of recent notifications with links, "Mark all read" button)
12. Add NotificationBell to Header.tsx (shown only when authenticated)

Test: Express interest → conversation created → send messages → see notification bell update → click notification → navigate to conversation.
```

---

## Phase 8: Payments & Lead Credits

**Goal:** Stripe integration for credit purchases. Auto-topup. Payment history.

### Tasks
- [ ] 8.1 — Backend: Set up Stripe (checkout sessions, webhooks).
- [ ] 8.2 — Backend: Implement `POST /payments/checkout` (create Stripe Checkout Session).
- [ ] 8.3 — Backend: Implement Stripe webhook handler (credit fulfillment on success).
- [ ] 8.4 — Backend: Implement `GET /payments/history`.
- [ ] 8.5 — Backend: Implement `PATCH /payments/auto-topup`.
- [ ] 8.6 — Frontend: Fill in `src/api/payments.ts`.
- [ ] 8.7 — Frontend: Build PurchaseCreditsModal with credit pack options.
- [ ] 8.8 — Frontend: Wire Balance tab in TradespersonProfilePage.
- [ ] 8.9 — Frontend: Wire Payments tab (transaction history).
- [ ] 8.10 — Frontend: Block express-interest when insufficient credits, show purchase prompt.

### Acceptance criteria
- Tradesperson can purchase credits via Stripe Checkout
- Credits added to balance after successful payment
- Payment history shows all transactions
- Auto-topup triggers when balance drops below threshold
- Express interest blocked with helpful message when insufficient credits

### Copilot Prompt
```
Read reference/CONTEXT.md, reference/API.md (Section 9: Payments), reference/BUSINESS_LOGIC.md (Section 3: Lead Credits), reference/COMPONENTS_TO_BUILD.md (CreditBalance, PurchaseCreditsModal), and reference/FRONTEND_API_LAYER.md (payments.ts) for context.

Execute Phase 8: Payments & Lead Credits.

BACKEND:
1. Install: pnpm add stripe
2. Create StripeService: initialize with STRIPE_SECRET_KEY, implement createCheckoutSession() (with credit pack line items, success/cancel URLs), handleWebhook() (verify signature, process checkout.session.completed)
3. In payments controller: implement POST /payments/checkout (create Stripe session, save Payment row with PENDING status), POST /payments/webhook (Stripe signature validation, on success: update Payment to COMPLETED, increment LeadCredit.balance)
4. Implement GET /payments/history (paginated transaction log)
5. Implement PATCH /payments/auto-topup (enable/disable, set amount + threshold)
6. Add auto-topup check in express-interest flow: if balance drops below threshold after deduction, trigger auto-topup via saved payment method

FRONTEND:
7. Fill in src/api/payments.ts from reference/FRONTEND_API_LAYER.md
8. Build PurchaseCreditsModal: show 4 credit packs (25/60/150/400 credits at different prices), "Buy" button calls useCreateCheckout() which redirects to Stripe
9. Wire Balance tab in TradespersonProfilePage: show balance from useBalance(), "Buy credits" button opens PurchaseCreditsModal, auto-topup toggle
10. Wire Payments tab: usePaymentHistory() with pagination
11. In TradespersonLeadDetailPage: if balance < creditCost, show "Insufficient credits" with CTA to open PurchaseCreditsModal instead of express interest form

Test: Purchase credits via Stripe test mode → verify balance increases → express interest → verify deduction → check payment history.
```

---

## Phase 9: Production Hardening

**Goal:** Security, performance, SEO, monitoring, CI/CD — ready to ship.

### Tasks
- [ ] 9.1 — Backend: Add rate limiting (`@nestjs/throttler`) on auth endpoints.
- [ ] 9.2 — Backend: Add input sanitization (prevent XSS in text fields).
- [ ] 9.3 — Backend: Set up API versioning (`/api/v1/`).
- [ ] 9.4 — Backend: Add request logging (Pino or Winston).
- [ ] 9.5 — Backend: Add health check with DB connectivity test.
- [ ] 9.6 — Frontend: Add React ErrorBoundary at route level.
- [ ] 9.7 — Frontend: Add loading skeletons to ALL pages that fetch data.
- [ ] 9.8 — Frontend: Complete SEO meta tags for all pages (`react-helmet-async`).
- [ ] 9.9 — Frontend: Generate sitemap.xml and update robots.txt.
- [ ] 9.10 — Frontend: Bundle analysis + tree shaking audit.
- [ ] 9.11 — Set up Sentry for both frontend and backend error tracking.
- [ ] 9.12 — Set up GitHub Actions CI: lint + typecheck + build for both repos.
- [ ] 9.13 — Set up deployment: Vercel (frontend) + Railway (backend).
- [ ] 9.14 — Add GDPR cookie consent banner.
- [ ] 9.15 — Backend: Add job expiration cron (close stale jobs, expire old leads).
- [ ] 9.16 — Security audit: OWASP Top 10 checklist pass.

### Acceptance criteria
- No console errors in production build
- Lighthouse score > 90 for performance, accessibility, SEO
- All API endpoints rate-limited appropriately
- Error tracking captures and reports issues
- CI pipeline passes on every push
- Deployed and accessible on production URLs

### Copilot Prompt
```
Read reference/CONTEXT.md and reference/PHASES.md for context.

Execute Phase 9: Production Hardening.

BACKEND:
1. Install: pnpm add @nestjs/throttler @nestjs/schedule helmet @sentry/nestjs pino pino-pretty nestjs-pino
2. Add ThrottlerModule globally. Set auth endpoints to 5 req/min, other endpoints to 60 req/min.
3. Add Helmet middleware for security headers.
4. Add request logging with nestjs-pino.
5. Add @nestjs/schedule cron: daily at 02:00 UTC, close ACTIVE jobs with 0 interest after 14 days, expire leads older than 7 days.
6. Add Sentry integration with DSN from env.
7. Validate all text inputs to strip HTML tags (prevent XSS).

FRONTEND:
8. Create src/components/shared/ErrorBoundary.tsx (React error boundary with fallback UI + Sentry report)
9. Wrap each route group with ErrorBoundary in App.tsx
10. Add loading skeletons to every page that fetches: SkeletonCard, SkeletonProfile, SkeletonList
11. Add react-helmet-async <Helmet> with unique title + description to EVERY page
12. Create public/sitemap.xml with all public routes
13. Update public/robots.txt to include sitemap reference
14. Install @sentry/react + configure in main.tsx
15. Create .github/workflows/ci.yml: on push/PR, run pnpm lint && pnpm tsc --noEmit && pnpm build for frontend, pnpm lint && pnpm build for backend
16. Review bundle size with vite-bundle-visualizer, ensure no unnecessary large imports

Test: Run Lighthouse audit on deployed frontend. Verify all scores > 90.
```

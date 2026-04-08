# Builder Network — Build Progress

> Track completion across all phases. Check off tasks as they are completed.
> This file mirrors `PHASES.md` — update both together.

---

## Phase 0: Cleanup & Foundation

- [ ] 0.1 — Delete duplicate `TradesPage.tsx`, update imports
- [ ] 0.2 — Delete duplicate `src/data/services.ts`, update imports
- [ ] 0.3 — Remove all `console.log` debug statements
- [ ] 0.4 — Replace all `alert()` with toast notifications
- [ ] 0.5 — Add `React.lazy()` + `Suspense` code splitting in `App.tsx`
- [ ] 0.6 — Enable `strictNullChecks: true`, fix type errors
- [ ] 0.7 — Install `axios`, `zustand`, `react-helmet-async`
- [ ] 0.8 — Create `src/api/client.ts` (Axios wrapper + JWT interceptors)
- [ ] 0.9 — Create `src/api/types.ts` (shared API types)
- [ ] 0.10 — Create stub files for all API modules
- [ ] 0.11 — Extract shared `<Breadcrumb>` component
- [ ] 0.12 — Add `react-helmet-async` provider + meta tags

---

## Phase 1: Backend Scaffold

- [ ] 1.1 — Initialize NestJS in `TBN-Server/`
- [ ] 1.2 — Install and configure Prisma + PostgreSQL
- [ ] 1.3 — Add full Prisma schema from `DATABASE.md`
- [ ] 1.4 — Run initial migration
- [ ] 1.5 — Seed `services` and `trades` tables
- [ ] 1.6 — Create all NestJS module structure (13 modules)
- [ ] 1.7 — Set up environment config with validation (Joi)
- [ ] 1.8 — Set up CORS for frontend origin
- [ ] 1.9 — Add global `ValidationPipe`
- [ ] 1.10 — Create `GET /api/v1/health` endpoint
- [ ] 1.11 — Set up `postgresql://neondb_owner:npg_PsqyI0fBTCA3@ep-still-dawn-a1bp5ei6-pooler.ap-southeast-1.aws.neon.tech/tbn?sslmode=require&channel_binding=require` for PostgreSQL DB

---

## Phase 2: Authentication System

- [ ] 2.1 — Backend: `POST /auth/register`
- [ ] 2.2 — Backend: `POST /auth/login`
- [ ] 2.3 — Backend: `POST /auth/refresh`
- [ ] 2.4 — Backend: `GET /auth/me`
- [ ] 2.5 — Backend: Forgot password + reset password (Resend email)
- [ ] 2.6 — Backend: Email verification
- [ ] 2.7 — Backend: JwtAuthGuard + RolesGuard
- [ ] 2.8 — Frontend: Rewrite `AuthContext.tsx` with `useMe()` query
- [ ] 2.9 — Frontend: Fill in `src/api/auth.ts`
- [ ] 2.10 — Frontend: Wire `LoginModal.tsx` to `useLogin()`
- [ ] 2.11 — Frontend: Wire `ForgotPasswordModal.tsx`
- [ ] 2.12 — Frontend: Registration submission with Zustand store
- [ ] 2.13 — Frontend: Session expired toast + redirect
- [ ] 2.14 — Test: Full auth flow end-to-end

---

## Phase 3: Job Posting End-to-End

- [ ] 3.1 — Backend: `POST /jobs` with file upload + geocoding
- [ ] 3.2 — Backend: Cloudflare R2 upload service
- [ ] 3.3 — Backend: Matching algorithm (service + geo + radius)
- [ ] 3.4 — Backend: Create leads for matched tradespeople
- [ ] 3.5 — Backend: `GET /jobs` (paginated)
- [ ] 3.6 — Backend: `GET /jobs/:id` (with responses)
- [ ] 3.7 — Backend: `PATCH /jobs/:id` (cancel/close)
- [ ] 3.8 — Frontend: Wire JobFunnel to `useCreateJob()`
- [ ] 3.9 — Frontend: Job success page/modal
- [ ] 3.10 — Frontend: Wire `HomeownerMyJobsPage` to `useJobs()`
- [ ] 3.11 — Frontend: Build `HomeownerJobDetailPage`
- [ ] 3.12 — Frontend: Loading skeletons + empty states

---

## Phase 4: Leads & Express Interest

- [ ] 4.1 — Backend: `GET /leads` (tradesperson's leads)
- [ ] 4.2 — Backend: `GET /leads/:id`
- [ ] 4.3 — Backend: `POST /leads/:id/express-interest` (atomic credit deduction)
- [ ] 4.4 — Backend: LeadCredit balance management
- [ ] 4.5 — Backend: `GET /payments/balance`
- [ ] 4.6 — Frontend: Fill in `leads.ts` + `payments.ts`
- [ ] 4.7 — Frontend: Wire `TradespersonMyLeadsPage`
- [ ] 4.8 — Frontend: Build `TradespersonLeadDetailPage`
- [ ] 4.9 — Frontend: Wire HomeownerJobDetailPage responses
- [ ] 4.10 — Frontend: Credit balance display

---

## Phase 5: Profiles & Reviews

- [ ] 5.1 — Backend: `GET /users/:username` (public profile)
- [ ] 5.2 — Backend: `GET /users/me/profile`
- [ ] 5.3 — Backend: `PATCH /users/me/profile`
- [ ] 5.4 — Backend: CRUD for services, qualifications, portfolio, templates
- [ ] 5.5 — Backend: Avatar + ID document upload
- [ ] 5.6 — Backend: `POST /reviews` with eligibility checks
- [ ] 5.7 — Backend: `GET /reviews` (paginated)
- [ ] 5.8 — Backend: `POST /reviews/:id/reply`
- [ ] 5.9 — Frontend: Fill in `users.ts` + `reviews.ts`
- [ ] 5.10 — Frontend: Wire `TradespersonPublicProfilePage`
- [ ] 5.11 — Frontend: Wire `TradespersonProfilePage` all tabs
- [ ] 5.12 — Frontend: Review submission form
- [ ] 5.13 — Frontend: Build `ReviewCard` component

---

## Phase 6: Questions & Answers

- [ ] 6.1 — Backend: Questions CRUD
- [ ] 6.2 — Backend: Answers + likes + best answer
- [ ] 6.3 — Frontend: Fill in `questions.ts`
- [ ] 6.4 — Frontend: Wire `QuestionsPage`
- [ ] 6.5 — Frontend: Wire `QuestionPage`
- [ ] 6.6 — Frontend: Wire `AskQuestionModal`
- [ ] 6.7 — Frontend: Answer submission + likes

---

## Phase 7: Messaging & Notifications

- [ ] 7.1 — Backend: Conversations + messages CRUD
- [ ] 7.2 — Backend: WebSocket gateway for chat
- [ ] 7.3 — Backend: Notification CRUD + triggers
- [ ] 7.4 — Backend: WebSocket for notifications
- [ ] 7.5 — Frontend: Fill in `messaging.ts` + `notifications.ts`
- [ ] 7.6 — Frontend: Build ChatWindow + MessageBubble
- [ ] 7.7 — Frontend: Wire TradespersonContactsPage
- [ ] 7.8 — Frontend: Build NotificationBell + NotificationDropdown
- [ ] 7.9 — Frontend: Add notification bell to Header

---

## Phase 8: Payments & Lead Credits

- [ ] 8.1 — Backend: Stripe setup (checkout + webhooks)
- [ ] 8.2 — Backend: `POST /payments/checkout`
- [ ] 8.3 — Backend: Stripe webhook handler
- [ ] 8.4 — Backend: `GET /payments/history`
- [ ] 8.5 — Backend: `PATCH /payments/auto-topup`
- [ ] 8.6 — Frontend: Fill in `payments.ts`
- [ ] 8.7 — Frontend: Build PurchaseCreditsModal
- [ ] 8.8 — Frontend: Wire Balance tab
- [ ] 8.9 — Frontend: Wire Payments tab (history)
- [ ] 8.10 — Frontend: Block express-interest on insufficient credits

---

## Phase 9: Production Hardening

- [ ] 9.1 — Backend: Rate limiting on auth endpoints
- [ ] 9.2 — Backend: Input sanitization (XSS prevention)
- [ ] 9.3 — Backend: API versioning (`/api/v1/`)
- [ ] 9.4 — Backend: Request logging (Pino)
- [ ] 9.5 — Backend: Health check with DB connectivity
- [ ] 9.6 — Frontend: React ErrorBoundary at route level
- [ ] 9.7 — Frontend: Loading skeletons on ALL data-fetching pages
- [ ] 9.8 — Frontend: SEO meta tags for all pages
- [ ] 9.9 — Frontend: Generate sitemap.xml + update robots.txt
- [ ] 9.10 — Frontend: Bundle analysis + tree shaking
- [ ] 9.11 — Sentry integration (frontend + backend)
- [ ] 9.12 — GitHub Actions CI pipeline
- [ ] 9.13 — Deployment: Vercel + Railway
- [ ] 9.14 — GDPR cookie consent banner
- [ ] 9.15 — Backend: Job expiration cron
- [ ] 9.16 — Security audit: OWASP Top 10 pass

---

## Summary

| Phase | Tasks | Done | Status |
|-------|-------|------|--------|
| 0 — Cleanup & Foundation | 12 | 0 | Not started |
| 1 — Backend Scaffold | 11 | 0 | Not started |
| 2 — Authentication | 14 | 0 | Not started |
| 3 — Job Posting | 12 | 0 | Not started |
| 4 — Leads & Interest | 10 | 0 | Not started |
| 5 — Profiles & Reviews | 13 | 0 | Not started |
| 6 — Questions & Answers | 7 | 0 | Not started |
| 7 — Messaging & Notifications | 9 | 0 | Not started |
| 8 — Payments & Credits | 10 | 0 | Not started |
| 9 — Production Hardening | 16 | 0 | Not started |
| **Total** | **114** | **0** | |

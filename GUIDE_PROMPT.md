# Mega-Prompt: Deep Audit & Completion Guide Generator

> **Instructions**: Copy everything below the line into a **new Claude Code session**.  
> Before running this, delete the contents of the `reference/` folder (or leave it — the guide goes to `guide/` instead).  
> This prompt tells Claude to read your entire codebase and produce a `guide/` folder with exhaustive fix/completion files.

---

```
You are a senior full-stack engineer performing an exhaustive audit of "The Builder Network" (TBN) — a UK tradespeople marketplace (mybuilder.com clone). The codebase is ~75% built but was generated across many disconnected AI sessions, so it has integration gaps, inconsistencies, stub code, broken flows, and UI drift.

Your job: Read EVERY file in both `TBN-Web/` (React + Vite + TypeScript + shadcn/ui + TanStack React Query) and `TBN-Server/` (NestJS + Prisma + PostgreSQL + Socket.IO + Stripe), then generate an exhaustive `guide/` folder that serves as the single source of truth for completing this platform end-to-end.

## What "end-to-end complete" means

A user should be able to:
1. Land on the homepage → see a polished, consistent UI
2. Post a job (full question-tree funnel → account creation if unauthenticated → job submitted → matched to tradespeople)
3. Register as tradesperson (5-step form → profile created → leads appear)
4. Log in / log out / forgot password / reset password / verify email — all flows working
5. Homeowner: see my jobs, view job detail with quotes, accept/decline quotes, leave reviews, ask questions
6. Tradesperson: see leads, express interest (credits deducted), send messages in real-time, manage profile (services, qualifications, portfolio, message templates), buy credits, configure auto-topup
7. Real-time: messages appear instantly via WebSocket, notification bell updates live
8. Every page: consistent padding/spacing, brand name correct ("The Builder Network" everywhere), no duplicate headers, proper loading/error/empty states, mobile-responsive
9. Backend: every endpoint returns correct data, proper auth guards, no 404s from wrong paths, file uploads work, Stripe webhooks process correctly
10. No console errors, no dead links, no hardcoded user data, no "MyBuilder" references

## IMPORTANT CONTEXT (verified facts — do NOT re-discover these)

### What IS working:
- App.tsx: All routes defined, lazy-loaded, wrapped in ErrorBoundary, protected routes use ProtectedRoute (role="homeowner" / role="tradesperson")
- ScrollToTop component is mounted in App.tsx
- src/api/: All 14 files are REAL implementations (not stubs) — client.ts, auth.ts, jobs.ts, leads.ts, quotes.ts, reviews.ts, questions.ts, users.ts, messaging.ts, notifications.ts, payments.ts, search.ts, types.ts, index.ts
- All React Query hooks exist and follow TanStack v5 patterns
- socket.io-client IS installed and src/lib/socket.ts exists with /ws/chat + /ws/notifications namespaces
- useChatSocket.ts, useNotificationSocket.ts, useSocketConnection.ts all exist and are real
- AuthContext.tsx: Real implementation with useMe() query, login/logout, JWT refresh in client.ts interceptor
- PurchaseCreditsModal.tsx: Exists, uses redirect-based Stripe Checkout (no need for @stripe/react-stripe-js)
- NotificationBell.tsx, NotificationItem.tsx: Exist
- ChatWindow.tsx, MessageBubble.tsx, ConversationListItem.tsx: Exist
- All shared components (19 files) are real implementations
- Tailwind config: container centered, 4rem padding, Space Grotesk font, HSL CSS variables
- Backend: ALL 13 modules have full implementations (auth, users, jobs, leads, quotes, messaging, reviews, questions, payments, notifications, uploads, search, maintenance)
- Backend: Prisma schema is complete with all models, enums, relations, indexes
- Backend: WebSocket gateways exist for chat and notifications
- Backend: Stripe integration with checkout sessions and webhook handling
- Backend: File uploads to Cloudflare R2
- Backend: Rate limiting (60/min global, 5/min auth)
- Backend: Cron jobs for stale jobs/leads cleanup
- Backend: .env.example exists with all variables documented

### What IS broken/missing/incomplete (verified):
1. **"MyBuilder" branding**: PrivacyPage.tsx has 15+ "MyBuilder" references, src/types/post-job.ts comment mentions "MyBuilder"
2. **Hardcoded pages that should fetch from backend**: Home.tsx (hero stats like "10,000+ jobs posted" are fake), ServicesPage.tsx, ServicePage.tsx, Trades.tsx, TradePage.tsx — all use constants/services.ts and constants/trades.ts instead of API
3. **Dead link**: HowItWorksPage.tsx links to `/tradespeople` which doesn't exist as a route (should be `/tradesnetwork` or `/search`)
4. **Dead links**: QuestionPage.tsx and HomeownerJobDetailPage.tsx link to `/tradespeople/${username}` — should be `/tradesperson/${username}` (singular)
5. **Padding inconsistency**: Pages use different wrapper patterns:
   - `container py-10` (most protected pages)
   - `container py-12` (services, trades, quality checks)
   - `container py-16 md:py-16` (legal pages, become-a-partner, cities)
   - `max-w-5xl mx-auto px-4 py-8` (TradespersonProfilePage, ContactsPage, QuestionPage)
   - `max-w-2xl mx-auto px-6` (TradespersonJoinPage)
   - No container at all (Home.tsx, TradesnetworkPage.tsx)
6. **TradespersonJoinPage**: Has its own custom header bar inside the page (`border-b px-6 py-4`) — may duplicate global Header
7. **Admin module**: Empty stub (acceptable — excluded from this audit)
8. **Lead count trust signal**: `countAvailableLeadsNear()` in leads.service.ts ignores postcode/radius params — returns total count of all active jobs
9. **Search**: Simple substring search, no full-text indexing
10. **Stripe**: `@stripe/react-stripe-js` is NOT installed, but the PurchaseCreditsModal uses redirect-based checkout which doesn't need it — HOWEVER, verify the `useCreateCheckout` hook actually opens the Stripe URL (check if it does `window.location.href = session.url`)
11. **Login modal**: LoginModal.tsx exists but verify it's triggered from Header.tsx and all "Log in" / "Sign in" buttons across the site
12. **Forgot password flow**: ForgotPasswordModal.tsx exists — verify it's accessible from LoginModal
13. **Email verification flow**: Backend has POST /auth/verify-email — verify frontend handles the verification link/page
14. **Registration → auto-login**: Verify TradespersonJoinPage's StepCreateAccount.tsx actually calls the register API and logs the user in
15. **HomeownerProfilePage.tsx**: Verify this isn't still showing hardcoded/skeleton data
16. **HomeownerMyQuestionsPage.tsx**: Verify data fetching works (not empty stub)
17. **TradespersonPublicProfilePage.tsx**: Verify reviews tab, portfolio tab, contact button all work
18. **Dark mode**: `next-themes` installed but likely not activated — is there a theme toggle?
19. **Accessibility**: No ARIA audit done
20. **Testing**: Zero test files exist for frontend or meaningful backend tests
21. **SEO**: Helmet is used on pages — verify all pages have proper title/description
22. **Mobile responsiveness**: Not audited systematically
23. **Error states**: Do all pages with API calls handle error + empty states nicely?
24. **Loading states**: Do all pages show proper skeletons while data loads?
25. **Form validation**: Are all forms using zod schemas with proper error messages?
26. **File upload UI**: Can homeowners attach files to jobs? Can tradespeople upload portfolio images? Verify the upload components exist and work
27. **Conversation creation**: When tradesperson expresses interest, a conversation is created via backend — verify the frontend chat page actually shows it
28. **Review system**: Can homeowner leave review only after job COMPLETED? Verify the frontend enforces this
29. **Credit system**: Does the credit balance update in real-time after purchase? After express interest?
30. **Auto-topup**: Backend has the framework — is there UI to configure it? Verify TradespersonProfilePage Credits tab
31. **Qualification/portfolio/message-template CRUD**: Backend has full endpoints — verify the TradespersonProfilePage tabs actually call these APIs
32. **Public tradesperson search**: `/search` route doesn't exist in App.tsx — the search API exists but there's no search page
33. **Breadcrumbs**: Breadcrumb.tsx exists — is it used on any pages?
34. **Toast notifications**: Two toast systems exist (shadcn use-toast.ts AND sonner) — which is actually used? Are there conflicts?
35. **vercel.json**: Exists — verify it has proper rewrites for SPA routing

## FILES TO GENERATE

Create a `guide/` folder in the project root with these files:

---

### guide/OVERVIEW.md
A concise (max 500 words) summary of:
- What this guide folder is and how to use it
- Current platform status (what % is truly working end-to-end)
- The 3 biggest blockers preventing production readiness
- How to execute: "Run one session per phase from FIX_PHASES.md, paste the prompt, let Claude work, verify with the acceptance criteria, check off in PROGRESS.md"

---

### guide/AUDIT.md
The exhaustive audit. For EVERY issue you find, include:
- **Category**: UI | UX | Routing | API Integration | Backend | Data | Security | Performance | Accessibility | SEO | Mobile | Brand
- **Severity**: CRITICAL (blocks core flow) | HIGH (visible bug) | MEDIUM (inconsistency) | LOW (polish)
- **File path(s)** with line numbers
- **What's wrong** (1-2 sentences, specific)
- **What the fix is** (1-2 sentences, specific)

Organize by category. Number every finding (AUDIT-001, AUDIT-002, etc.) so FIX_PHASES.md can reference them.

Check EVERY SINGLE FILE in:
- src/pages/ (every page)
- src/components/ (every component)
- src/api/ (verify endpoint URLs match backend controller paths)
- src/hooks/ (verify all hooks are used)
- src/contexts/ (verify auth flow completeness)
- src/lib/ (verify socket connection, utils)
- src/constants/ (verify data is correct)
- src/stores/ (verify Zustand store is used correctly)
- src/types/ (verify types match backend DTOs)
- TBN-Server/src/modules/ (every module — verify all DTOs have validation decorators, services have error handling, controllers have proper guards)
- TBN-Server/prisma/ (verify schema matches actual usage)

Pay special attention to:
- Frontend API URL paths vs backend controller paths (e.g., does `apiClient.get('/leads')` match `@Controller('api/v1/leads')`? Or does the axios client already prepend `/api/v1`?)
- TypeScript types on frontend that must match Prisma models + backend DTOs
- Form submissions that must match DTO validation rules
- WebSocket event names on frontend vs backend gateway event handlers
- Missing query invalidation after mutations (stale data after create/update)
- React Query error handling (onError callbacks, error boundaries)

---

### guide/UI_STANDARDS.md
The definitive design system rules derived from the BEST-looking pages in the codebase. Include:

1. **Page wrapper pattern**: The exact className every page type should use:
   - Full-width pages (homepage): `<main className="flex flex-col">`
   - Standard content pages: `<div className="container py-???">`
   - Narrow content pages: `<div className="container max-w-??? py-???">`
   - Dashboard pages: `<div className="container py-??? grid grid-cols-??? gap-???">`
   
2. **Typography scale**: h1, h2, h3, body, caption — exact Tailwind classes

3. **Color usage rules**: When to use primary, secondary, muted, destructive, success, warning, highlight

4. **Spacing rules**: Vertical rhythm between sections, card padding, form field gaps

5. **Component patterns**: 
   - Cards (border vs shadow, padding, rounded corners)
   - Buttons (primary, secondary, outline, ghost — when to use each)
   - Forms (label position, error message style, submit button placement)
   - Tables (striped? hover? mobile collapse?)
   - Empty states (icon + message + action pattern)
   - Loading states (skeleton vs spinner — when to use each)
   - Error states (inline vs full-page)

6. **Brand rules**: 
   - Name: "The Builder Network" (never "Builder Network", never "TBN", never "MyBuilder")
   - Logo usage in Header only — no page should render its own logo/brand header
   - Footer: consistent link sections

7. **Mobile rules**: Breakpoint classes, when to stack vs hide, touch target sizes

8. **Page template**: A literal React component template that every new page should copy:
```tsx
// Standard page template
export default function ExamplePage() {
  return (
    <>
      <Helmet><title>Page Title | The Builder Network</title></Helmet>
      <div className="[STANDARD WRAPPER]">
        <Breadcrumb items={[...]} />
        <h1 className="[STANDARD H1]">Page Title</h1>
        {/* content */}
      </div>
    </>
  );
}
```

---

### guide/MISSING_IMPLEMENTATIONS.md
For every feature/page/component that is incomplete, specify:
- **What exists** (current code, file path)
- **What's missing** (specific functions, API calls, UI elements)
- **Exact implementation spec** (TypeScript interfaces, component structure, API call pattern)
- **Dependencies** (what other fixes must happen first)

Cover at minimum:
1. Email verification page/flow (backend endpoint exists, frontend page missing?)
2. Tradesperson search page (API exists at GET /search/tradespeople, no frontend page)
3. PrivacyPage.tsx rewrite (remove all MyBuilder references, write TBN-specific privacy policy)
4. TermsPage.tsx audit (check for any wrong brand references)
5. Legal pages general audit (ReviewsPolicyPage, QualityRequirementsPage)
6. TradePage.tsx — currently uses hardcoded data, should it fetch from API?
7. ServicePage.tsx — currently hardcoded, should it fetch from API?
8. Home.tsx stats section — should these numbers come from an API?
9. Footer dead links audit
10. Any backend endpoint that exists but has no frontend consumer
11. Any frontend API call that hits an endpoint the backend doesn't have
12. Any Prisma model field that's never read or written by any endpoint
13. Missing middleware (request logging? CORS fine-tuning? CSP headers?)
14. Missing cron jobs (expired quote cleanup? inactive user notifications?)
15. Stripe webhook event handling completeness (checkout.session.completed ✓ — what about payment_intent.payment_failed? subscription events?)

---

### guide/FLOW_TESTS.md
For every user journey, a step-by-step manual test script:

**Flow 1: Homeowner posts a job (unauthenticated)**
1. Go to homepage
2. Enter postcode "SW1A 1AA" in hero → click "Post a job"
3. Expect: redirect to /post-job?postcode=SW1A+1AA
4. Select a service (e.g., "Bathroom fitting")
5. Answer all questions in the tree
6. Expect: email capture step appears
7. Enter email → Expect: account creation step
8. Create account with password
9. Expect: job is submitted, redirect to /homeowner/my-jobs
10. Expect: new job appears in list with status ACTIVE
11. ✅ / ❌ — note what breaks at each step

**Flow 2: Homeowner posts a job (authenticated)**
(similar but skips email/account steps)

**Flow 3: Tradesperson registration**
1. Go to /join
2. Step 1: Create account (email, password, name, phone)
3. Step 2: Work details (trade, services, postcode, radius)
4. Step 3: Profile setup (company name, bio)
5. Step 4: ID check (upload document)
6. Step 5: Safety & quality (insurance, guarantees)
7. Expect: redirect to /tradesperson/my-leads
8. ✅ / ❌

**Flow 4: Tradesperson views and expresses interest in a lead**
...

**Flow 5: Real-time messaging**
...

**Flow 6: Homeowner accepts a quote**
...

**Flow 7: Homeowner leaves a review**
...

**Flow 8: Credit purchase flow**
...

**Flow 9: Forgot password + reset**
...

**Flow 10: Email verification**
...

**Flow 11: Tradesperson profile management** (each tab)
...

**Flow 12: Questions & Answers**
...

**Flow 13: Public tradesperson profile view**
...

**Flow 14: Search for tradespeople** (if search page exists)
...

Write at least 14 flows. For each step, specify what URL you should be on, what you see, and what the expected API call is. Note any step where you suspect failure.

---

### guide/FIX_PHASES.md
Exactly 8 phases, each with:

**Phase N: [Goal]**
- **Estimated scope**: X files to modify, Y files to create
- **Dependencies**: Which previous phases must be done first
- **Audit items addressed**: AUDIT-001, AUDIT-005, AUDIT-012, etc.
- **Session prompt**: The exact prompt to paste into Claude Code (include file paths, exact changes, acceptance criteria)
- **Acceptance criteria**: What to verify after the session (terminal commands, browser checks)

Phases should be:

1. **Critical Path Fixes** — Dead links, wrong URLs (tradesperson vs tradespeople), wrong brand name, API path mismatches between frontend and backend, any 404-causing bugs
2. **UI Consistency Pass** — Standardize all page wrappers, padding, typography per UI_STANDARDS.md. Remove duplicate headers. Fix TradespersonJoinPage layout.
3. **Auth Flow Completion** — Email verification page, forgot/reset password end-to-end, registration auto-login, session persistence, logout cleanup
4. **Data Flow Verification** — Walk through every useQuery/useMutation and verify: correct endpoint, correct request shape, correct response handling, proper cache invalidation, loading/error/empty states
5. **Missing Features** — Search page, any missing CRUD UI, portfolio upload, file attachments on jobs, anything from MISSING_IMPLEMENTATIONS.md
6. **Real-time Features** — Verify WebSocket connection, chat messages appear live, notification bell updates, typing indicators, reconnection after network loss
7. **Mobile & Polish** — Responsive audit on every page, touch targets, form usability, toast consistency (pick one system — shadcn or sonner), breadcrumbs where needed, SEO meta tags audit, favicon/manifest
8. **Production Readiness** — Env var audit, security headers, error logging, build validation (`pnpm build` succeeds with zero warnings), Vercel deploy config, CORS for production domain, rate limiting tuning

Each phase prompt should be self-contained (Claude Code doesn't remember previous sessions). Include:
- "Read these files first: [list]"
- "Make these specific changes: [list with file paths]"
- "Verify by: [commands to run, things to check in browser]"

---

### guide/PROGRESS.md
A checkbox tracker. One checkbox per discrete task from FIX_PHASES.md:

```markdown
## The Builder Network — Completion Progress

### Phase 1: Critical Path Fixes
- [ ] Fix /tradespeople → /tradesperson links in QuestionPage.tsx, HomeownerJobDetailPage.tsx
- [ ] Fix /tradespeople → /tradesnetwork in HowItWorksPage.tsx
- [ ] Replace all "MyBuilder" in PrivacyPage.tsx with "The Builder Network"
- [ ] Remove "MyBuilder" comment in src/types/post-job.ts
- [ ] ... (every single fix as its own checkbox)

### Phase 2: UI Consistency Pass
- [ ] ... 

(etc.)
```

---

### guide/BACKEND_GAPS.md
Specific to backend issues that need code changes:

For each gap:
- **Module**: auth | users | jobs | leads | quotes | messaging | reviews | questions | payments | notifications | uploads | search | maintenance
- **File**: Exact path
- **Issue**: What's wrong or missing
- **Fix**: Exact code change needed (show the DTO class, the service method, the controller decorator)

Check:
1. Are ALL DTOs using class-validator decorators properly? (IsString, IsEmail, IsEnum, IsOptional, Min, Max, etc.)
2. Are ALL controller methods using proper guards? (@UseGuards(JwtAuthGuard), @Roles('TRADESPERSON'), etc.)
3. Are error messages user-friendly? (not exposing Prisma errors to clients)
4. Is the Prisma error handling consistent? (catching P2002 unique constraint, P2025 not found, etc.)
5. Are file uploads size-limited at the controller level? (@UseInterceptors(FileInterceptor) with limits?)
6. Is the geocoding service handling errors? (what happens if postcodes.io is down?)
7. Are WebSocket events authenticated? (chat gateway verifies JWT in handshake?)
8. Are there any race conditions? (two tradespeople expressing interest simultaneously — does the credit deduction use a transaction?)
9. Is the Stripe webhook verifying signatures before processing?
10. Are there any N+1 query patterns in Prisma? (findMany without proper includes?)

---

### guide/FRONTEND_BACKEND_CONTRACT.md
A mapping table that verifies every frontend API call matches the backend:

| Frontend File | API Call | HTTP Method | URL Path | Backend Controller | Backend Method | Match? | Notes |
|---|---|---|---|---|---|---|---|
| src/api/auth.ts | login() | POST | /auth/login | AuthController | login() | ✓/❌ | |
| src/api/auth.ts | register() | POST | /auth/register | AuthController | register() | ✓/❌ | |
| src/api/jobs.ts | createJob() | POST | /jobs | JobsController | create() | ✓/❌ | |
| ... | ... | ... | ... | ... | ... | ... | ... |

For every single API function in src/api/*.ts, verify:
1. The URL path (does the frontend client prepend /api/v1 or not?)
2. The HTTP method
3. The request body shape matches the backend DTO
4. The response shape matches what the frontend expects
5. Auth requirements match (does the frontend send the token? does the backend require it?)

Also check WebSocket events:
| Frontend Hook | Event Emitted | Event Listened | Backend Gateway | Handler | Match? |
|---|---|---|---|---|---|
| useChatSocket | join_conversation | new_message, typing | ChatGateway | handleJoinConversation, handleSendMessage, handleTyping | ✓/❌ |

---

## IMPORTANT INSTRUCTIONS

1. **Read EVERY file** — Do not skip any file. Open and read every .tsx, .ts, .service.ts, .controller.ts, .dto.ts, .gateway.ts, .module.ts, .guard.ts, .strategy.ts file. This is an audit, not a skim.

2. **Be specific** — Every finding must have exact file paths and line numbers. No vague "some pages have inconsistent padding" — say WHICH pages and WHAT their current classes are.

3. **Verify, don't assume** — If you're not sure whether something works, say "NEEDS VERIFICATION" and describe exactly what to check. Don't mark things as broken if you haven't confirmed they're broken.

4. **Brand consistency** — Flag EVERY instance of "MyBuilder", "Builder Network" (without "The"), "mybuilder.com", or any competitor brand name in the codebase.

5. **Mobile-first** — Note any page that will clearly break on mobile (e.g., grid-cols-8 without responsive breakpoints).

6. **No admin panel** — Admin module is intentionally empty. Don't flag it as missing.

7. **Session prompts must be self-contained** — Each prompt in FIX_PHASES.md must tell Claude Code exactly what to do without assuming context from previous sessions. Include file paths, current code snippets, and desired changes.

8. **Acceptance criteria must be testable** — "Looks good" is not an acceptance criterion. "Navigate to /homeowner/my-jobs while logged out → expect redirect to / within 1 second" is.

9. **Don't generate implementation code in the guide files** — The guide files describe WHAT to fix and WHERE. The actual code changes happen when the user runs the phase prompts in Claude Code sessions.

10. **Exception for BACKEND_GAPS.md** — Here you CAN show exact code snippets (DTO decorators, guard annotations, etc.) because these are small, targeted fixes.

Generate all 8 files now. Be exhaustive. This is the final push to take this platform from 75% to 100%.
```

---

## How to Use This

### Step 1: Generate the guide
1. Open a **new Claude Code session** (separate from your current work)
2. Copy the entire prompt above (everything inside the triple backticks)  
3. Paste it and let Claude run. It will read your entire codebase and generate the `guide/` folder
4. This will take a while — Claude needs to open 100+ files

### Step 2: Execute fix phases
1. Open `guide/FIX_PHASES.md`
2. Start with **Phase 1**
3. Open a **new Claude Code session**
4. Paste the Phase 1 session prompt from FIX_PHASES.md
5. Let Claude make the changes
6. Verify using the acceptance criteria listed
7. Check off completed items in `guide/PROGRESS.md`
8. Repeat for Phase 2, 3, ... 8

### Step 3: Verify flows
1. After all phases complete, open `guide/FLOW_TESTS.md`
2. Manually walk through each flow in your browser
3. Any failures → create a one-off Claude Code session describing the specific broken step

### Tips for Claude Code sessions
- **One phase per session** — Don't try to do everything in one session
- **Start each session with**: "Read guide/OVERVIEW.md and guide/FIX_PHASES.md Phase N. Then execute all the changes for Phase N."
- **If a session gets stuck**, paste the specific acceptance criteria that's failing and ask Claude to debug it
- **After each phase**, run `pnpm build` in TBN-Web and `pnpm build` in TBN-Server to catch TypeScript errors early
- **Keep both servers running** while testing: `pnpm dev` (frontend on 8080) and `pnpm start:dev` (backend on 3000)
- **For database issues**: Run `npx prisma studio` to inspect data directly

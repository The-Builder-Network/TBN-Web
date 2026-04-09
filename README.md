
## Plan: Deep Audit-and-Fix Reference Generator

**TL;DR**: Create a single mega-prompt that generates a new reference folder focused on systematically fixing the ~75%-built platform — covering broken endpoints, UI inconsistencies, missing integrations, and unprotected routes. Excludes admin panel. Includes Socket.IO frontend integration.

---

### Discovery Summary

The old reference files claim 10.5% completion (Phase 0 only). Reality is dramatically different — the codebase is ~75% built across both frontend and backend. The problem isn't that code doesn't exist; it's that it was generated across many disconnected sessions and has integration gaps, inconsistencies, and broken flows.

**Showstoppers found:**
- Jobs controller path is `@Controller('jobs')` instead of `@Controller('api/v1/jobs')` → **entire post-job flow returns 404**
- `ProtectedRoute` component exists in ProtectedRoute.tsx but is **never used** in App.tsx → unauthenticated users hit protected pages, see API errors
- No `socket.io-client` on frontend despite backend having WebSocket gateways
- No `@stripe/react-stripe-js` → payment/credit purchase flow has no UI

**UI issues found:**
- TradespersonMyLeadsPage.tsx renders a duplicate header with "THE BUILDER NETWORK" logo inside page content (global Header already provides this)
- Padding inconsistency: `px-16` vs `px-4` vs `px-6` vs missing across 6+ pages
- "MyBuilder" brand name still appears in StepCreateAccount.tsx, StepIDCheck.tsx, PrivacyPage.tsx
- HomeownerProfilePage.tsx is hardcoded skeleton (shows "fahad" user)
- HomeownerMyQuestionsPage.tsx has no data fetching
- Dead links to `/tradespeople` in Footer and CitiesPage
- 5 dead files in unused
- App.css has leftover Vite demo styles

**Backend gaps:** Quotes module empty (no endpoints), Search module empty, no `.env.example`, JWT_SECRET is placeholder, file uploads to memory only

---

### Steps

**Phase A: Generate Reference Files** (single session)
1. Clear the existing reference folder
2. Paste the mega-prompt into Claude Code
3. Claude reads the entire codebase, produces 6 new reference files:
   - `AUDIT.md` — categorized findings with exact file paths and line numbers
   - `FIX_PHASES.md` — 6 fix phases with per-session prompts and acceptance criteria
   - `UI_STANDARDS.md` — design system rules (padding, colors, brand name, page template)
   - `FLOW_TESTS.md` — manual E2E test scripts for every user journey
   - `MISSING_IMPLEMENTATIONS.md` — exact code specs for incomplete features
   - `FIX_PROGRESS.md` — checkbox tracker mapping to every fix task

**Phase B: Execute Fix Phases** (one session per phase)
1. **Critical Fixes** (~15 min) — Fix jobs controller path, wrap routes with ProtectedRoute, delete dead files/routes, fix dead links, change JWT_SECRET
2. **UI Consistency Pass** (~30 min) — Standardize padding/container classes across all pages, remove duplicate headers, fix brand name everywhere, delete App.css cruft
3. **Complete Missing Features** (~1-2 hrs) — Implement quotes controller+service+DTO+frontend API, search endpoints, HomeownerProfilePage real implementation, HomeownerMyQuestionsPage data fetching
4. **Frontend Integration** (~1-2 hrs) — Add `socket.io-client`, wire to backend gateways for messaging+notifications; add `@stripe/react-stripe-js`, build checkout redirect; wire cloud upload service
5. **E2E Flow Verification** (~1 hr) — Walk through every flow from FLOW_TESTS.md, fix any remaining broken connections
6. **Polish** (~30 min) — Error boundaries on all routes, loading/error/empty states audit, SEO meta tags, scroll behavior

---

### Relevant Files

**Frontend critical fixes:**
- App.tsx — wrap protected routes with ProtectedRoute, remove dead imports
- App.css — delete unused Vite styles
- TradespersonMyLeadsPage.tsx — remove duplicate header (lines ~33-45)
- HomeownerProfilePage.tsx — replace skeleton with real `useMyProfile()` hook
- HomeownerMyQuestionsPage.tsx — add data fetching
- StepCreateAccount.tsx — fix "MyBuilder" → "The Builder Network"
- StepIDCheck.tsx — fix "MyBuilder" references
- Footer.tsx — fix `/tradespeople` dead link
- quotes.ts — implement quotes API (currently empty stub)
- search.ts — implement search API (currently empty stub)

**Backend critical fixes:**
- jobs.controller.ts — change `@Controller('jobs')` → `@Controller('api/v1/jobs')`
- quotes — implement full CRUD
- search — implement search endpoints
- .env — rotate JWT_SECRET from placeholder

**New files to create:**
- `src/lib/socket.ts` — Socket.IO client connection manager
- `src/hooks/useSocket.ts` — React hook for socket events
- `TBN-Server/.env.example` — environment variable template

---

### Verification
1. `pnpm start:dev` in TBN-Server — no crash, `GET /api/v1/health` returns 200
2. `pnpm dev` in TBN-Web — zero console errors on every page
3. POST `/api/v1/jobs` returns 201 (not 404)
4. Navigate to `/homeowner/my-jobs` while logged out → redirects to home (not flash of page content)
5. Register tradesperson → auto-login → `/tradesperson/my-leads` loads with real data
6. No "MyBuilder" text visible anywhere on the site
7. All pages have consistent container width and horizontal padding
8. No duplicate site title/header inside any page content
9. Express interest → conversation created → messages appear in real-time via WebSocket
10. Credit purchase → Stripe checkout page opens

---

### Decisions
- **Excluded**: Admin panel (deferred to future work)
- **Included**: Socket.IO client integration (backend gateways already exist)
- **Brand**: "The Builder Network" consistently everywhere (not "MyBuilder", not "Builder Network")
- **Geo queries**: Keep Haversine in-memory (no PostGIS migration for now)
- **Polling**: Keep as fallback alongside WebSocket for graceful degradation
- **Output format**: Single mega-prompt generates all 6 reference files, then user executes phase prompts one session at a time

---

### Further Considerations
1. **Stripe webhook testing** — The backend has webhook endpoints but no `STRIPE_WEBHOOK_SECRET` configured. Recommend using Stripe CLI for local testing (`stripe listen --forward-to localhost:3000/api/v1/payments/webhook`). Include in Phase B4.
2. **Cloud storage** — R2 credentials aren't set up. The uploads service stores files in memory (lost on restart). This should be addressed in Phase B4 but requires the user to create an R2 bucket first. The prompt should note this as a prerequisite.

---

Shall I proceed to write the actual mega-prompt text you'll paste into Claude Code? 


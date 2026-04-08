# Builder Network — Master Context

## What Is This?
Builder Network (TBN) is a full production clone of **mybuilder.com** — a UK marketplace connecting homeowners with verified tradespeople for home improvement jobs (plumbing, roofing, extensions, etc.). Homeowners post jobs for free; tradespeople pay lead credits to express interest. Revenue = lead fees.

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + TypeScript + React Router v6 |
| UI | Tailwind CSS + shadcn/ui (Radix primitives) + Lucide icons |
| Client state | React Query v5 (server cache) + React Context (auth) + Zustand (multi-step forms) |
| Backend | NestJS + TypeScript + Passport JWT |
| ORM | Prisma (PostgreSQL) |
| DB | PostgreSQL (Neon) |
| File storage | Cloudflare R2 (S3-compatible) |
| Email | Resend |
| Payments | Stripe (credit pack checkout + webhooks) |
| Realtime | NestJS WebSocket gateway (Socket.IO) |
| Hosting | Vercel (frontend) + Railway/Render (backend) |

## Current Status
- **Frontend (TBN-Web/):** ~90% UI complete. Static marketing pages, post-job question funnel, homeowner/tradesperson dashboard shells, legal pages. ALL data is hardcoded — zero API calls except postcodes.io. Auth is localStorage-only.
- **Backend (TBN-Server/):** Empty. Only LICENSE file exists.

## Domain Vocabulary
| Term | Definition |
|---|---|
| **Homeowner** | User who posts jobs and hires tradespeople |
| **Tradesperson** | User who buys leads and quotes on jobs |
| **Job** | A homeowner's request for work (has service, postcode, description, attachments) |
| **Lead** | A job visible to a matched tradesperson (created by matching algorithm) |
| **Quote** | A tradesperson's response to a job with estimated cost + message |
| **Lead credit** | Virtual currency; tradespeople spend credits to express interest in a lead |
| **Express interest** | When a tradesperson pays credits to contact a homeowner about a job |
| **Question** | Community Q&A — homeowners ask, tradespeople answer |

## Repos
- `TBN-Web/` — Frontend (this repo root)
- `TBN-Server/` — Backend (subdir, separate git repo)

## Key Frontend Paths
```
src/App.tsx              — All routes
src/contexts/            — AuthContext (localStorage-based)
src/components/post-job/ — JobFunnel + QuestionRenderer (question tree engine)
src/components/register/ — 6 multi-step registration components
src/pages/protected/     — Homeowner + tradesperson dashboard pages
src/constants/           — Services (37), Trades (100+), Cities (180+)
src/data/post-job/       — 37 JSON question trees (one per service)
src/types/               — auth.ts, post-job.ts
```

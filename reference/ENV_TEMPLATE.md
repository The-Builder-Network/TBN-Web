# Builder Network — Environment Variables

> All environment variables needed for frontend and backend.
> Copy, fill in values, and save as `.env.local` (frontend) or `.env` (backend).

---

## Frontend (`/.env.local`)

```env
# ─── API ────────────────────────────────────────────────────
# Backend API base URL (no trailing slash)
VITE_API_URL=http://localhost:3000/api/v1

# ─── Stripe ─────────────────────────────────────────────────
# Stripe publishable key (starts with pk_test_ or pk_live_)
# Get from: https://dashboard.stripe.com/apikeys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ─── Google Maps ─────────────────────────────────────────────
# Google Maps JavaScript API key (for map components)
# Get from: https://console.cloud.google.com/apis/credentials
# Enable: Maps JavaScript API, Places API, Geocoding API
VITE_GOOGLE_MAPS_API_KEY=AIza...

# ─── Sentry (optional, Phase 9) ─────────────────────────────
# Sentry DSN for frontend error tracking
# Get from: https://sentry.io/settings/{org}/projects/{project}/keys/
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# ─── Feature Flags (optional) ───────────────────────────────
VITE_ENABLE_WEBSOCKETS=true
VITE_ENABLE_ANALYTICS=false
```

### Where to get each value

| Variable | Source | Notes |
|----------|--------|-------|
| `VITE_API_URL` | Your backend URL | `http://localhost:3000/api/v1` for local dev, production Railway URL when deployed |
| `VITE_STRIPE_PUBLISHABLE_KEY` | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) | Use **test** key for dev (starts with `pk_test_`) |
| `VITE_GOOGLE_MAPS_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) | Restrict to your domains in production |
| `VITE_SENTRY_DSN` | [Sentry → Project Settings → Client Keys](https://sentry.io) | Optional until Phase 9 |

---

## Backend (`/TBN-Server/.env`)

```env
# ─── Database ───────────────────────────────────────────────
# PostgreSQL connection string
# DB Url: postgresql://neondb_owner:npg_loc9pW7UNqvP@ep-solitary-mountain-a17hmmgt-pooler.ap-southeast-1.aws.neon.tech/tbn?sslmode=require&channel_binding=require

# Direct connection URL (Prisma migrations only, bypass pooler)
DIRECT_URL=postgresql://neondb_owner:npg_loc9pW7UNqvP@ep-solitary-mountain-a17hmmgt-pooler.ap-southeast-1.aws.neon.tech/tbn?sslmode=require&channel_binding=require

# ─── JWT ────────────────────────────────────────────────────
# Secret key for signing JWT tokens (min 32 chars, random)
# Generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=replace-with-64-char-random-hex-string
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# ─── App ────────────────────────────────────────────────────
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:8080

# ─── Stripe ─────────────────────────────────────────────────
# Stripe secret key (starts with sk_test_ or sk_live_)
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...

# Stripe webhook signing secret (starts with whsec_)
# Get from: https://dashboard.stripe.com/webhooks → select endpoint → Signing secret
# For local dev: stripe listen --forward-to localhost:3000/api/v1/payments/webhook
STRIPE_WEBHOOK_SECRET=whsec_...

# ─── Email (Resend) ─────────────────────────────────────────
# Resend API key
# Get from: https://resend.com/api-keys
RESEND_API_KEY=re_...

# "From" email address (must be from a verified domain on Resend)
EMAIL_FROM=noreply@thebuildernetwork.co.uk

# ─── File Storage (Cloudflare R2) ───────────────────────────
# R2 access credentials
# Get from: https://dash.cloudflare.com → R2 → Manage R2 API Tokens
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=tbn-uploads
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# S3-compatible endpoint (do not change unless on a different provider)
R2_ENDPOINT=https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com

# ─── Sentry (optional, Phase 9) ─────────────────────────────
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# ─── Rate Limiting (Phase 9) ────────────────────────────────
THROTTLE_TTL=60
THROTTLE_LIMIT=60
```

### Where to get each value

| Variable | Source | Notes |
|----------|--------|-------|
| `DATABASE_URL` | 'postgresql://neondb_owner:npg_loc9pW7UNqvP@ep-solitary-mountain-a17hmmgt-pooler.ap-southeast-1.aws.neon.tech/tbn?sslmode=require&channel_binding=require' | |
| `JWT_SECRET` | Self-generated | Run: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `STRIPE_SECRET_KEY` | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) | Use **test** key (starts `sk_test_`) |
| `STRIPE_WEBHOOK_SECRET` | [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks) | For local dev: `stripe listen --forward-to localhost:3000/api/v1/payments/webhook` prints the secret |
| `RESEND_API_KEY` | [Resend Dashboard → API Keys](https://resend.com/api-keys) | Free tier: 100 emails/day |
| `EMAIL_FROM` | Resend verified domain | Must verify your domain in Resend first, or use `onboarding@resend.dev` for testing |
| `R2_ACCOUNT_ID` | [Cloudflare Dashboard](https://dash.cloudflare.com) | Top right → Account ID |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Cloudflare R2 → Manage R2 API Tokens | Create a token with Object Read & Write permissions |
| `R2_BUCKET_NAME` | Cloudflare R2 → Create Bucket | Name it `tbn-uploads` or similar |
| `R2_PUBLIC_URL` | Cloudflare R2 → Bucket → Settings → Public access | Enable public access to get the URL |
| `SENTRY_DSN` | [Sentry → Project Settings](https://sentry.io) | Optional until Phase 9 |

---

## Quick Start Checklist

1. [ ] Copy `.env` template to `TBN-Server/.env` and fill in values
2. [ ] Copy `.env.local` template to `/.env.local` and fill in values
4. [ ] Run `npx prisma migrate dev` in `TBN-Server/`
5. [ ] Run `npx prisma db seed` in `TBN-Server/`
6. [ ] Start backend: `pnpm start:dev` in `TBN-Server/`
7. [ ] Start frontend: `pnpm dev` in root
8. [ ] Verify: frontend at `http://localhost:8080`, API at `http://localhost:3000/api/v1/health`

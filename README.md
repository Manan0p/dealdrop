# DealDrop: Smart Price Tracker

DealDrop tracks product prices across e-commerce sites, alerts users when prices drop, and visualizes price history. It is built with Next.js 16, Supabase auth, Firecrawl scraping, and Resend email alerts.

## Live Demo
- Production: https://dealdrop-one.vercel.app

## Highlights
- Supabase OAuth with server and browser clients, session-aware UI, and sign-out server actions
- Add product by URL, scrape name/price/image via Firecrawl, and persist in Supabase
- Price history table plus price-drop detection and email alerts through Resend
- Scheduled price checks via protected cron endpoint with bearer secret
- Responsive theming with Tailwind CSS v4, Radix primitives, and light/dark toggle
- Recharts-based price chart component for visualizing trends

## Tech Stack
- Next.js 16 (App Router, server components)
- React 19
- Tailwind CSS v4, Radix UI, lucide-react
- Supabase (auth, data, RLS), @supabase/ssr helpers
- Firecrawl for scraping dynamic product pages
- Resend for transactional email
- Recharts for charting

## Project Structure
- app/: layout, landing page, auth callback, server actions, cron API
- components/: UI kit (buttons, dialog, inputs, toasts), auth modal/button, theme provider, add-product form, product card, price chart
- lib/: firecrawl scraping helper, email sending helper, utils
- utils/supabase/: client/server/middleware helpers for Supabase sessions
- public/: static assets (logos, icons)

## Getting Started
1) Install dependencies

```bash
npm install
```

2) Add environment variables in `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

FIRECRAWL_API_KEY=...

RESEND_API_KEY=...
RESEND_FROM_EMAIL=alerts@yourdomain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

CRON_SECRET=some-strong-token
```

3) Run the dev server

```bash
npm run dev
```

4) Open http://localhost:3000

## Authentication
- Supabase OAuth configured for Google; redirect URL should include `/auth/callback` (local and production)
- Server-side session handling lives in utils/supabase/server.js and app/auth/callback/route.js

## Price Checks and Alerts
- Cron endpoint: POST /api/cron/check-prices with `Authorization: Bearer <CRON_SECRET>`
- Uses Supabase service role to fetch products, scrape current price via Firecrawl, update price_history, and email when prices drop
- Example trigger (PowerShell):

```powershell
curl.exe -X POST https://dealdrop-one.vercel.app/api/cron/check-prices -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Database Notes
- Tables: products, price_history
- On product add/update: price stored in products and optionally appended to price_history when changed
- Price charts render history via Recharts (see components/PriceChart.jsx)

## Scripts
- npm run dev - start development server
- npm run build - create production build
- npm run start - start production server
- npm run lint - run ESLint

## Deployment
- Deploy to Vercel; set all environment variables and OAuth redirect URLs to match the deployed domain
- Ensure `CRON_SECRET` is configured in the hosting scheduler (e.g., Vercel Cron) and passed as bearer token

## Roadmap Ideas
- Add per-user notification preferences (thresholds, frequency)
- Add product metadata validation and richer error toasts
- Surface scrape errors and retry logic in the UI

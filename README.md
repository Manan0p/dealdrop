## DealDrop – Smart Product Price Tracker

DealDrop is a Next.js 16 web app that lets users authenticate with Google (via Supabase) and submit product URLs to track price drops. The UI is built with Tailwind CSS v4, Radix primitives, and custom theming with light/dark toggle support.

## Features
- Google OAuth via Supabase with session persistence on server and client
- Product tracking form with optimistic UI states (submission wiring pending)
- Theme toggle with persisted preference (system-aware)
- Responsive landing layout with feature highlights and empty-state handling
- Toast infrastructure ready via Sonner and custom UI kit components

## Tech Stack
- Next.js 16 (App Router, server components)
- React 19
- Supabase (auth; server/browser clients)
- Tailwind CSS v4 with Radix UI primitives and lucide icons

## Project Structure
- app/: entry layout, landing page, auth callback handler, server actions
- components/: shared UI (buttons, dialog, inputs, toasts), auth modal/button, theme provider/toggle, add-product form
- utils/supabase/: client/server helpers and auth middleware
- lib/: styling/util helpers (e.g., `cn`)
- public/: static assets (e.g., logo)

## Prerequisites
- Node.js 18+ (Next 16 requirement)
- Supabase project with Google OAuth configured

## Environment Variables
Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
```

For Google OAuth in Supabase, set the redirect URL to:
- `http://localhost:3000/auth/callback` (development)
- Your production domain + `/auth/callback` in production

## Setup
1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

3) Open http://localhost:3000

## Available Scripts
- `npm run dev` – start development server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – run ESLint

## How Auth Works
- `app/auth/callback/route.js` exchanges the Supabase OAuth code for a session and redirects home.
- `utils/supabase/server.js` and `utils/supabase/client.js` expose helpers for server and browser contexts.
- `app/actions.js` provides a `signOut` server action that clears the session and revalidates `/`.

## Current Limitations / Next Steps
- The add-product submission handler is stubbed; connect it to scraping/ingestion + Supabase storage.
- No persistence or display of tracked products yet (`products` is currently an empty array).
- Add input validation and error toasts on the add-product flow.
- Consider background jobs or webhooks for price checks and alert delivery.

## Deployment
Deploy to Vercel or any Node-compatible host. Ensure environment variables are set and Google OAuth redirect URLs match the deployed domain.

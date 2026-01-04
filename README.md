# DealDrop: Smart Price Tracker

**DealDrop** is a modern price tracking app that lets you save product links from e-commerce sites, automatically checks prices on a schedule, stores price history, and emails you when a price drops.

## 🎯 About DealDrop

DealDrop combines a clean Next.js App Router UI with server actions + background cron checks to make price tracking effortless. Add a product URL, and DealDrop will scrape the latest price (even on dynamic pages), keep a history of changes, and notify you when it gets cheaper.

## ✨ Features

- **🔐 Secure Authentication** - Google OAuth via Supabase
- **🔗 Track Any Product URL** - Add products by pasting a link
- **⚡ Smart Scraping** - Extracts name, price, currency, and image using Firecrawl
- **📉 Price History** - Stores every price change in a dedicated history table
- **📊 Charts & Trends** - Visualize price movement with Recharts
- **📧 Price Drop Alerts** - Sends email alerts through Resend when prices go down
- **⏱️ Scheduled Checks** - Protected cron endpoint to update all tracked products
- **🌙 Dark Mode Support** - Theme toggle with persisted preference

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - App Router
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible primitives
- **ShadCN UI** - Component patterns (in `components/ui`)
- **Recharts** - Charts
- **Lucide React** - Icons

### Backend & Services
- **Supabase** - Authentication + database
- **@supabase/ssr** - Session-aware server/client helpers
- **Firecrawl** - Web scraping for dynamic pages
- **Resend** - Transactional email for alerts

### Deployment
- **Vercel** - Hosting + serverless routes

## 🚀 Live Demo

🔗 **DealDrop Live:** https://dealdrop-one.vercel.app/

## 💻 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)
- Supabase project (Google OAuth enabled)
- Firecrawl API key
- Resend API key + verified sender

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:3000 in your browser.

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Needed for cron job (bypasses RLS)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Scraping
FIRECRAWL_API_KEY=your_firecrawl_key

# Email alerts
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=your_verified_sender@domain.com

# Used in email footer links
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Protects the cron endpoint
CRON_SECRET=some_strong_random_token
```

### Supabase OAuth Redirect URLs

In Supabase Auth settings, add redirect URLs:
- `http://localhost:3000/auth/callback` (development)
- `https://dealdrop-one.vercel.app/auth/callback` (production)

## 🔑 Key Features Explained

### Add Product + Scrape
- Users paste a URL and DealDrop scrapes `productName`, `currentPrice`, `currencyCode`, and `productImageUrl` via Firecrawl
- The product gets stored/updated in the `products` table and price changes are appended to `price_history`

### Price History + Charts
- Every time a price changes, a new row is inserted into `price_history`
- The UI renders charts from that history to show trends over time

### Price Drop Email Alerts
- If the new price is lower than the previous price, DealDrop emails the user with savings + a link back to the product

### Scheduled Price Checks (Cron)

The cron endpoint is protected by a bearer secret:

- **Endpoint:** `POST /api/cron/check-prices`
- **Header:** `Authorization: Bearer <CRON_SECRET>`

Example (PowerShell):

```powershell
curl.exe -X POST https://dealdrop-one.vercel.app/api/cron/check-prices -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 🚢 Building for Production

```bash
npm run build
npm run start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Copyright © 2026 Manan**

## 👨‍💻 Author

Built by Manan.

## 🙏 Acknowledgments

- Supabase for auth + database
- Firecrawl for scraping product pages
- Resend for powering email alerts
- Vercel for hosting

---

**Ready to save money? Visit [DealDrop](https://dealdrop-one.vercel.app/) and start tracking.**

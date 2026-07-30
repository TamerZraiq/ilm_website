# Ilm Learning Center — Website

Public marketing site for Ilm Learning Center, a tutoring center in Palestine offering GCSE, A-Level, IB, and Tawjihi tutoring. Bilingual (English / Arabic with full RTL).

**Live:** https://ilm-website.vercel.app/en

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript strict) |
| Styling | Tailwind CSS 4 |
| i18n | next-intl — `en` and `ar` (RTL) |
| Hosting | Vercel |

That's the whole stack. There is no database, no auth, no server-rendered API routes, and no third-party service to configure — every page is pre-rendered to static HTML at build time and served from Vercel's CDN.

## Architecture

- **Fully static** — home, programs, about, contact. All copy lives in [`src/messages/en.json`](src/messages/en.json) / [`ar.json`](src/messages/ar.json). Changing any text, price, or program detail means editing that file and redeploying — there is no admin login or CMS.
- **Contact is WhatsApp-first** — the contact page links straight to WhatsApp (`src/lib/site.ts`) plus a plain email address and hours. There is no contact form and nothing is emailed server-side.
- **Security headers + CSP** in `next.config.ts` (no `unsafe-eval` in production, no external image origins allowed).

## Local development

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev
```

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run type-check` | TypeScript, no emit |
| `npm run test` | Vitest suite |
| `npm run lint` | ESLint |

## Environment variables

Only one, ever: `NEXT_PUBLIC_SITE_URL` — the production domain, used for the sitemap, robots.txt, canonical URLs, and Open Graph tags. Must be set in Vercel → Project → Environment Variables for production; without it, the sitemap and OG tags fall back to `http://localhost:3000`.

## Editing content

Everything a visitor sees comes from two files: [`src/messages/en.json`](src/messages/en.json) and [`src/messages/ar.json`](src/messages/ar.json). Keep both in sync — every key that exists in one must exist in the other. After editing, commit and push; Vercel redeploys automatically.

To change the WhatsApp number, edit `WHATSAPP_NUMBER` in [`src/lib/site.ts`](src/lib/site.ts).

## Deployment (Vercel)

1. Import the repository into Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Push to `main` — Vercel builds and deploys automatically.

## Monitoring

See [docs/MONITORING.md](docs/MONITORING.md) for uptime and error tracking setup.

# Ilm Learning Center — Website

Public marketing site and admin CMS for Ilm Learning Center, a tutoring center in Palestine offering GCSE, A-Level, IB, and Tawjihi tutoring. Bilingual (English / Arabic with full RTL), with inline content editing for administrators.

**Live:** https://ilm-website.vercel.app/en

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript strict) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database & Auth | Supabase (Postgres, RLS, Supabase Auth) |
| i18n | next-intl — `en` and `ar` (RTL) |
| Email | Resend (contact form delivery) |
| Rate limiting | Upstash Redis |
| Hosting | Vercel |

## Architecture overview

- **Public site** — home, programs, about, contact. Server-rendered; public data (site content, programs, plans, teachers) is served from Next's data cache via a cookie-less Supabase anon client, so anonymous page views make no per-request database calls.
- **Inline CMS** — admins log in at `/{locale}/admin/login` and edit content directly on the pages (text blocks, pricing plans, programs, teachers). Admin reads bypass the cache so editors always see fresh data; saves revalidate the public cache tags.
- **Auth** — Supabase Auth with a `profiles.role` column. Roles are embedded in the JWT via a custom access token hook; server code verifies with `supabase.auth.getUser()` (never the unvalidated session). Session refresh happens in `src/proxy.ts`.
- **Security** — RLS on every table with admin-only writes, Zod validation in every server action and API route, rate-limited contact endpoint, security headers + CSP in `next.config.ts` (no `unsafe-eval` in production).

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
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

See [.env.example](.env.example). All are required in production except `CONTACT_FROM` (falls back to Resend's sandbox sender, which only delivers to the Resend account owner — set it before going live).

## Database setup

Run the SQL files in `supabase/migrations/` **in numeric order** in the Supabase SQL Editor (or `supabase db push`).

**Manual step — required:** after running `003_jwt_hook.sql`, go to
*Supabase Dashboard → Authentication → Hooks → Customize Access Token* and select `custom_access_token_hook`. Without this, admin roles are read from the database on every check instead of the JWT (it still works, just slower).

### Creating an admin

New signups default to the `student` role. To promote an account:

```sql
UPDATE public.profiles SET role = 'admin' WHERE id = '<user-uuid>';
```

The user must sign out and back in for the JWT to pick up the role.

## Deployment (Vercel)

1. Import the repository into Vercel.
2. Set all environment variables from `.env.example`.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain (drives sitemap + metadata).
4. Verify the sending domain in Resend and set `CONTACT_FROM`.

## Known notes

- `npm audit` reports a moderate advisory in PostCSS bundled inside Next.js itself. It is build-time only (not exploitable at runtime) and no stable Next.js release includes the fix yet; clear it by upgrading Next when 16.3 stable ships.
- Student/parent/teacher portals are intentionally out of scope; the auth layer and role model are ready for them.

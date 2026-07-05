@AGENTS.md

# Ilm Learning Center — Project Rules

Public marketing site + inline admin CMS for a real tutoring center in Palestine (GCSE, A-Level, IB, Tawjihi). Bilingual EN/AR with RTL. Quality and correctness over speed.

## Stack (do not deviate)

Next.js 16 App Router, TypeScript strict, Tailwind 4 + shadcn/ui, Supabase (auth/DB), next-intl, Upstash rate limiting, Zod everywhere, Resend, Vercel.

## Security rules (non-negotiable)

1. Never call Supabase from a Client Component — Server Actions and Route Handlers only.
2. Server-side auth checks use `supabase.auth.getUser()`, never `getSession()`.
3. Every table has RLS with explicit USING and WITH CHECK. Table grants are limited to SELECT/INSERT/UPDATE/DELETE (no TRUNCATE — see migration 010).
4. Roles live in `public.profiles.role`, embedded in the JWT via `custom_access_token_hook`. Never trust a role from the client.
5. Every Server Action calls `requireAdmin()` (or validates auth) before any logic, then validates input with Zod.
6. No secrets in code. `.env.local` is gitignored; `.env.example` has placeholders only.
7. Public mutation endpoints are rate limited (contact form: 5/hour/IP).
8. Security headers + CSP live in `next.config.ts`. Production CSP must not include `unsafe-eval`.
9. Generic error messages to the client; log real errors server-side.

## Data & caching

- Public reads (site content, plans, programs, teachers) go through the cached anon-client helpers in `src/lib/content/` (`unstable_cache` + tags).
- Admin reads fetch fresh with the cookie server client so editors see unpublished rows.
- Mutations revalidate the matching tag (`site-content`, `plans`, `programs`, `teachers`) plus the affected path.
- Schema changes are numbered SQL files in `supabase/migrations/`, RLS defined with the table.

## Code style

- No `any`, no type-assertion escape hatches.
- Server Components by default; `"use client"` only when required.
- No `console.log` in production code. No comments unless logic is non-obvious.
- All user-facing strings come from `src/messages/{en,ar}.json` — never hardcode UI text, and keep both files in sync.
- Icons: Lucide only. No emoji in UI. No fake stats or placeholder counters.

## Brand

Navy `#1A2B6B`, gold `#C9A84C`. EN: Plus Jakarta Sans, AR: Cairo. Premium through restraint — no extra accent colors, gradients, or ornamentation.

## Out of scope

Student/parent/teacher dashboards, payments, booking, blog, OAuth. The role model supports them later; do not build them unprompted.

@AGENTS.md

# Ilm Learning Center — Project Rules

Public marketing site for a real tutoring center in Palestine (GCSE, A-Level, IB, Tawjihi, SAT, IELTS, AP, CLEP, and school curriculum support). Bilingual EN/AR with RTL. Quality and correctness over speed.

## Stack (do not deviate)

Next.js 16 App Router, TypeScript strict, Tailwind 4, next-intl, Vercel. That's it — no database, no auth, no backend service, no forms.

## Architecture rules (non-negotiable)

1. The site is fully static. Do not reintroduce a database, auth, a CMS, or a server-side form handler unless the user explicitly asks for it.
2. All user-facing copy — including prices, program details, and contact info — lives in `src/messages/en.json` and `ar.json`. Never hardcode UI text in components, and keep both files in sync key-for-key.
3. Contact is WhatsApp-first (`src/lib/site.ts` → `whatsappUrl()`). There is no contact form and nothing is emailed server-side.
4. No secrets in code. The only environment variable this project uses is `NEXT_PUBLIC_SITE_URL`.
5. Security headers + CSP live in `next.config.ts`. Production CSP must not include `unsafe-eval`, and `img-src`/`images.remotePatterns` should not allow external origins unless a real remote image source is added.
6. Generic error messages to the client; log real errors server-side only.

## Code style

- No `any`, no type-assertion escape hatches.
- Server Components by default; `"use client"` only when required.
- No `console.log` in production code. No comments unless logic is non-obvious.
- Icons: Lucide only. No emoji in UI. No fake stats, fake testimonials, or placeholder counters — if data doesn't exist yet, omit the section rather than inventing content.

## Brand

Navy `#1A2B6B`, gold `#C9A84C`. EN: Plus Jakarta Sans, AR: Tajawal. Premium through restraint — no third accent colour, no gradient text, no ornamentation for its own sake.

**`DESIGN.md` is the design contract, not a description.** Read it before touching any layout, type, colour, or motion. Its §10 "definition of done" is the checklist a section has to pass. The rules that get broken most often:

- No two sections share a layout (§2) or a spacing rhythm.
- Muted text bottoms out at `navy/70`; `text-gold` is **never** used for text on a light ground — that's `gold-ink` (§4).
- Use the `t-*` type classes and `section*` rhythm classes rather than ad-hoc Tailwind sizes, so RTL overrides and the fluid scale apply automatically.
- Entrance motion is not the default answer; prefer `Stagger`/`StaggerItem` over hand-passed delays (§6).
- Hover-lift only on things that are genuinely clickable.

## Out of scope

Student/parent/teacher portals, payments, booking, blog, admin CMS, contact forms, OAuth. Do not build any of these unprompted — this is deliberately a static brochure site.

@AGENTS.md
Infrastructure planning
Good. I've thought through this carefully. Here's everything you need: a CLAUDE.md to drop into your project root, and the exact prompt to send Claude Code. Do these in order.

Before you touch VS Code
Set up these accounts first — you'll need the keys for the env vars:

Supabase — create a new project at supabase.com. Note the Project URL and anon key.
Upstash — create a Redis database at upstash.com (free tier is fine). Note the REST URL and token.
Resend — create an account at resend.com. Get an API key. Add your domain later for production.
Create your project folder — empty folder, open it in VS Code.
Run this in the terminal to initialize:
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
Step 1 — Create CLAUDE.md in the project root
This is what Claude Code reads automatically. Copy this exactly:

# Ilm Learning Center — Project Bible

## What this is
A professional website + auth platform for Ilm Learning Center, a tutoring center in Palestine
offering GCSE, A-Level, IB, and Tawjihi tutoring. This is a real client project.
Quality and correctness take priority over speed.

## Tech Stack (hard requirements — do not deviate)
- Framework: Next.js 14 App Router, TypeScript strict mode
- Styling: Tailwind CSS + shadcn/ui
- Auth + Database + Storage: Supabase
- i18n: next-intl (English primary, Arabic with RTL secondary)
- Rate limiting: Upstash Redis + @upstash/ratelimit
- Validation: Zod — everywhere, no exceptions
- Email: Resend
- Deployment: Vercel

## Non-Negotiable Security Rules
1. **Never call Supabase from a Client Component.** All data access goes through
   Server Actions or Route Handlers only.
2. **Always use `supabase.auth.getUser()` for server-side auth checks**, never
   `supabase.auth.getSession()`. getSession() reads the cookie without server
   validation and can be spoofed. getUser() validates with Supabase's servers.
3. **Every table must have RLS enabled** with explicit USING and WITH CHECK clauses.
   Never `USING (true)`. No table is readable without a deliberate policy.
4. **User roles live in `public.profiles.role` only.** They are embedded in the JWT
   via `custom_access_token_hook`. Never trust a role from the client or request body.
5. **Every Server Action verifies the session first**, before any logic or DB call.
6. **No secrets in code.** All keys in `.env.local` (gitignored).
   `.env.example` has placeholder values only.
7. **Rate limit all public mutation endpoints.** Contact form = 5 req/hour/IP.
8. **Security headers set in `next.config.ts`** via the `headers()` function.
9. **Generic error messages to the client only.** Log real errors server-side.
   Never expose stack traces, DB errors, or internal paths to the browser.
10. **Every Route Handler and Server Action validates with Zod** before processing.

## Database Rules
- Profiles table: `id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY`
- All other tables: `id UUID DEFAULT gen_random_uuid() PRIMARY KEY`
- All tables: `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`,
  `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
- All tables: RLS enabled, policies defined immediately after table creation
- All schema changes: numbered SQL migration files in `supabase/migrations/`
- Never alter the `auth` schema directly

## Code Style
- TypeScript strict mode — no `any`, no `as any`, no type assertions to bypass errors
- Server Components by default — add `'use client'` only when genuinely required
- Path alias: `@/` maps to `src/`
- No `console.log` in production code
- No inline styles — Tailwind classes only
- No comments unless the logic is non-obvious

## Folder Structure
src/
├── app/
│ ├── [locale]/
│ │ ├── layout.tsx
│ │ ├── page.tsx # Home
│ │ ├── programs/page.tsx
│ │ ├── about/page.tsx
│ │ ├── contact/page.tsx
│ │ ├── auth/
│ │ │ ├── login/page.tsx
│ │ │ ├── signup/page.tsx
│ │ │ └── callback/route.ts
│ │ ├── dashboard/page.tsx # Student — placeholder only
│ │ ├── parent/page.tsx # Parent — placeholder only
│ │ ├── teacher/page.tsx # Teacher — placeholder only
│ │ └── admin/page.tsx # Admin — placeholder only
│ └── api/
│ └── contact/route.ts
├── components/
│ ├── ui/ # shadcn/ui — never edit these files
│ ├── layout/
│ │ ├── navbar.tsx
│ │ └── footer.tsx
│ └── sections/ # Page-level sections (hero, programs strip, etc.)
├── lib/
│ ├── supabase/
│ │ ├── client.ts # Browser client (Client Components only)
│ │ ├── server.ts # Server client (Server Components, Actions)
│ │ └── middleware.ts # Middleware-specific client
│ └── auth/
│ └── roles.ts # Role type, getSession(), requireRole()
├── types/
│ └── database.types.ts # Supabase schema types
├── i18n/
│ ├── routing.ts
│ └── request.ts
├── messages/
│ ├── en.json
│ └── ar.json
└── middleware.ts
supabase/
├── migrations/
│ ├── 001_profiles.sql
│ ├── 002_rls_policies.sql
│ └── 003_jwt_hook.sql
└── config.toml

## User Roles
```typescript
type Role = 'admin' | 'teacher' | 'student' | 'parent'
Stored in public.profiles.role, default 'student' on signup
Embedded into JWT app_metadata.user_role via Supabase custom_access_token_hook
Read server-side as user.app_metadata?.user_role
Protected routes:
/[locale]/dashboard → any authenticated user
/[locale]/parent → role: parent or admin
/[locale]/teacher → role: teacher or admin
/[locale]/admin → role: admin only
Brand (applies to all frontend work)
Navy: #1A2B6B
Gold: #C9A84C
White: #FFFFFF
Gradient accent: pink → orange → gold (used sparingly, from logo)
EN font: Plus Jakarta Sans (from Google Fonts via next/font)
AR font: Cairo (from Google Fonts via next/font)
Icons: Lucide only — no emoji in UI
No placeholder stat cards with zero/fake numbers
What is NOT in scope for this build
Any dashboard/portal UI — scaffold the routes with placeholder content only
Admin CMS panel
Stripe or payments
Booking system
Blog
OAuth (prepare the button, leave it disabled with a "coming soon" note)
---
## Step 2 — Send this as your opening message to Claude Code
Read CLAUDE.md before doing anything else. Build the complete infrastructure,
backend, auth system, and public-facing website for Ilm Learning Center.
The tech stack, security rules, and folder structure are defined in CLAUDE.md — follow them exactly.

Build in this exact order. Complete each step fully before moving to the next.

────────────────────────────────────────────
STEP 1 — DEPENDENCIES
────────────────────────────────────────────
Install:
npm install @supabase/supabase-js @supabase/ssr
npm install next-intl
npm install @upstash/redis @upstash/ratelimit
npm install zod react-hook-form @hookform/resolvers
npm install resend
npm install lucide-react
npm install clsx tailwind-merge
npx shadcn@latest init --defaults
npx shadcn@latest add button input label textarea card form toast badge
separator navigation-menu sheet dropdown-menu avatar

────────────────────────────────────────────
STEP 2 — TYPESCRIPT CONFIG
────────────────────────────────────────────
Update tsconfig.json:

"strict": true
"noUncheckedIndexedAccess": true
"noImplicitReturns": true
Path alias "@/": ["./src/"] already set by create-next-app
────────────────────────────────────────────
STEP 3 — next.config.ts
────────────────────────────────────────────
Configure with:

next-intl plugin wrapping the entire config
Security headers on all routes:
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy:
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://.supabase.co;
font-src 'self' data:;
connect-src 'self' https://.supabase.co wss://*.supabase.co;
frame-ancestors 'none';
images.remotePatterns: allow *.supabase.co
────────────────────────────────────────────
STEP 4 — TAILWIND CONFIG
────────────────────────────────────────────
Extend theme:
colors:
navy: { DEFAULT: '#1A2B6B', light: '#243580', dark: '#111e4a' }
gold: { DEFAULT: '#C9A84C', light: '#d4b76a', dark: '#a8882e' }
fontFamily:
sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif']
arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif']
darkMode: 'class'

────────────────────────────────────────────
STEP 5 — i18n (next-intl)
────────────────────────────────────────────

src/i18n/routing.ts:
locales = ['en', 'ar'] as const
defaultLocale = 'en'
Export a routing object using defineRouting from next-intl/routing.

src/i18n/request.ts:
Use getRequestConfig to load messages by locale from src/messages/.
Add notFound() if locale is not in the allowed list.

src/messages/en.json — include keys for:

nav: home, programs, about, contact, login, signup, logout, language
hero: headline, subheadline, cta_primary, cta_secondary
programs: title, gcse, alevel, ib, tawjihi, and descriptions for each
about: title, mission, team
contact: title, name, email, subject, message, submit, success, error
auth: login_title, signup_title, email, password, confirm_password,
full_name, submit, no_account, have_account, verify_email_notice
subjects for each program (list the real GCSE, A-Level, IB, and
Tawjihi subjects — look these up if unsure)
src/messages/ar.json — accurate Arabic translations of all the same keys.
Mark RTL: add a top-level "dir": "rtl" key for use in layout.

────────────────────────────────────────────
STEP 6 — ENVIRONMENT FILES
────────────────────────────────────────────

.env.example (committed):
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=info@ilmlearningcenter.com

Verify .env.local is in .gitignore. Add it if not.

────────────────────────────────────────────
STEP 7 — SUPABASE CLIENT UTILITIES
────────────────────────────────────────────

src/lib/supabase/client.ts
Export createClient() using createBrowserClient from @supabase/ssr.
Typed with Database from @/types/database.types.

src/lib/supabase/server.ts
Export async createClient() using createServerClient from @supabase/ssr.
Reads and writes cookies via await cookies() from next/headers.
This is the client for Server Components, Server Actions, Route Handlers.

src/lib/supabase/middleware.ts
Export createClient(request: NextRequest, response: NextResponse).
Used only in middleware. Reads from request.cookies, writes to response.cookies.

────────────────────────────────────────────
STEP 8 — DATABASE MIGRATIONS
────────────────────────────────────────────

supabase/migrations/001_profiles.sql:

CREATE TABLE public.profiles (
id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
role TEXT NOT NULL DEFAULT 'student'
CONSTRAINT profiles_role_check
CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
full_name TEXT,
full_name_ar TEXT,
avatar_url TEXT,
phone TEXT,
language_preference TEXT NOT NULL DEFAULT 'en'
CONSTRAINT profiles_language_check
CHECK (language_preference IN ('en', 'ar')),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
NEW.updated_at = NOW();
RETURN NEW;
END;
$$;

CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create a profile row when a new user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
INSERT INTO public.profiles (id, full_name, role)
VALUES (
NEW.id,
COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
'student'
);
RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

supabase/migrations/002_rls_policies.sql:

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Each user can read their own profile
CREATE POLICY "profiles_select_own"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles_select_admin"
ON public.profiles FOR SELECT TO authenticated
USING (
EXISTS (
SELECT 1 FROM public.profiles p
WHERE p.id = auth.uid() AND p.role = 'admin'
)
);

-- Users can update their own profile but cannot change their role
CREATE POLICY "profiles_update_own"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (
auth.uid() = id
AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
);

-- Admins can update any profile, including role assignment
CREATE POLICY "profiles_update_admin"
ON public.profiles FOR UPDATE TO authenticated
USING (
EXISTS (
SELECT 1 FROM public.profiles p
WHERE p.id = auth.uid() AND p.role = 'admin'
)
);

-- The auto-trigger inserts the profile; users cannot insert directly
-- but we need this policy so the trigger (running as authenticated) can work
CREATE POLICY "profiles_insert_trigger"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

supabase/migrations/003_jwt_hook.sql:

-- Embeds the user's role into every JWT so we can read it server-side
-- without a DB round-trip on every request.
-- IMPORTANT: After running this migration, go to Supabase Dashboard →
-- Authentication → Hooks → Customize Access Token and select this function.
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event JSONB)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
claims JSONB;
user_role TEXT;
BEGIN
SELECT role INTO user_role
FROM public.profiles
WHERE id = (event->>'userId')::UUID;

claims := event->'claims';
IF user_role IS NOT NULL THEN
  claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
END IF;
event := jsonb_set(event, '{claims}', claims);
RETURN event;
END;
$$;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook
FROM authenticated, anon, public;
GRANT SELECT ON TABLE public.profiles TO supabase_auth_admin;

────────────────────────────────────────────
STEP 9 — TYPESCRIPT TYPES
────────────────────────────────────────────

src/types/database.types.ts:
Write the full Database interface reflecting the profiles schema above.
Export these standalone types at the top:
export type Json = string | number | boolean | null | ...
export type Role = 'admin' | 'teacher' | 'student' | 'parent'
export type Language = 'en' | 'ar'

The Database type must have the correct Row, Insert, Update shapes
for the profiles table matching the migration exactly.

────────────────────────────────────────────
STEP 10 — AUTH ROLE UTILITIES
────────────────────────────────────────────

src/lib/auth/roles.ts:

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Role } from '@/types/database.types'
export type { Role }

getSession() — calls supabase.auth.getUser() (NOT getSession()),
returns the User object or null. This validates the JWT server-side.

getUserRole() — calls getSession(), returns user.app_metadata?.user_role
cast to Role, or null.

requireAuth(locale = 'en') — calls getSession(), redirects to
/[locale]/auth/login if no session. Returns user.

requireRole(role: Role, locale = 'en') — calls requireAuth(), then checks
the role. If wrong role, redirects to /[locale]. Returns user.

────────────────────────────────────────────
STEP 11 — MIDDLEWARE
────────────────────────────────────────────

src/middleware.ts must do all three things in order:

Run next-intl's createMiddleware(routing) to handle locale routing
Refresh the Supabase auth session (token rotation — required on every request)
Enforce route protection based on role from JWT
Exact logic:

Strip locale prefix from pathname to get clean path
Protected route map:
/dashboard → any authenticated user
/parent → role 'parent' or 'admin'
/teacher → role 'teacher' or 'admin'
/admin → role 'admin'
If route is protected and user is null:
redirect to /{locale}/auth/login?redirectTo={original pathname}
If route is protected and user has wrong role:
redirect to /{locale}
Matcher: exclude _next/static, _next/image, favicon.ico, and /api/ routes.
DO NOT exclude /api/contact — it is public-facing and needs i18n headers.
Actually: exclude all /api/ routes from i18n, but NOT from auth refresh.
Handle this cleanly — don't break either system.

────────────────────────────────────────────
STEP 12 — ROOT APP LAYOUT
────────────────────────────────────────────

src/app/[locale]/layout.tsx:

Load Plus Jakarta Sans and Cairo from next/font/google
Read the locale param
Set lang={locale} and dir={locale === 'ar' ? 'rtl' : 'ltr'} on <html>
Apply the correct font CSS variable based on locale
Wrap children in NextIntlClientProvider with messages
Include <Navbar /> and <Footer /> around {children}
Include a <Toaster /> from shadcn/ui for toast notifications
────────────────────────────────────────────
STEP 13 — NAVBAR AND FOOTER
────────────────────────────────────────────

src/components/layout/navbar.tsx (Server Component):

Logo: BookOpen icon (Lucide) + "Ilm Learning Center" text
Nav links: Home, Programs, About, Contact (translated)
Language switcher: clicking EN/AR replaces the locale in the current URL
using next-intl's Link or navigation utilities
Auth state: fetch session server-side. If logged in: show user name
(first name only) + a dropdown with "Dashboard" and "Sign Out".
If logged out: "Login" link + "Sign Up" button in gold.
Mobile: use shadcn/ui Sheet for the mobile drawer menu
Sticky top-0, z-50
Background: navy (#1A2B6B) with subtle bottom border in gold at low opacity
Sign Out: must be a form action (POST) calling supabase.auth.signOut()
server-side, then redirect to home
src/components/layout/footer.tsx:

Logo + tagline: "Empowering students across Palestine"
Four column layout: Programs, Quick Links, Contact, Follow Us
Programs column: GCSE, A-Level, IB, Tawjihi
Quick Links: Home, About, Contact
Contact: placeholder email + phone
Social: 3 icon placeholders (Instagram, Facebook, WhatsApp) using Lucide icons
Dark navy background, gold accents for headings
Copyright line at bottom
────────────────────────────────────────────
STEP 14 — PUBLIC PAGES
────────────────────────────────────────────

HOME PAGE (src/app/[locale]/page.tsx) — Server Component.

Section 1 — Hero:
Full-width. Navy background with a very subtle geometric pattern or
gradient overlay. Gold accent line or element.
Headline: "Unlock Your Full Academic Potential"
Sub: "Expert tutoring for GCSE, A-Level, IB, and Tawjihi students.
Personalised. Proven. Palestinian."
Two CTAs: "Explore Programs" (gold button) + "Contact Us" (outline button)
No fake stats. No counters. Just the headline and CTAs.

Section 2 — Programs Strip:
Four cards in a responsive grid (2 cols mobile, 4 cols desktop).
GCSE | A-Level | IB | Tawjihi
Each card: icon (use Lucide GraduationCap or BookOpen variants),
program name in bold, 1-line description, a subtle "→" link to /programs.
Navy card background, gold accent on hover.

Section 3 — Why Ilm:
Three columns. Real reasons, not marketing fluff:
"Experienced Tutors" — teachers with subject expertise, not generalists
"Palestinian Curriculum" — the only center covering Tawjihi alongside
international qualifications
"Tailored to Each Student" — sessions built around the individual student's gaps

Section 4 — Testimonials:
2 placeholder cards. Mark them clearly with a comment: // TODO: replace with real testimonials
Use realistic-looking placeholder names and quotes about subject improvement.

Section 5 — CTA Banner:
"Ready to start?" with a single "Get in Touch" button.
Gold background, navy text — reverse of the hero.

PROGRAMS PAGE (src/app/[locale]/programs/page.tsx) — Server Component.

Four sections, one per qualification:

GCSE: Maths, Further Maths, Physics, Chemistry, Biology, Computer Science,
English Language, English Literature, Arabic, History, Geography, Economics

A-Level: Maths, Further Maths, Physics, Chemistry, Biology, Computer Science,
Economics, Business Studies, Psychology, English Literature, Arabic

IB (HL/SL): Maths Analysis, Maths Applications, Physics, Chemistry, Biology,
Computer Science, Economics, Business Management, Psychology,
English A, English B, Arabic B, History, Geography, Visual Arts

Tawjihi: All standard Palestinian Tawjihi subjects — include the correct
subject names in both English and Arabic. Look these up accurately.

Layout: each program gets a full-width section with a heading in gold,
a brief paragraph about what they offer, and a grid of subject chips/badges.

Use shadcn Badge components for subject chips. Navy background sections
alternating with white/light sections for visual rhythm.

ABOUT PAGE (src/app/[locale]/about/page.tsx) — Server Component.

Section 1 — Our Story:
A paragraph about Ilm Learning Center's founding and mission.
Placeholder text that feels real — "Founded in [city], Palestine,
Ilm Learning Center was built on the belief that every student
deserves access to expert, personalised academic support..."
Mark with // TODO: replace with client's real story

Section 2 — Our Values:
Three values in a card grid:
Excellence | Personalisation | Community

Section 3 — Meet the Team:
4 placeholder tutor cards. Each card:
- Avatar (use a placeholder div with initials, no external image)
- Name: "Dr. [Name]" or "Mr./Ms. [Name]"
- Subject specialty
- 1-line bio
Mark with // TODO: replace with real team data and photos

NOTE: structure this so when real data is available, you can swap in a
data array at the top of the file. Do not hardcode into JSX — map over
a `const TEAM = [...]` array.
CONTACT PAGE (src/app/[locale]/contact/page.tsx):

Two-column layout on desktop (form left, info right). Single column mobile.

LEFT — Contact Form (Client Component — needs react-hook-form):
Fields:
- Full Name (required)
- Email (required, validated)
- Subject of Interest (dropdown: GCSE / A-Level / IB / Tawjihi / General Inquiry)
- Message (required, min 20 chars, textarea)
Submit button: "Send Message"
State: idle → loading → success | error
On success: show "Thank you, we'll be in touch within 24 hours" inline
On error: show "Something went wrong. Please try again." — no raw errors

RIGHT — Contact Info:
WhatsApp CTA: A green-tinted button with WhatsApp icon (Lucide) and
"Chat on WhatsApp" — href="#" placeholder, note: // TODO: add WhatsApp number
Email address: placeholder
Location: Palestine (city TBD — mark as // TODO)
Hours: "Saturday – Thursday: 9am – 9pm"

────────────────────────────────────────────
STEP 15 — AUTH PAGES
────────────────────────────────────────────

src/app/[locale]/auth/login/page.tsx:

Email + password fields, react-hook-form + Zod
Zod schema: email().min(1), password min 8 chars
Submit calls a Server Action that calls supabase.auth.signInWithPassword()
On success: redirect to the redirectTo query param, or /{locale}/dashboard
On error: map Supabase error codes to user-friendly messages:
"Invalid login credentials" → "Incorrect email or password"
"Email not confirmed" → "Please verify your email before logging in"
Anything else → "Sign in failed. Please try again."
"Forgot password?" link (placeholder, href="#", // TODO)
"Don't have an account? Sign up" link
"Sign in with Google" button — render it but show it as disabled/coming soon
Fully translated
src/app/[locale]/auth/signup/page.tsx:

Full name, email, password, confirm password
Zod: password min 8 chars, confirm must match
No role selector — everyone signs up as student
Server Action calls supabase.auth.signUp() with full_name in user_metadata
On success: show "Check your email to confirm your account" — do not redirect
to dashboard yet (user must verify email first by default)
On error: map errors the same way as login
"Already have an account? Log in" link
src/app/[locale]/auth/callback/route.ts:

Handle the email confirmation and OAuth callback
Exchange code for session using supabase.auth.exchangeCodeForSession(code)
On success: redirect to /{locale}/dashboard
On error: redirect to /{locale}/auth/login?error=auth_callback_error
────────────────────────────────────────────
STEP 16 — PROTECTED PLACEHOLDER PAGES
────────────────────────────────────────────

These are placeholder shells. They must enforce auth — the UI is minimal.
Each page calls the appropriate require function and shows a simple message.

dashboard/page.tsx → requireAuth() → "Student Dashboard — Coming Soon"
parent/page.tsx → requireRole('parent') → "Parent Portal — Coming Soon"
teacher/page.tsx → requireRole('teacher') → "Teacher Portal — Coming Soon"
admin/page.tsx → requireRole('admin') → "Admin Panel — Coming Soon"

Each page also shows: the logged-in user's email, their role, and a
"Sign Out" button (form action). Clean, minimal — this is a placeholder.

────────────────────────────────────────────
STEP 17 — CONTACT API ROUTE
────────────────────────────────────────────

src/app/api/contact/route.ts:

Rate limiting:
Use Upstash Ratelimit with slidingWindow(5, '1 h').
Key: request IP from x-forwarded-for header, fallback to 'anonymous'.
On limit exceeded: return 429 with header Retry-After: 3600

Input validation (Zod):
name: string min 1 max 100
email: string email format
subject: enum ['gcse', 'alevel', 'ib', 'tawjihi', 'general']
message: string min 20 max 2000

Sanitize: strip any HTML tags from name and message before processing.
A simple regex strip is fine: str.replace(/<[^>]*>/g, '').trim()

Email via Resend:
Send to process.env.CONTACT_EMAIL
Subject: "New inquiry from [name] — [subject]"
Body: plain text with all fields
From: "Ilm Learning Center noreply@yourdomain.com" — mark as // TODO: update domain

Always return:
200 { success: true } on success
400 { error: 'Invalid input' } on validation failure
429 { error: 'Too many requests' } on rate limit
500 { error: 'Failed to send message' } on Resend failure
Never return the real error in the body

────────────────────────────────────────────
STEP 18 — FINAL VERIFICATION
────────────────────────────────────────────

When all the above is built:

Run npx tsc --noEmit and fix every TypeScript error.
Zero errors is the target.
Run npm run lint and fix every ESLint error.
Run npm run dev and verify:
/ loads the home page
/ar/ loads the Arabic version with RTL layout
/en/programs, /en/about, /en/contact all load
/en/auth/login and /en/auth/signup load and show forms
/en/dashboard redirects to /en/auth/login when not logged in
Response headers include X-Frame-Options and Strict-Transport-Security
Write a README.md with:
Prerequisites (Node, Supabase CLI)
How to set up the Supabase project
The MANUAL STEP: registering the JWT hook in Supabase Dashboard
(Authentication → Hooks → Customize Access Token → select custom_access_token_hook)
How to fill in .env.local
How to run the migrations (supabase db push or run them manually in the SQL editor)
npm run dev to start
Verify .env.local is in .gitignore.
Create a supabase/config.toml with the project ID placeholder.
That is the complete build. Do not add anything not specified.
Report when done with: which files were created, any decisions you made
that weren't specified, and anything that needs a manual action from me.

---
## Three things to do manually that Claude Code cannot do for you
1. **Register the JWT hook** — after your Supabase project is live and the migration runs, go to Supabase Dashboard → Authentication → Hooks → Customize Access Token → select `custom_access_token_hook`. Without this, roles won't appear in the JWT and role-based routing won't work.
2. **Verify your domain in Resend** — production emails won't send without it. Dev works with the Resend test domain.
3. **Fill in `.env.local`** — Claude Code will create `.env.example` with placeholders. You paste in the real keys yourself. Never let it see your actual keys.
---
Two notes before you run this: the Arabic translations Claude Code generates should be reviewed by a native speaker before going live — machine translation of UI copy is passable but not client-quality. And if the Tawjihi subjects come out wrong in the programs page, flag it — those need to match the actual Palestinian Ministry of Education curriculum exactly.
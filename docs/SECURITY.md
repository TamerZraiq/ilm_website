# Security Overview

Threat model, protections in code, and the dashboard settings that must be configured for the protections to hold end-to-end.

## Threat model

Public marketing site with a single privileged role (admin) editing content inline. The assets worth protecting: the admin account, the content tables, the contact inbox (spam/abuse), and visitor trust (no XSS/defacement). There is no payment data, no student PII beyond auth emails.

## Protections in code

### Authentication & authorization
- Server-side checks use `supabase.auth.getUser()` (validated against Supabase) — never the unvalidated local session.
- Every server action calls `requireAdmin()` before any logic; roles come from the JWT (`custom_access_token_hook`) with a profiles-table fallback.
- Admin login is rate limited: **5 attempts / 15 minutes / IP** (Upstash sliding window). Failed logins return a generic message — no user enumeration.
- Non-admin accounts that authenticate are signed out immediately by the login action.
- Session refresh happens in `src/proxy.ts`, so tokens rotate on every request.
- Password reset is self-service (`/admin/reset-password`) and rate limited separately: **3 requests / hour / IP**. The response is identical whether or not the email matches an account, so the flow cannot be used to enumerate admin emails.
- New passwords are enforced at **12 characters minimum** by the same Zod schema used everywhere else in the app (`updatePasswordAction`), not just a dashboard setting.
- Updating a password signs the session out and forces a fresh login, rather than leaving the recovery session active.

### Database (Postgres / Supabase)
- RLS enabled on every table; public reads limited to visible/active rows; writes admin-only via a `SECURITY DEFINER` `is_admin()` check.
- Table grants limited to SELECT/INSERT/UPDATE/DELETE (`010_tighten_grants.sql`) — `TRUNCATE` is not RLS-governed and is revoked.
- Role escalation blocked: `profiles_update_own` has a `WITH CHECK` that pins the role column.
- The service-role key is not used anywhere in the app and should not exist in its environment.

### Input handling
- Every server action and API route validates with Zod before touching the database.
- Contact form: HTML stripped, line breaks removed from subject interpolation, 10 KB payload cap, honeypot field (silent drop), **5 messages / hour / IP** rate limit.
- Inline CMS content is rendered as text nodes (never `dangerouslySetInnerHTML`), so stored XSS through the CMS is not possible.

### Transport & headers
- HSTS (2 years, preload), `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `nosniff`, `Cross-Origin-Opener-Policy: same-origin`, restrictive `Permissions-Policy`.
- CSP: `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`. Production disallows `unsafe-eval`.
- Generic error messages to clients; real errors logged server-side only.

## Required dashboard settings (not enforceable from code)

These live in service dashboards and **must** be set — see also [HANDOVER.md](HANDOVER.md):

| Where | Setting | Why |
|---|---|---|
| Supabase → Auth → Providers → Email | **Disable sign-ups** (unless portals launch) | New signups get role `student` with no write power, but closing the door removes the attack surface entirely |
| Supabase → Auth → Hooks | Register `custom_access_token_hook` | Roles in JWT instead of a DB read per check |
| Supabase → Auth → Passwords | Enable **leaked-password protection**; min length ≥ 12 for admin accounts | Blocks known-breached passwords |
| Supabase → Auth → Sessions | Reasonable session/refresh lifetimes (defaults are fine) | Limits stolen-token window |
| Vercel → Project → Environment Variables | All secrets here, never in code | Single place to rotate |
| Resend | Verified domain + `CONTACT_FROM` | SPF/DKIM so mail is authenticated |

## Accepted limitations (documented, deliberate)

- `script-src` allows `'unsafe-inline'` — required by Next.js inline bootstrapping without a nonce pipeline. A nonce-based CSP is possible later; with no user-generated HTML rendered anywhere, inline-script injection has no entry point today.
- `npm audit` flags PostCSS inside Next.js — build-time only; fixed upstream in Next 16.3.
- Rate limiting fails open if Upstash is unreachable (availability over lockout); failures are logged.

## Reporting

Found something? Email the site owner (see `CONTACT_EMAIL`) with steps to reproduce.

# Handover Checklist

Everything needed to transfer this project to a new owner. Work top to bottom; each item is done when the new owner has verified access **and** the old owner's access is removed.

## 1. Accounts & access transfer

- [ ] **GitHub / source** — transfer the repository (or push to the buyer's org) and remove old collaborators.
- [ ] **Vercel** — transfer the project to the buyer's Vercel team; confirm production deploys work from the transferred repo.
- [ ] **Supabase** — transfer the organization/project (Supabase Dashboard → Settings → Transfer project) or invite the buyer as owner and step down.
- [ ] **Resend** — buyer creates their own account, verifies the production sending domain, and generates a new API key.
- [ ] **Upstash** — buyer creates a Redis database (free tier is sufficient) and copies the REST URL + token.
- [ ] **Domain** — transfer DNS ownership; point it at Vercel; update `NEXT_PUBLIC_SITE_URL`.

## 2. Secret rotation (after transfer)

All previous credentials must be treated as exposed once the project changes hands:

- [ ] Rotate the Supabase anon key if the project was shared rather than transferred (Settings → API).
- [ ] New Resend API key (old one revoked).
- [ ] New Upstash database or rotated token.
- [ ] Re-enter all values in Vercel → Project → Environment Variables. Required: everything in [.env.example](../.env.example).

## 3. Database

- [ ] All migrations `001`–`010` applied in order (see README).
- [ ] JWT hook registered: Supabase Dashboard → Authentication → Hooks → Customize Access Token → `custom_access_token_hook`.
- [ ] At least one admin account created and promoted (`UPDATE public.profiles SET role = 'admin' WHERE id = '...'`).
- [ ] Confirm public signups behave as intended. If the buyer does not want open registration, disable it: Authentication → Providers → Email → disable sign-ups.
- [ ] Apply the auth hardening settings from [SECURITY.md](SECURITY.md): leaked-password protection on, minimum password length ≥ 12.

## 4. Email

- [ ] Production sending domain verified in Resend.
- [ ] `CONTACT_FROM` set to the verified sender (e.g. `Ilm Learning Center <no-reply@domain>`).
- [ ] `CONTACT_EMAIL` set to the inbox that should receive enquiries.
- [ ] Send a test enquiry through the live contact form and confirm delivery.

## 5. Content

- [ ] Real contact details replace placeholders: footer phone number, WhatsApp link, location/city on the contact page (`src/messages/en.json` + `ar.json`, keys `footer.phone`, `contact.location`).
- [ ] Testimonials replaced with real quotes (site content is editable inline as admin).
- [ ] Teacher profiles added via the inline CMS on the About page.
- [ ] Pricing plans reviewed/added on the home page.
- [ ] Arabic copy reviewed by a native speaker.

## 6. Final verification

- [ ] `npm run type-check`, `npm run test`, `npm run build` all pass on the buyer's machine.
- [ ] `/en` and `/ar` load with correct fonts and RTL layout.
- [ ] Admin login works; inline editing saves and appears on the public site.
- [ ] Contact form: valid submission delivers; 6th submission within an hour returns a rate-limit message.
- [ ] Response headers include `Strict-Transport-Security` and a CSP without `unsafe-eval`.

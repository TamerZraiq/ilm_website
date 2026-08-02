# Handover Checklist

The site is fully static — no database, no auth, no third-party service accounts. Handover is just three things.

## 1. Accounts & access transfer

- [ ] **GitHub / source** — transfer the repository (or push to the buyer's org) and remove old collaborators.
- [ ] **Vercel** — transfer the project to the buyer's Vercel team; confirm production deploys work from the transferred repo.
- [ ] **Domain** — transfer DNS ownership; point it at Vercel; update `NEXT_PUBLIC_SITE_URL` in Vercel's environment variables.

## 2. Content

- [ ] Real WhatsApp number set in `src/lib/site.ts` (`WHATSAPP_NUMBER`).
- [ ] Testimonials in `src/messages/en.json` / `ar.json` are real quotes, not placeholders.
- [ ] Teacher profiles and pricing — currently not on the site (see PRODUCT.md/README for why). Add them as static content in the messages files if/when there's real data.
- [ ] Arabic copy reviewed by a native speaker.

## 3. Final verification

- [ ] `npm run type-check`, `npm run test`, `npm run build` all pass on the buyer's machine.
- [ ] `/en` and `/ar` load with correct fonts and RTL layout.
- [ ] The WhatsApp button on the contact page and both CTAs on the home page open a real chat.
- [ ] Response headers include `Strict-Transport-Security` and a CSP without `unsafe-eval`.
- [ ] `NEXT_PUBLIC_SITE_URL` is set in Vercel and `/sitemap.xml` + `/robots.txt` show the real domain, not `localhost`.

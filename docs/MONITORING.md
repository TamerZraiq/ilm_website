# Monitoring

The goal: know if something's wrong without checking the site yourself. Since this is a fully static site with no database and no backend, there isn't much that *can* break — but three things are worth watching.

## 1. Uptime — is the site actually reachable?

Vercel itself doesn't notify you if your domain stops resolving (DNS issue, expired domain, misconfigured record). Set up a free external check:

1. Create a free account at [Better Stack](https://betterstack.com/uptime) or [UptimeRobot](https://uptimerobot.com).
2. Add a monitor for `https://ilm-website.vercel.app/en` (or your custom domain once set).
3. Set check interval to 5 minutes, alert via email (and SMS/phone if the free tier allows).

This is the one piece that needs an external account, because nothing hosted on Vercel can tell you Vercel itself is unreachable.

## 2. Deploy failures — did the last push actually go live?

Built into Vercel already, just needs turning on:

1. Vercel Dashboard → your project → **Settings → Notifications**.
2. Enable **"Deployment Failed"** email notifications.

Now if a bad commit breaks the build, you get an email instead of finding out when a visitor tells you the site looks wrong.

## 3. Traffic & performance

Already wired into the code (`@vercel/analytics` + `@vercel/speed-insights` in the root layout) — this just needs enabling on Vercel's side, no extra account or API key:

1. Vercel Dashboard → your project → **Analytics** tab → enable.
2. **Speed Insights** tab → enable.

Free tier covers a small site like this comfortably. This gives you visitor counts, top pages, and Core Web Vitals (page speed) without any third-party service.

## 4. Search visibility

Not uptime, but the closest thing to "is Google still finding my site":

1. [Google Search Console](https://search.google.com/search-console) → add the domain → verify (Vercel supports DNS verification).
2. Submit `/sitemap.xml`.
3. Check back monthly for indexing errors or a traffic drop — Search Console can also email you if pages start failing to index.

## What you don't need

No error-tracking service (Sentry, etc.) is set up, and for this site that's the right call, not a gap: there's no database, no form submission, no user input, and no server-side logic beyond serving pre-built HTML. The only place a runtime error could occur is the dynamic Open Graph image generator, which is extremely low-traffic and low-risk. If the site later grows a form or a backend again, revisit this.

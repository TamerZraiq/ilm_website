/**
 * Absolute origin for canonicals, hreflang, sitemap and OG image URLs.
 *
 * Order matters. `NEXT_PUBLIC_SITE_URL` is the explicit override to set once
 * the real domain is live. Failing that, Vercel's own production-domain
 * variable keeps a deployment correct with no configuration at all — without
 * it, an unset env var silently ships `localhost` canonicals and a
 * `localhost` OG image to production, which is far worse than a wrong-looking
 * preview domain. Localhost is the last resort, for local dev only.
 */
export const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  // Reaching here on Vercel means every canonical, hreflang, sitemap entry
  // and og:image URL would ship pointing at localhost — invisible in the UI,
  // ruinous for search indexing and link previews, and easy to not notice
  // for weeks. Vercel always sets VERCEL=1, so this can only fire on a real
  // deploy, never in local dev. Fail the build loudly instead.
  if (process.env.VERCEL) {
    throw new Error(
      "SITE_URL could not be resolved. Set NEXT_PUBLIC_SITE_URL in the Vercel " +
        "project's Environment Variables (e.g. https://ilm-website.vercel.app, " +
        "or the custom domain once it is live), then redeploy. Without it the " +
        "site would publish localhost canonicals and a localhost og:image."
    );
  }

  return "http://localhost:3000";
})();

export const WHATSAPP_NUMBER = "972593454635";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps search link for the centre's real address — works with no
 *  API key, opens the native Maps app on mobile. */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Murrah and Falaneh Center, Tireh Main Street, Ramallah, Palestine");

const DEFAULT_LOCALE = "ar";

/** Locale-aware href for a locale-free path (e.g. "/about", or "" for home).
 *  Arabic is the default locale served with no prefix (localePrefix:
 *  "as-needed" in routing.ts); English always gets its /en prefix. */
function localeHref(locale: string, path: string): string {
  if (locale === DEFAULT_LOCALE) return path === "" ? "/" : path;
  return `/${locale}${path}`;
}

/** Canonical + hreflang alternates for a page, keyed off its locale-free path
 *  (e.g. "/about"). Every page's generateMetadata should call this — without
 *  it, Next falls back to the root layout's alternates, which all point at
 *  the homepage. */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: localeHref(locale, path),
    languages: {
      ar: localeHref("ar", path),
      en: localeHref("en", path),
      // Which version to serve a visitor whose language matches neither.
      // Arabic is the default locale and lives at the unprefixed path, so
      // it is also the correct x-default target.
      "x-default": localeHref("ar", path),
    },
  };
}

/** Full per-page Open Graph object. Next replaces (not merges) `openGraph`
 *  when a route segment redeclares it, so every page must restate siteName/
 *  locale/type itself — omitting them here would silently drop them from
 *  the root layout's defaults. */
export function pageOpenGraph({
  locale,
  path,
  title,
  description,
  siteName,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  siteName: string;
}) {
  return {
    siteName,
    title,
    description,
    url: localeHref(locale, path),
    locale: locale === "ar" ? "ar_PS" : "en_US",
    type: "website" as const,
  };
}

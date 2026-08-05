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
    languages: { ar: localeHref("ar", path), en: localeHref("en", path) },
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

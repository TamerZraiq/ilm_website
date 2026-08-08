import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createIntlMiddleware(routing);

/**
 * Paths the locale middleware must not touch. Next parses this object
 * statically at build time, so the pattern has to stay a literal.
 *
 * `opengraph-image` matters more than it looks: with `localePrefix:
 * "as-needed"` the middleware strips the default locale's prefix, so
 * `/ar/opengraph-image` — the exact URL Next emits in the Arabic pages'
 * `og:image` tag — was being 307'd to `/opengraph-image`, which no route
 * serves. Every Arabic link shared on WhatsApp lost its preview image.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_vercel|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*opengraph-image|.*\\.(?:png|jpg|jpeg|svg|webp|mp4|ico|txt|xml|webmanifest)$).*)",
  ],
};

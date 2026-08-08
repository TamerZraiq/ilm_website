import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = ["/", "/programs", "/about", "/contact"];

// Arabic is the default locale (no prefix, localePrefix: "as-needed" in
// routing.ts); English always gets its /en prefix.
function localeHref(locale: "ar" | "en", route: string): string {
  if (locale === "ar") return route;
  return `/en${route === "/" ? "" : route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return (["ar", "en"] as const).flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${localeHref(locale, route)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1.0 : 0.8,
    }))
  );
}

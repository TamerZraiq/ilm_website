import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_ROUTES = ["/", "/programs", "/about", "/contact"];
const LOCALES = ["en", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route === "/" ? "" : route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1.0 : 0.8,
    }))
  );
}

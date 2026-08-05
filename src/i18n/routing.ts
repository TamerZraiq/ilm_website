import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"] as const,
  defaultLocale: "ar",
  // Arabic (the default) is served at the bare root with no prefix; English
  // lives under /en. Arabic is the primary language for this audience.
  localePrefix: "as-needed",
  // Without this, next-intl auto-selects a locale from the visitor's
  // Accept-Language header (and remembers it via cookie), which would show
  // English to anyone whose device is set to English — defeating "Arabic is
  // the default." Disabling it means the bare root always serves Arabic on
  // a fresh visit; explicit navigation to /en still works normally.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

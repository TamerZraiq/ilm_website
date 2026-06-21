import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && routing.locales.includes(requested as "en" | "ar")
      ? requested
      : routing.defaultLocale;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createIntlMiddleware(routing);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|.*\\.mp4$|sitemap\\.xml|robots\\.txt).*)",
  ],
};

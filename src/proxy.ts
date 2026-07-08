import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { createClient } from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = intlMiddleware(request) ?? NextResponse.next();

  // Refresh the Supabase session so admin logins don't silently expire.
  // Server Components can't write cookies, so the rotation must happen here.
  const hasAuthCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-"));
  if (hasAuthCookie) {
    const supabase = createClient(request, response);
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|.*\\.mp4$|sitemap\\.xml|robots\\.txt|api/).*)",
  ],
};

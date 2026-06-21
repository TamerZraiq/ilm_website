import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { createClient } from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const protectedRoutes: Record<string, string[] | null> = {
  "/dashboard": null,
  "/parent": ["parent", "admin"],
  "/teacher": ["teacher", "admin"],
  "/admin": ["admin"],
};

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  const response = intlResponse ?? NextResponse.next();

  const supabase = createClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(en|ar)(\/|$)/);
  const locale = localeMatch?.[1] ?? "en";
  const pathWithoutLocale = localeMatch
    ? pathname.replace(/^\/(en|ar)/, "") || "/"
    : pathname;

  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (
      pathWithoutLocale === route ||
      pathWithoutLocale.startsWith(`${route}/`)
    ) {
      if (!user) {
        const loginUrl = new URL(`/${locale}/auth/login`, request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
      }

      if (allowedRoles) {
        const userRole = user.app_metadata?.user_role as string | undefined;
        if (!userRole || !allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL(`/${locale}`, request.url));
        }
      }

      break;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};

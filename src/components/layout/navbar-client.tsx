"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, Menu, X, ChevronDown } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { signOutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { key: "home" as const, href: "/" as const },
  { key: "programs" as const, href: "/programs" as const },
  { key: "about" as const, href: "/about" as const },
  { key: "contact" as const, href: "/contact" as const },
];

interface NavbarClientProps {
  locale: string;
  user: { firstName: string; email: string } | null;
}

export function NavbarClient({ locale, user }: NavbarClientProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const switchLocale = locale === "en" ? "ar" : "en";

  function handleLocaleSwitch() {
    router.replace(pathname, { locale: switchLocale });
    setMobileOpen(false);
  }

  const boundSignOut = signOutAction.bind(null, locale);

  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-gold/20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-white">
          <BookOpen className="h-7 w-7 text-gold" />
          <span className="text-lg font-bold tracking-tight">
            Ilm Learning Center
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold",
                pathname === link.href ? "text-gold" : "text-white/80"
              )}
            >
              {t(link.key)}
            </Link>
          ))}

          <button
            onClick={handleLocaleSwitch}
            className="rounded-md border border-gold/30 px-3 py-1.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            {switchLocale === "ar" ? "AR" : "EN"}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-gold"
              >
                {user.firstName}
                <ChevronDown className="h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute end-0 mt-2 w-44 rounded-md border border-gold/10 bg-navy-dark py-1 shadow-lg">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-gold/10 hover:text-gold"
                  >
                    {t("dashboard")}
                  </Link>
                  <form action={boundSignOut}>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 text-start text-sm text-white/80 hover:bg-gold/10 hover:text-gold"
                    >
                      {t("logout")}
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
              >
                {t("login")}
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
              >
                {t("signup")}
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-gold/10 bg-navy px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-gold",
                  pathname === link.href ? "text-gold" : "text-white/80"
                )}
              >
                {t(link.key)}
              </Link>
            ))}

            <hr className="border-gold/10" />

            <button
              onClick={handleLocaleSwitch}
              className="w-fit rounded-md border border-gold/30 px-3 py-1.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              {switchLocale === "ar" ? "العربية" : "English"}
            </button>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-white/80 transition-colors hover:text-gold"
                >
                  {t("dashboard")}
                </Link>
                <form action={boundSignOut}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full border-gold/30 text-gold hover:bg-gold/10"
                  >
                    {t("logout")}
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-white/80 transition-colors hover:text-gold"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
                >
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

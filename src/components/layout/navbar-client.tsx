"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, Menu, X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { AdminToolbar } from "@/components/cms/admin-toolbar";

const navLinks = [
  { key: "home" as const, href: "/" as const },
  { key: "programs" as const, href: "/programs" as const },
  { key: "about" as const, href: "/about" as const },
  { key: "contact" as const, href: "/contact" as const },
];

export function NavbarClient({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = locale === "en" ? "ar" : "en";

  function handleLocaleSwitch() {
    router.replace(pathname, { locale: switchLocale });
    setMobileOpen(false);
  }

  return (
    <>
    <AdminToolbar />
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-navy">
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
          </div>
        </div>
      )}
    </header>
    </>
  );
}

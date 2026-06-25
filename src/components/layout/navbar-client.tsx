"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);

  const switchLocale = locale === "en" ? "ar" : "en";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLocaleSwitch() {
    router.replace(pathname, { locale: switchLocale });
    setMobileOpen(false);
  }

  return (
    <>
      <AdminToolbar />
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-navy/[0.06] bg-white/90 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Ilm Learning Center"
              width={42}
              height={42}
              className="h-[42px] w-auto"
            />
            <span className="hidden text-[17px] font-bold tracking-tight text-navy sm:block">
              Ilm Learning Center
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "relative py-1 text-[14px] font-medium transition-colors hover:text-gold",
                  pathname === link.href ? "text-navy" : "text-navy/45"
                )}
              >
                {t(link.key)}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gold" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={handleLocaleSwitch}
              className="rounded-lg border border-navy/10 px-3.5 py-1.5 text-[13px] font-medium text-navy/45 transition-colors hover:border-gold/30 hover:text-gold"
            >
              {switchLocale === "ar" ? "عربي" : "EN"}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-navy md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="absolute inset-x-0 top-full border-b border-navy/[0.06] bg-white px-6 pb-6 shadow-lg md:hidden">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-[15px] font-medium transition-colors",
                    pathname === link.href
                      ? "bg-warm text-navy"
                      : "text-navy/45 hover:bg-warm hover:text-navy"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <hr className="my-2 border-navy/[0.06]" />
              <button
                onClick={handleLocaleSwitch}
                className="rounded-lg px-4 py-3 text-start text-[15px] font-medium text-navy/45 transition-colors hover:bg-warm hover:text-navy"
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

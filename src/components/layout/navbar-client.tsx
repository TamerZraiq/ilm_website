"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";

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
      <header
        className={cn(
          "site-header sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 shadow-[0_1px_20px_-4px_rgba(26,43,107,0.14)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="Ilm Learning Center"
              width={42}
              height={42}
              className="h-[42px] w-auto"
            />
            <span className="hidden text-[17px] font-bold tracking-tight text-navy sm:block">
              {locale === "ar" ? "مركز علم التعليمي" : "Ilm Learning Center"}
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "relative py-1 text-[14px] font-medium transition-colors hover:text-gold",
                  pathname === link.href ? "text-navy" : "text-navy/70"
                )}
              >
                {t(link.key)}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 start-0 h-[2px] w-full bg-gold" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-[13px] font-semibold text-navy transition-all hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] active:duration-100"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {t("whatsapp")}
            </a>
            <button
              onClick={handleLocaleSwitch}
              className="rounded-lg border border-navy/10 px-3.5 py-1.5 text-[13px] font-medium text-navy/70 transition-all hover:border-gold/30 hover:text-gold active:scale-[0.94] active:duration-100"
            >
              {switchLocale === "ar" ? "عربي" : "EN"}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-navy transition-transform active:scale-90 active:duration-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="absolute inset-x-0 top-full border-b border-navy/[0.06] bg-white px-6 pb-6 shadow-lg md:hidden">
            <div className="flex flex-col gap-1 pt-4">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mb-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-[15px] font-semibold text-navy transition-all active:scale-[0.97]"
              >
                <MessageCircle className="h-4 w-4" />
                {t("whatsapp")}
              </a>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-[15px] font-medium transition-colors",
                    pathname === link.href
                      ? "bg-warm text-navy"
                      : "text-navy/70 hover:bg-warm hover:text-navy"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <hr className="my-2 border-navy/[0.06]" />
              <button
                onClick={handleLocaleSwitch}
                className="rounded-lg px-4 py-3 text-start text-[15px] font-medium text-navy/70 transition-colors hover:bg-warm hover:text-navy"
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

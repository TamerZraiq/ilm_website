"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
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
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const switchLocale = locale === "en" ? "ar" : "en";

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.5 });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // An open drawer must be dismissable by keyboard and must not leave the
  // page scrolling underneath it.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  function handleLocaleSwitch() {
    router.replace(pathname, { locale: switchLocale });
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
        scrolled ? "bg-warm/85 shadow-[0_1px_24px_-6px_rgba(26,43,107,0.18)] backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav
        aria-label={tMeta("siteName")}
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6"
      >
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt=""
            aria-hidden
            width={42}
            height={42}
            className="h-[42px] w-auto"
          />
          <span className="hidden text-[17px] font-bold tracking-[-0.02em] text-navy sm:block">
            {tMeta("siteName")}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[14px] font-medium transition-colors duration-300",
                  active ? "text-navy" : "text-navy/70 hover:text-navy"
                )}
              >
                {t(link.key)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1 start-0 h-[2px] w-full origin-[left] bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] rtl:origin-[right]",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[12px] bg-gold px-4 py-2 text-[13px] font-semibold text-navy transition-[transform,filter,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] hover:brightness-[1.08] active:scale-[0.97] active:duration-[120ms]"
          >
            <MessageCircle aria-hidden className="h-3.5 w-3.5" />
            {t("whatsapp")}
          </a>
          <button
            type="button"
            onClick={handleLocaleSwitch}
            lang={switchLocale}
            aria-label={t("switchLanguage")}
            className="rounded-[12px] border border-navy/12 px-3.5 py-1.5 text-[13px] font-medium text-navy/70 transition-[color,border-color,transform] duration-300 hover:border-gold/40 hover:text-gold-ink active:scale-[0.94] active:duration-[120ms]"
          >
            {switchLocale === "ar" ? "عربي" : "EN"}
          </button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          className="-me-2 p-2 text-navy transition-transform duration-200 active:scale-90 md:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Reading progress — a hairline that belongs to the page, not a widget */}
      <m.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-[left] bg-gold/70 rtl:origin-[right]"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-navy/[0.06] bg-warm px-6 pb-7 shadow-[0_20px_50px_-20px_rgba(26,43,107,0.35)] md:hidden"
          >
            <div className="flex flex-col gap-1 pt-4">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mb-3 inline-flex items-center justify-center gap-2 rounded-[14px] bg-gold px-4 py-3.5 text-[15px] font-semibold text-navy transition-transform duration-200 active:scale-[0.97]"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                {t("whatsapp")}
              </a>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-[12px] px-4 py-3 text-[15px] font-medium transition-colors",
                      active ? "bg-white text-navy" : "text-navy/70 hover:bg-white hover:text-navy"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
              <hr className="my-2 border-navy/[0.08]" />
              <button
                type="button"
                onClick={handleLocaleSwitch}
                lang={switchLocale}
                className="rounded-[12px] px-4 py-3 text-start text-[15px] font-medium text-navy/70 transition-colors hover:bg-white hover:text-navy"
              >
                {switchLocale === "ar" ? "العربية" : "English"}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

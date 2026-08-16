"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { Languages, Menu, MessageCircle, X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";

const navLinks = [
  { key: "home" as const, href: "/" as const },
  { key: "programs" as const, href: "/programs" as const },
  { key: "about" as const, href: "/about" as const },
  { key: "contact" as const, href: "/contact" as const },
];

const LOCALES = ["ar", "en"] as const;
type Locale = (typeof LOCALES)[number];

const LOCALE_LABEL: Record<Locale, string> = { ar: "عربي", en: "EN" };

/*
 * The hint that beats Chrome's "translate this page?" prompt to the punch.
 *
 * Machine-translating the Arabic site produces mangled copy when a properly
 * written English version already exists one tap away. This copy is therefore
 * always written in the language being *offered*, not the one currently
 * rendered — a visitor who cannot read Arabic has to be able to read the way
 * out. That is also why it cannot live in the message files, which only ever
 * resolve against the active locale.
 */
const HINT: Record<Locale, { text: string; cta: string; dismiss: string }> = {
  en: {
    text: "This site has a full English version.",
    cta: "Read in English",
    dismiss: "Dismiss",
  },
  ar: {
    text: "هذا الموقع متوفر بالكامل بالعربية.",
    cta: "تصفّح بالعربية",
    dismiss: "إغلاق",
  },
};

const HINT_STORAGE_KEY = "ilm.lang-hint.dismissed";

/** Private-mode Safari throws on localStorage. A hint that cannot remember a
 *  dismissal is a nuisance; a hint that crashes the navbar is a bug. */
function rememberHintDismissed() {
  try {
    window.localStorage.setItem(HINT_STORAGE_KEY, "1");
  } catch {
    /* storage unavailable — the hint simply reappears next visit */
  }
}

export function NavbarClient({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const otherLocale: Locale = locale === "en" ? "ar" : "en";

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

  // Runs after mount, so nothing here can desync the server-rendered HTML.
  // Only offered when the visitor's own browser asks for the language we are
  // *not* showing — a French or Hebrew speaker gets no hint, because neither
  // version is their language and Google's translation genuinely is the
  // better answer for them.
  //
  // Deferred by a beat rather than set synchronously: the hint is never part
  // of the first paint, so it has no business delaying it, and sliding in a
  // moment later reads as a considered offer rather than a popup. A timer
  // rather than requestAnimationFrame, which never fires while a tab is in
  // the background — the hint has to be waiting when that tab is opened.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(HINT_STORAGE_KEY)) return;
    } catch {
      /* storage unavailable — fall through and show the hint */
    }

    const preferred = (navigator.languages?.length
      ? navigator.languages
      : [navigator.language]
    )
      .map((tag) => tag.toLowerCase().split("-")[0])
      .find((tag): tag is Locale => tag === "ar" || tag === "en");

    if (preferred !== otherLocale) return;

    const timer = window.setTimeout(() => setHintOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, [otherLocale]);

  function dismissHint() {
    setHintOpen(false);
    rememberHintDismissed();
  }

  function selectLocale(next: Locale) {
    setMobileOpen(false);
    // Choosing a language by hand answers the hint's question for good.
    setHintOpen(false);
    rememberHintDismissed();
    if (next === locale) return;
    router.replace(pathname, { locale: next });
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

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-[12px] bg-gold px-4 py-2 text-[13px] font-semibold text-navy transition-[transform,filter,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] hover:brightness-[1.08] active:scale-[0.97] active:duration-[120ms] md:inline-flex"
          >
            <MessageCircle aria-hidden className="h-3.5 w-3.5" />
            {t("whatsapp")}
          </a>

          {/* Both languages, named in their own script, at every breakpoint.
              Buried in the mobile drawer this was effectively invisible — and
              an invisible switch is what sends people to Google Translate. */}
          <div
            role="group"
            aria-label={t("language")}
            className="flex shrink-0 items-center gap-0.5 rounded-full border border-navy/12 bg-white/70 p-[3px] ps-2 shadow-[0_1px_2px_rgba(26,43,107,0.05)] backdrop-blur-sm"
          >
            <Languages aria-hidden className="h-[15px] w-[15px] shrink-0 text-navy/45" />
            {LOCALES.map((code) => {
              const active = code === locale;
              return (
                <button
                  key={code}
                  type="button"
                  lang={code}
                  aria-pressed={active}
                  onClick={() => selectLocale(code)}
                  className={cn(
                    "rounded-full px-3 py-2 text-[12px] font-bold leading-[18px] transition-[color,background-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.94] active:duration-[120ms]",
                    active
                      ? "bg-navy text-white"
                      : "text-navy/60 hover:bg-navy/[0.06] hover:text-navy"
                  )}
                >
                  {LOCALE_LABEL[code]}
                </button>
              );
            })}
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
        </div>
      </nav>

      {/* Sits below the bar rather than in the flow, so it can appear after
          hydration without shifting a single pixel of the page. */}
      <AnimatePresence>
        {hintOpen && !mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            lang={otherLocale}
            dir={otherLocale === "ar" ? "rtl" : "ltr"}
            className="absolute inset-x-0 top-full border-b border-navy/[0.08] bg-navy text-white shadow-[0_16px_40px_-24px_rgba(26,43,107,0.6)]"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
              <Languages aria-hidden className="h-4 w-4 shrink-0 text-gold-light" />
              <p className="min-w-0 flex-1 text-[13px] leading-snug text-white/85">
                {HINT[otherLocale].text}
              </p>
              <button
                type="button"
                onClick={() => selectLocale(otherLocale)}
                className="shrink-0 rounded-full bg-gold px-3.5 py-1.5 text-[12px] font-bold text-navy transition-transform duration-300 hover:scale-[1.04] active:scale-[0.95]"
              >
                {HINT[otherLocale].cta}
              </button>
              <button
                type="button"
                onClick={dismissHint}
                aria-label={HINT[otherLocale].dismiss}
                className="-me-1 shrink-0 rounded-full p-1.5 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

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
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

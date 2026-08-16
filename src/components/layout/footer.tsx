"use client";

import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CURRICULA_KEYS } from "@/lib/curricula";
import { SocialLinks } from "@/components/ui/social-links";
import { MAPS_URL, SOCIALS, whatsappUrl } from "@/lib/site";

/** The four highest-priority curricula, taken from the single source of
 *  truth rather than re-listed in the message files — a duplicate list here
 *  would silently drift the moment the real order changes. */
const FOOTER_CURRICULA = CURRICULA_KEYS.slice(0, 4);

const linkClass =
  "text-white/65 transition-colors duration-300 hover:text-gold-light";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const meta = useTranslations("meta");
  const programs = useTranslations("programs");

  return (
    <footer className="grain on-dark relative overflow-hidden bg-navy-deep text-white">
      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <p className="t-h3 font-bold text-white">{meta("siteName")}</p>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/60">
              {t("tagline")}
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-[12px] border border-gold/40 px-5 py-2.5 text-[13px] font-semibold text-gold-light transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:border-gold hover:bg-gold/10 active:scale-[0.97]"
            >
              {t("whatsapp")}
            </a>

            {SOCIALS.length > 0 && (
              <div className="mt-10">
                <h2 className="t-micro text-white/55">{t("followUs")}</h2>
                <SocialLinks className="mt-5" />
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-micro text-white/55">{t("programs")}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_CURRICULA.map((key) => (
                <li key={key}>
                  <Link href="/programs" className={linkClass}>
                    {programs(`${key}.name`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/programs"
                  className="font-semibold text-gold-light transition-colors duration-300 hover:text-gold"
                >
                  {t("viewAll")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="t-micro text-white/55">{t("quickLinks")}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/" className={linkClass}>{nav("home")}</Link></li>
              <li><Link href="/about" className={linkClass}>{nav("about")}</Link></li>
              <li><Link href="/contact" className={linkClass}>{nav("contact")}</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="t-micro text-white/55">{t("contactUs")}</h2>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li>
                <a href={`mailto:${t("email")}`} className={linkClass}>
                  {t("email")}
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-start gap-2 ${linkClass}`}
                >
                  <MapPin aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{t("address")}</span>
                </a>
              </li>
              <li>
                <span className="t-micro block text-white/55">{t("hours.academicLabel")}</span>
                <span className="mt-1 block">{t("hours.academic")}</span>
              </li>
              <li>
                <span className="t-micro block text-white/55">{t("hours.summerLabel")}</span>
                <span className="mt-1 block">{t("hours.summer")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The mark, oversized and quiet — the page signs off with the same
         *  image it opened with. */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <p className="text-xs text-white/50">
            {t("copyright", { year: new Date().getFullYear().toString() })}
          </p>
        </div>
      </div>

      <span
        aria-hidden
        className="t-mega pointer-events-none absolute -bottom-[0.24em] start-1/2 -translate-x-1/2 select-none whitespace-nowrap text-white/[0.035] rtl:translate-x-1/2"
      >
        {meta("siteName")}
      </span>
    </footer>
  );
}

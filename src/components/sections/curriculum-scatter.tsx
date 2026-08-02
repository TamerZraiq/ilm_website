"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CURRICULA_KEYS } from "@/lib/curricula";

type CurriculumKey = (typeof CURRICULA_KEYS)[number];

/** Positions cover all 9 keys in CURRICULA_KEYS — TypeScript will error
 *  above on a typo, but adding/removing a key needs a manual edit here. */
const CURRICULA: { key: CurriculumKey; top: string; left: string; size: string; rotate: string }[] = [
  { key: "gcse", top: "4%", left: "6%", size: "text-2xl md:text-3xl", rotate: "-4deg" },
  { key: "alevel", top: "2%", left: "62%", size: "text-xl md:text-2xl", rotate: "3deg" },
  { key: "tawjihi", top: "16%", left: "30%", size: "text-3xl md:text-4xl", rotate: "-2deg" },
  { key: "clep", top: "10%", left: "84%", size: "text-lg md:text-xl", rotate: "5deg" },
  { key: "ielts", top: "42%", left: "2%", size: "text-xl md:text-2xl", rotate: "4deg" },
  { key: "ap", top: "40%", left: "80%", size: "text-2xl md:text-3xl", rotate: "-3deg" },
  { key: "schoolCurriculum", top: "68%", left: "10%", size: "text-lg md:text-xl", rotate: "-5deg" },
  { key: "ib", top: "72%", left: "36%", size: "text-2xl md:text-3xl", rotate: "3deg" },
  { key: "sat", top: "66%", left: "70%", size: "text-xl md:text-2xl", rotate: "-3deg" },
];

/** Bold scattered curriculum names around a central tagline — the site's
 *  answer to "generic subject photos": real text, real SEO value, no stock
 *  imagery. Desktop shows the full scatter; mobile falls back to a plain
 *  wrapped list of the same names so nothing overlaps on small screens. */
export function CurriculumScatter({ showLink = true }: { showLink?: boolean }) {
  const t = useTranslations("programs");

  return (
    <div className="relative mx-auto max-w-6xl px-6">
      {/* Desktop scatter */}
      <div className="relative hidden h-[460px] md:block">
        {CURRICULA.map((c) => (
          <span
            key={c.key}
            className={`absolute font-extrabold tracking-tight text-navy ${c.size}`}
            style={{ top: c.top, left: c.left, transform: `rotate(${c.rotate})` }}
          >
            {t(`${c.key}.name`)}
          </span>
        ))}
        <div className="absolute left-1/2 top-1/2 w-full max-w-[26ch] -translate-x-1/2 -translate-y-1/2 px-6 text-center">
          <p className="text-2xl text-navy/70 md:text-3xl">{t("tagline")}</p>
        </div>
      </div>

      {/* Mobile fallback: no absolute scatter, just a clean wrapped list */}
      <div className="md:hidden">
        <p className="text-center text-xl text-navy/70">{t("tagline")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-3">
          {CURRICULA.map((c) => (
            <span key={c.key} className="text-lg font-extrabold tracking-tight text-navy">
              {t(`${c.key}.name`)}
            </span>
          ))}
        </div>
      </div>

      {showLink && (
        <div className="mt-10 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:text-gold-dark"
          >
            {t("learnMore")}
          </Link>
        </div>
      )}
    </div>
  );
}

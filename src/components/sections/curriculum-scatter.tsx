"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CURRICULA_KEYS } from "@/lib/curricula";
import { ScatteredTypography } from "@/components/sections/scattered-typography";

type CurriculumKey = (typeof CURRICULA_KEYS)[number];

/** Positions cover all 12 keys in CURRICULA_KEYS — TypeScript will error
 *  above on a typo, but adding/removing a key needs a manual edit here.
 *  Everything sits in the top ~28% or bottom ~28% of the box, leaving the
 *  30-70% vertical band clear for the centered tagline. */
const POSITIONS: { key: CurriculumKey; top: string; left: string; size: string; rotate: string }[] = [
  { key: "gcse", top: "2%", left: "4%", size: "text-2xl md:text-3xl", rotate: "-4deg" },
  { key: "tawjihi", top: "0%", left: "32%", size: "text-3xl md:text-4xl", rotate: "-2deg" },
  { key: "clep", top: "6%", left: "84%", size: "text-lg md:text-xl", rotate: "5deg" },
  { key: "ielts", top: "24%", left: "0%", size: "text-xl md:text-2xl", rotate: "4deg" },
  { key: "checkpoint", top: "20%", left: "24%", size: "text-lg md:text-xl", rotate: "-3deg" },
  { key: "ap", top: "26%", left: "76%", size: "text-2xl md:text-3xl", rotate: "-3deg" },
  { key: "schoolCurriculum", top: "68%", left: "2%", size: "text-lg md:text-xl", rotate: "-5deg" },
  { key: "ib", top: "74%", left: "30%", size: "text-2xl md:text-3xl", rotate: "3deg" },
  { key: "sat", top: "66%", left: "66%", size: "text-xl md:text-2xl", rotate: "-3deg" },
  { key: "toefl", top: "88%", left: "12%", size: "text-lg md:text-xl", rotate: "4deg" },
  { key: "gre", top: "90%", left: "44%", size: "text-lg md:text-xl", rotate: "-2deg" },
  { key: "alevel", top: "84%", left: "70%", size: "text-xl md:text-2xl", rotate: "3deg" },
];

/** Bold scattered curriculum names around a central tagline — the site's
 *  answer to "generic subject photos": real text, real SEO value, no stock
 *  imagery. */
export function CurriculumScatter({ showLink = true }: { showLink?: boolean }) {
  const t = useTranslations("programs");

  const items = POSITIONS.map((p) => ({ ...p, label: t(`${p.key}.name`) }));

  return (
    <div>
      <ScatteredTypography items={items} tagline={t("tagline")} />
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

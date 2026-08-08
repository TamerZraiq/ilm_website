"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HorizontalGallery } from "@/components/motion/horizontal-gallery";
import { BrandImage } from "@/components/ui/brand-image";
import { CURRICULA_KEYS } from "@/lib/curricula";

/** Cycles through BrandImage's branded gradient tiles — on-brand navy/gold,
 *  no stock photography, no per-curriculum photo needed. */
const VARIANTS = [1, 2, 3, 4, 5, 6] as const;

/** Big-text size per curriculum, tuned by name length so short acronyms
 *  (IB, AP) read as a bold poster mark and long names (Checkpoint, School
 *  Curriculum) still fit the 4:5 tile without wrapping awkwardly. */
const BIG_TEXT_SIZE: Record<string, string> = {
  gcse: "text-6xl sm:text-7xl",
  alevel: "text-4xl sm:text-5xl",
  ib: "text-8xl sm:text-9xl",
  tawjihi: "text-4xl sm:text-5xl",
  sat: "text-6xl sm:text-7xl",
  ielts: "text-5xl sm:text-6xl",
  toefl: "text-5xl sm:text-6xl",
  ap: "text-8xl sm:text-9xl",
  clep: "text-6xl sm:text-7xl",
  gre: "text-6xl sm:text-7xl",
  checkpoint: "text-3xl sm:text-4xl",
  schoolCurriculum: "text-2xl sm:text-3xl",
};

export function CurriculumGallery() {
  const t = useTranslations("programs");
  const isRtl = useLocale() === "ar";

  return (
    <HorizontalGallery rtl={isRtl} label={t("sectionTitle")}>
      {CURRICULA_KEYS.map((key, i) => (
        <Link
          key={key}
          href="/programs"
          className="group block w-[78vw] shrink-0 snap-start sm:w-[320px]"
        >
          <div className="relative overflow-hidden rounded-[28px]">
            <BrandImage
              alt=""
              variant={VARIANTS[i % VARIANTS.length]}
              rounded="rounded-[28px]"
              className="aspect-[4/5] w-full transition-transform duration-[700ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              sizes="(min-width: 640px) 320px, 78vw"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-4"
            >
              <span
                className={`block w-full text-center font-bold leading-[0.95] tracking-[-0.03em] text-white/95 transition-transform duration-[700ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-1 ${
                  BIG_TEXT_SIZE[key] ?? "text-5xl"
                }`}
              >
                {t(`${key}.name`)}
              </span>
            </span>
            {/* A gold hairline that draws across the tile's foot on hover —
             *  the "offering" accent, revealed by intent. */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 z-[3] h-[3px] origin-[left] scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 rtl:origin-[right]"
            />
          </div>

          <span className="t-micro mt-6 block text-gold-ink">{t(`${key}.kicker`)}</span>
          <h3 className="t-h3 mt-2 text-navy">{t(`${key}.name`)}</h3>
          <p className="t-body mt-2 text-[15px] text-navy/70">{t(`${key}.shortDesc`)}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-ink">
            {t("learnMore")}
            <ArrowRight
              className={`h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
              }`}
            />
          </span>
        </Link>
      ))}
    </HorizontalGallery>
  );
}

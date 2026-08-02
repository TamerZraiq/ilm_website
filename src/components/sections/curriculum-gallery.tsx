"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HorizontalGallery } from "@/components/motion/horizontal-gallery";
import { RevealImage } from "@/components/motion/motion";
import { BrandImage } from "@/components/ui/brand-image";
import { CURRICULA_KEYS } from "@/lib/curricula";

/** Cycles through BrandImage's branded gradient placeholder tiles — no
 *  stock photography, on-brand navy/gold, no per-curriculum photo needed. */
const VARIANTS = [1, 2, 3, 4, 5, 6] as const;

export function CurriculumGallery() {
  const t = useTranslations("programs");
  const isRtl = useLocale() === "ar";

  return (
    <HorizontalGallery rtl={isRtl}>
      {CURRICULA_KEYS.map((key, i) => (
        <Link
          key={key}
          href="/programs"
          className="group block w-[78vw] shrink-0 sm:w-[320px]"
        >
          <RevealImage className="overflow-hidden rounded-2xl">
            <BrandImage
              alt={t(`${key}.name`)}
              variant={VARIANTS[i % VARIANTS.length]}
              className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 640px) 320px, 78vw"
            />
          </RevealImage>
          <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[2px] text-gold">
            {t(`${key}.kicker`)}
          </span>
          <h3 className="mt-1.5 text-xl font-semibold text-navy">{t(`${key}.name`)}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy/70">
            {t(`${key}.shortDesc`)}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold">
            {t("learnMore")}
            <ArrowRight
              className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
            />
          </span>
        </Link>
      ))}
    </HorizontalGallery>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

/** Opt-in, non-blocking — a native <video> with controls the visitor
 *  chooses to play. No autoplay, no scroll-hijacking: people skimming
 *  the page scroll straight past it, people who want more can watch. */
export function BrandStoryVideo() {
  const locale = useLocale();
  const t = useTranslations("about");
  const src = locale === "ar" ? "/videos/brand-story-ar.mp4" : "/videos/brand-story-en.mp4";
  const poster = locale === "ar" ? "/videos/brand-story-ar-poster.jpg" : "/videos/brand-story-en-poster.jpg";

  return (
    <section className="bg-warm px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy sm:text-[2.75rem]">
            {t("videoHeading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-navy/70">{t("videoIntro")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <video
            controls
            preload="none"
            poster={poster}
            className="mt-10 aspect-video w-full rounded-2xl border border-navy/10 bg-navy-dark object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        </Reveal>
      </div>
    </section>
  );
}

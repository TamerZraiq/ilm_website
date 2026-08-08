"use client";

import { useLocale, useTranslations } from "next-intl";
import { Reveal, ScrollScale } from "@/components/motion/motion";

/** Opt-in, non-blocking — a native <video> with controls the visitor chooses
 *  to play. No autoplay, no scroll-hijacking: people skimming the page scroll
 *  straight past it, people who want more can watch.
 *
 *  Set on the page's one dark ground so the clip reads as a screening rather
 *  than an embed sitting in a document. */
export function BrandStoryVideo() {
  const locale = useLocale();
  const t = useTranslations("about");
  const src = locale === "ar" ? "/videos/brand-story-ar.mp4" : "/videos/brand-story-en.mp4";
  const poster =
    locale === "ar" ? "/videos/brand-story-ar-poster.jpg" : "/videos/brand-story-en-poster.jpg";

  return (
    <section className="grain on-dark section-tight relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.5) 0%, transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <h2 className="t-h2 mx-auto max-w-[18ch] text-white text-balance">
            {t("videoHeading")}
          </h2>
          <p className="t-body mx-auto mt-5 max-w-[46ch] text-white/70 text-pretty">
            {t("videoIntro")}
          </p>
        </Reveal>

        <ScrollScale from={0.94} className="mt-14">
          <video
            controls
            preload="none"
            poster={poster}
            className="aspect-video w-full rounded-[28px] border border-white/10 bg-navy-dark object-cover shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          >
            <source src={src} type="video/mp4" />
          </video>
        </ScrollScale>
      </div>
    </section>
  );
}

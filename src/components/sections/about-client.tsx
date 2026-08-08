"use client";

import { useTranslations } from "next-intl";
import { Reveal, ScrollScale, Stagger, StaggerItem } from "@/components/motion/motion";
import { ButtonRoute } from "@/components/ui/button";
import { FamilyMosaic } from "@/components/sections/family-mosaic";
import { BrandStoryVideo } from "@/components/sections/brand-story-video";

const FAMILY_REEL = "/images/ILC/reel-1.mp4";
const FAMILY_MOSAIC = [
  { src: "/images/ILC/family-group.jpg", altKey: "about.altFamily" },
  { src: "/images/ILC/class-smiles.jpg", altKey: "feature.altClass" },
  { src: "/images/ILC/welcome.jpg", altKey: "feature.altWelcome" },
  { src: "/images/ILC/peer-study.jpg", altKey: "about.altPeer" },
] as const;

const VALUES = ["excellence", "personalisation", "community"] as const;

export function AboutClient() {
  const t = useTranslations("about");

  return (
    <>
      {/* ── Story: the brand's own word, set as the ground it's told on ── */}
      <section className="section relative overflow-hidden bg-warm">
        {/* علم — "knowledge". The name is the thesis, so it's the artwork. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-[0.1em] select-none text-navy/[0.05]"
          style={{
            insetInlineEnd: "-0.06em",
            fontFamily: "var(--font-tajawal), serif",
            fontSize: "clamp(9rem, 26vw, 24rem)",
            lineHeight: 0.8,
          }}
        >
          علم
        </span>

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <h1 className="t-display max-w-[13ch] text-navy text-balance">{t("pageTitle")}</h1>
          </Reveal>

          <div className="mt-14 grid gap-x-14 gap-y-8 md:grid-cols-12">
            <Reveal delay={0.08} className="md:col-span-7">
              {/* The opening paragraph is the lead — it gets lead sizing and
               *  the column width, not the same body treatment as the rest. */}
              <p className="t-lead text-navy/80 text-pretty">{t("story1")}</p>
            </Reveal>
            <Reveal delay={0.16} className="md:col-span-5 md:pt-2">
              <p className="t-body text-navy/70 text-pretty">{t("story2")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <BrandStoryVideo />

      {/* ── Values: three columns, no cards, staggered off each other's
           baseline so the row reads as composed rather than tabulated ── */}
      <section className="section-loose relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="t-h2 max-w-[16ch] text-navy text-balance">{t("valuesTitle")}</h2>
          </Reveal>

          <Stagger className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10" stagger={0.11}>
            {VALUES.map((key, i) => (
              <StaggerItem
                key={key}
                anticipate
                className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-8" : undefined}
              >
                <span aria-hidden className="t-mega block text-[4rem] leading-none text-gold/25 sm:text-[5rem]">
                  {`0${i + 1}`}
                </span>
                <h3 className="t-h3 mt-6 text-navy">{t(`${key}.title`)}</h3>
                <div className="mt-5 h-px w-10 bg-gold" />
                <p className="t-body mt-5 text-navy/70 text-pretty">{t(`${key}.desc`)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Family: heading contained, media bleeding wider than it ── */}
      <section className="section relative overflow-hidden bg-warm-deep">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-x-10 gap-y-6 md:grid-cols-12 md:items-start">
            <Reveal className="md:col-span-7">
              <h2 className="t-h2 text-navy text-balance">{t("familyTitle")}</h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="t-body text-navy/70 text-pretty">{t("familyBody")}</p>
            </Reveal>
          </div>
        </div>

        <ScrollScale className="mx-auto mt-14 max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <FamilyMosaic video={FAMILY_REEL} photos={FAMILY_MOSAIC} badgeKey="about.familyBadge" />
        </ScrollScale>

        <div className="mx-auto max-w-6xl px-6">
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-start">
              <p className="t-lead max-w-[38ch] text-navy/75 text-pretty">{t("familyNote")}</p>
              <ButtonRoute href="/contact" variant="navy" size="lg" className="shrink-0">
                {t("familyJoin")}
              </ButtonRoute>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

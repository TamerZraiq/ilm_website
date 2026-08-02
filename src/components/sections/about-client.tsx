"use client";

import { Award, User, Users, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { FamilyMosaic } from "@/components/sections/family-mosaic";

const FAMILY_REEL = "/images/ILC/reel-1.mp4";
const FAMILY_MOSAIC = [
  { src: "/images/ILC/family-group.jpg", altKey: "about.altFamily" },
  { src: "/images/ILC/class-smiles.jpg", altKey: "feature.altClass" },
  { src: "/images/ILC/welcome.jpg", altKey: "feature.altWelcome" },
  { src: "/images/ILC/peer-study.jpg", altKey: "about.altPeer" },
] as const;

interface AboutTranslations {
  pageTitle: string;
  story1: string;
  story2: string;
  valuesTitle: string;
  excellenceTitle: string;
  excellenceDesc: string;
  personalisationTitle: string;
  personalisationDesc: string;
  communityTitle: string;
  communityDesc: string;
  familyTitle: string;
  familyBody: string;
  familyNote: string;
  familyJoin: string;
}

export function AboutClient({ translations: t }: { translations: AboutTranslations }) {
  const isRtl = useLocale() === "ar";
  return (
    <>
      {/* STORY — editorial, left-aligned */}
      <section className="bg-warm px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              {t.pageTitle}
            </h1>
          </Reveal>
          <div className="mt-10 max-w-2xl">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-navy/70">{t.story1}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-navy/70">{t.story2}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES — white cards */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-navy">
              {t.valuesTitle}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: <Award className="h-6 w-6 text-gold" />, tf: t.excellenceTitle, df: t.excellenceDesc },
              { icon: <User className="h-6 w-6 text-gold" />, tf: t.personalisationTitle, df: t.personalisationDesc },
              { icon: <Users className="h-6 w-6 text-gold" />, tf: t.communityTitle, df: t.communityDesc },
            ].map((v, i) => (
              <Reveal key={v.tf} delay={i * 0.1}>
                <div className="rounded-xl border border-navy/[0.06] bg-white p-8 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy">{v.tf}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/70">{v.df}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY — this is the community you're joining */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-x-10 gap-y-6 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <h2 className="text-3xl font-bold leading-[1.08] tracking-tight text-navy sm:text-[2.75rem]">
                {t.familyTitle}
              </h2>
              <div className="mt-5 h-[2px] w-12 bg-gold" />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="text-[15px] leading-[1.75] text-navy/70">{t.familyBody}</p>
            </Reveal>
          </div>

          <FamilyMosaic video={FAMILY_REEL} photos={FAMILY_MOSAIC} />

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-start">
              <p className="max-w-[42ch] text-[15px] leading-[1.7] text-navy/70">
                {t.familyNote}
              </p>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-dark hover:shadow-[0_4px_20px_rgba(26,43,107,0.25)]"
              >
                {t.familyJoin}
                <ArrowRight className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

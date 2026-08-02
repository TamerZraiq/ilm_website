"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { SubjectsGallery } from "@/components/sections/subjects-gallery";
import { CORE_CURRICULA, TEST_PREP_CURRICULA } from "@/lib/curricula";

interface ProgramsTranslations {
  pageTitle: string;
  pageIntro: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

export function ProgramsClient({ translations: t }: { translations: ProgramsTranslations }) {
  const tp = useTranslations("programs");

  return (
    <>
      {/* Header */}
      <section className="bg-warm px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              {t.pageTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-lg text-navy/70">{t.pageIntro}</p>
          </Reveal>
        </div>
      </section>

      {/* Core curricula — full detail */}
      {CORE_CURRICULA.map((key, i) => (
        <section key={key} className={`px-6 py-16 ${i % 2 === 0 ? "bg-white" : "bg-warm"}`}>
          <div className="mx-auto max-w-5xl">
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-gold">
              {tp(`${key}.kicker`)}
            </span>
            <h2 className="mb-1 mt-1.5 text-2xl font-bold text-navy">
              {tp(`${key}.name`)}
            </h2>
            <div className="mb-6 h-[2px] w-10 bg-gold" />
            <p className="max-w-2xl text-navy/70">{tp(`${key}.longDesc`)}</p>
          </div>
        </section>
      ))}

      {/* Test prep & ongoing support — lighter cards */}
      <section className="bg-warm px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-navy">
              {tp("moreHeading")}
            </h2>
            <p className="mt-2 max-w-xl text-navy/70">{tp("moreText")}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEST_PREP_CURRICULA.map((key, i) => (
              <Reveal key={key} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-navy/[0.06] bg-white p-6 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-[2px] text-gold">
                    {tp(`${key}.kicker`)}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-navy">{tp(`${key}.name`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {tp(`${key}.shortDesc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects — a different axis from curricula: what's taught, not which exam board */}
      <section className="bg-white py-20">
        <div className="mx-auto mb-10 max-w-6xl px-6 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-navy text-balance sm:text-[2.75rem]">
              {tp("subjects.heading")}
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-gold" />
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-navy/70">
              {tp("subjects.tagline")}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <SubjectsGallery />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-warm px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-gold/20 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-navy">{t.ctaHeading}</h2>
            <p className="mt-3 text-navy/70">{t.ctaText}</p>
            <Link href="/contact" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-dark">
              {t.ctaButton}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

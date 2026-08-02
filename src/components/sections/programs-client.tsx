"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";

interface ProgramsTranslations {
  pageTitle: string;
  pageIntro: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

const PROGRAM_KEYS = ["gcse", "alevel", "ib", "tawjihi"] as const;

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

      {/* Programs */}
      {PROGRAM_KEYS.map((key, i) => (
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

"use client";

import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { InlineText } from "@/components/cms/inline-text";
import { ProgramEditor } from "@/components/cms/program-editor";
import type { Database } from "@/types/database.types";

type Program = Database["public"]["Tables"]["programs"]["Row"];

interface ProgramsTranslations {
  pageTitle: string;
  pageIntro: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

export function ProgramsClient({ programs, translations: t }: { programs: Program[]; translations: ProgramsTranslations }) {
  return (
    <>
      {/* Header */}
      <section className="bg-warm px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              <InlineText contentKey="programs.pageTitle" fallback={t.pageTitle} />
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-lg text-navy/60">
              <InlineText contentKey="programs.pageIntro" fallback={t.pageIntro} multiline />
            </p>
          </Reveal>
        </div>
      </section>

      {/* Dynamic programs */}
      <ProgramEditor programs={programs} />

      {/* CTA */}
      <section className="bg-warm px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-gold/20 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-navy">
              <InlineText contentKey="programs.ctaHeading" fallback={t.ctaHeading} />
            </h2>
            <p className="mt-3 text-navy/50">
              <InlineText contentKey="programs.ctaText" fallback={t.ctaText} />
            </p>
            <Link href="/contact" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-dark">
              <InlineText contentKey="programs.ctaButton" fallback={t.ctaButton} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

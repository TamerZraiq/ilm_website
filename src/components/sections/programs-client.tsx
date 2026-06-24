"use client";

import { Link } from "@/i18n/navigation";
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
      <section className="bg-navy px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <InlineText contentKey="programs.pageTitle" fallback={t.pageTitle} as="h1" className="text-4xl font-bold text-white" />
          <InlineText contentKey="programs.pageIntro" fallback={t.pageIntro} as="p" className="mx-auto mt-4 max-w-2xl text-lg text-white/70" multiline />
        </div>
      </section>

      <ProgramEditor programs={programs} />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <InlineText contentKey="programs.ctaHeading" fallback={t.ctaHeading} as="h2" className="text-2xl font-bold text-navy" />
          <InlineText contentKey="programs.ctaText" fallback={t.ctaText} as="p" className="mt-3 text-gray-600" />
          <Link href="/contact" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-light">
            <InlineText contentKey="programs.ctaButton" fallback={t.ctaButton} />
          </Link>
        </div>
      </section>
    </>
  );
}

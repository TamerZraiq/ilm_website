"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { SubjectsGallery, SUBJECT_KEYS } from "@/components/sections/subjects-gallery";
import { CURRICULA_KEYS } from "@/lib/curricula";
import { CURRICULUM_ALIASES, SUBJECT_ALIASES } from "@/lib/search-aliases";

interface ProgramsTranslations {
  pageTitle: string;
  pageIntro: string;
  gradeRange: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

/** Lowercases, trims, and folds Arabic orthographic variants that people
 *  type inconsistently (hamza forms, taa marbuta, alef maksura, diacritics)
 *  down to one canonical form, so "إنجليزي"/"انجليزي"/"إنكليزي" etc. all
 *  compare equal instead of silently failing to match each other. */
function normalize(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[ً-ْٰـ]/g, "") // strip Arabic diacritics/tatweel
    .replace(/[إأآا]/g, "ا") // fold hamza/alef forms (إأآا) to bare alef (ا)
    .replace(/ة/g, "ه") // taa marbuta (ة) -> haa (ه)
    .replace(/ى/g, "ي") // alef maksura (ى) -> yaa (ي)
    .replace(/\s+/g, " ");
}

export function ProgramsClient({ translations: t }: { translations: ProgramsTranslations }) {
  const tp = useTranslations("programs");
  const [query, setQuery] = useState("");

  const words = useMemo(() => normalize(query).split(/\s+/).filter(Boolean), [query]);
  const hasQuery = words.length > 0;

  const subjectResults = useMemo(() => {
    if (!hasQuery) return SUBJECT_KEYS;
    return SUBJECT_KEYS.filter((key) => {
      const haystack = normalize([tp(`subjects.${key}`), ...SUBJECT_ALIASES[key]].join(" "));
      return words.some((w) => haystack.includes(w));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQuery, words]);

  // "School Curriculum" exists precisely to cover any subject at any grade
  // that isn't tied to a specific exam board — its own copy doesn't name
  // every subject, so a plain text search for e.g. "math" would otherwise
  // miss it entirely. Whenever the query matches a real subject, surface
  // it as a relevant match even if its own description didn't say "math".
  const subjectQueryMatched = hasQuery && subjectResults.length > 0;

  const curriculaResults = useMemo(() => {
    if (!hasQuery) return CURRICULA_KEYS;
    return CURRICULA_KEYS.filter((key) => {
      if (key === "schoolCurriculum" && subjectQueryMatched) return true;
      const haystack = normalize(
        [
          tp(`${key}.name`),
          tp(`${key}.kicker`),
          tp(`${key}.shortDesc`),
          tp(`${key}.longDesc`),
          ...CURRICULUM_ALIASES[key],
        ].join(" ")
      );
      return words.some((w) => haystack.includes(w));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQuery, words, subjectQueryMatched]);

  const noResults = hasQuery && curriculaResults.length === 0 && subjectResults.length === 0;

  return (
    <>
      {/* Header + search */}
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
          <Reveal delay={0.15}>
            <p className="mt-3 max-w-2xl text-lg font-semibold text-navy">{t.gradeRange}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mt-8 max-w-xl">
              <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tp("searchPlaceholder")}
                className="w-full rounded-lg border border-navy/15 bg-white py-3.5 ps-11 pe-4 text-sm text-navy shadow-sm transition-colors placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Curricula — one unified, searchable grid in priority order */}
      {curriculaResults.length > 0 && (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {curriculaResults.map((key) => (
                <Reveal key={key}>
                  <div className="h-full rounded-xl border border-navy/[0.06] bg-white p-8 shadow-sm">
                    <span className="text-[11px] font-semibold uppercase tracking-[2px] text-gold">
                      {tp(`${key}.kicker`)}
                    </span>
                    <h2 className="mt-1.5 text-lg font-bold text-navy">{tp(`${key}.name`)}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-navy/70">
                      {tp(`${key}.shortDesc`)}
                    </p>
                    <details className="group mt-3">
                      <summary className="cursor-pointer list-none text-[13px] font-semibold text-gold">
                        {tp("learnMore")}
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-navy/70">
                        {tp(`${key}.longDesc`)}
                      </p>
                    </details>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subjects — a different axis from curricula: what's taught, not which exam board */}
      {subjectResults.length > 0 && (
        <section className="bg-warm py-20">
          <div className="mx-auto mb-14 max-w-6xl px-6 text-center">
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
            <SubjectsGallery keys={subjectResults} />
          </Reveal>
        </section>
      )}

      {noResults && (
        <section className="bg-warm px-6 py-20">
          <Reveal>
            <div className="mx-auto max-w-xl rounded-2xl border border-gold/[0.2] bg-white p-10 text-center shadow-[0_0_40px_rgba(201,168,76,0.08)]">
              <h2 className="text-xl font-bold tracking-tight text-navy">{tp("noResultsHeading")}</h2>
              <p className="mt-3 text-navy/70">{tp("noResultsText")}</p>
              <a
                href="#contact-cta"
                className="mt-6 inline-flex h-11 items-center rounded-lg bg-gold px-6 text-sm font-semibold text-navy transition-all hover:scale-[1.03] hover:bg-gold-dark active:scale-[0.97] active:duration-100"
              >
                {t.ctaButton}
              </a>
            </div>
          </Reveal>
        </section>
      )}

      {/* CTA */}
      <section id="contact-cta" className="bg-warm px-6 py-24 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-gold/[0.2] bg-white p-10 text-center shadow-[0_0_40px_rgba(201,168,76,0.08)] lg:p-14">
            <h2 className="text-2xl font-bold tracking-tight text-navy">{t.ctaHeading}</h2>
            <p className="mt-3 text-navy/70">{t.ctaText}</p>
            <Link href="/contact" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-all hover:scale-[1.03] hover:bg-gold-dark active:scale-[0.97] active:duration-100">
              {t.ctaButton}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

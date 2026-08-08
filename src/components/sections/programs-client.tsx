"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Search, SearchX } from "lucide-react";
import { Reveal, RevealOnLoad, Stagger, StaggerItem } from "@/components/motion/motion";
import { ButtonLink, ButtonRoute } from "@/components/ui/button";
import { SubjectsGallery, SUBJECT_KEYS } from "@/components/sections/subjects-gallery";
import { CURRICULA_KEYS } from "@/lib/curricula";
import { CURRICULUM_ALIASES, SUBJECT_ALIASES } from "@/lib/search-aliases";
import { matches, queryWords } from "@/lib/search";
import { whatsappUrl } from "@/lib/site";

export function ProgramsClient() {
  const t = useTranslations("programs");
  const tRoot = useTranslations();
  const [query, setQuery] = useState("");

  const words = useMemo(() => queryWords(query), [query]);
  const hasQuery = words.length > 0;

  const subjectResults = useMemo(() => {
    if (!hasQuery) return SUBJECT_KEYS;
    return SUBJECT_KEYS.filter((key) =>
      matches([t(`subjects.${key}`), ...SUBJECT_ALIASES[key]].join(" "), words)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQuery, words]);

  // "School Curriculum" exists precisely to cover any subject at any grade
  // that isn't tied to a specific exam board — its own copy doesn't name
  // every subject, so a plain text search for e.g. "math" would otherwise
  // miss it entirely. Whenever the query matches a real subject, surface it
  // as a relevant match even if its own description didn't say "math".
  const subjectQueryMatched = hasQuery && subjectResults.length > 0;

  const curriculaResults = useMemo(() => {
    if (!hasQuery) return CURRICULA_KEYS;
    return CURRICULA_KEYS.filter((key) => {
      if (key === "schoolCurriculum" && subjectQueryMatched) return true;
      return matches(
        [
          t(`${key}.name`),
          t(`${key}.kicker`),
          t(`${key}.shortDesc`),
          t(`${key}.longDesc`),
          ...CURRICULUM_ALIASES[key],
        ].join(" "),
        words
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQuery, words, subjectQueryMatched]);

  const noResults = hasQuery && curriculaResults.length === 0 && subjectResults.length === 0;
  const noResultsRef = useRef<HTMLDivElement>(null);

  // When a query narrows every result away, the curricula grid and subjects
  // row (often 1000px+ of content together) both disappear at once. If the
  // visitor had scrolled down to browse results, their scroll position
  // doesn't move with that collapse — they're left looking at whatever now
  // sits at their old scroll offset, which is frequently blank space below
  // the empty-state card rather than the card itself. Bringing it into view
  // on the exact transition into "no results" (not on every keystroke while
  // still in that state) means the status is never something you have to
  // go hunting for.
  useEffect(() => {
    if (noResults) noResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [noResults]);

  return (
    <>
      {/* ── Header: display type over a watermark of itself ── */}
      <section className="section relative overflow-hidden bg-warm">
        <div className="relative mx-auto max-w-6xl px-6">
          <span
            aria-hidden
            className="t-mega pointer-events-none absolute -top-4 select-none whitespace-nowrap text-navy/[0.04] lg:-top-10"
            style={{ insetInlineEnd: 0 }}
          >
            {t("pageTitle")}
          </span>

          <Reveal>
            <h1 className="t-display relative max-w-[14ch] text-navy text-balance">
              {t("pageTitle")}
            </h1>
          </Reveal>

          <Stagger className="relative mt-8 max-w-2xl" stagger={0.08}>
            <StaggerItem>
              <p className="t-lead text-navy/70 text-pretty">{t("pageIntro")}</p>
            </StaggerItem>
            <StaggerItem>
              <p className="t-lead mt-5 font-semibold text-navy text-pretty">
                {t("gradeRange")}
              </p>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.16}>
            <div className="relative mt-12 max-w-xl">
              <Search
                aria-hidden
                className="pointer-events-none absolute start-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy/60"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
                className="w-full rounded-[14px] border border-navy/12 bg-white py-4 ps-14 pe-5 text-[15px] text-navy shadow-[var(--shadow-ambient)] transition-[border-color,box-shadow] duration-300 placeholder:text-navy/55 hover:border-navy/25 focus:border-gold focus:shadow-[0_0_0_4px_rgba(201,168,76,0.16)] focus:outline-none"
              />
            </div>
            {/* Result count is announced politely so keyboard and screen-reader
             *  users learn the list changed without the focus moving. */}
            <p aria-live="polite" className="sr-only">
              {hasQuery
                ? t("resultCount", {
                    count: curriculaResults.length + subjectResults.length,
                  })
                : ""}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Curricula: twelve parallel tracks genuinely is a directory, so
           cards are the right container here — but they lift, and the first
           one takes a double-width feature slot when nothing is filtered.
           Each card animates on its own mount (`RevealOnLoad`), not on a
           shared scroll-into-view trigger (`Stagger`) — this grid's contents
           come and go by typing, not by scrolling, and a scroll-triggered
           parent only ever fires once. A card removed by a search and then
           brought back by clearing it is a fresh mount with nothing left to
           trigger it, so it would stay invisible forever: exactly the bug
           where narrowing to "ib" and then clearing it left every card
           except IB/TOEFL blank. Mount-triggered fires correctly every
           time, no matter why the card exists again. ── */}
      {curriculaResults.length > 0 && (
        <section className="section-tight bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {curriculaResults.map((key, i) => (
                <RevealOnLoad
                  key={key}
                  y={16}
                  delay={Math.min(i, 8) * 0.035}
                  className={!hasQuery && i === 0 ? "sm:col-span-2" : undefined}
                >
                  <article className="group flex h-full flex-col rounded-[20px] border border-navy/[0.08] bg-white p-8 shadow-[var(--shadow-ambient)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-gold/35 hover:shadow-[var(--shadow-lift)]">
                    <span className="t-micro text-gold-ink">{t(`${key}.kicker`)}</span>
                    <h2 className="t-h3 mt-2 text-navy">{t(`${key}.name`)}</h2>
                    <p className="t-body mt-3 text-[15px] text-navy/70 text-pretty">
                      {t(`${key}.shortDesc`)}
                    </p>
                    <details className="group/d mt-auto pt-5">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[13px] font-semibold text-gold-ink [&::-webkit-details-marker]:hidden">
                        {t("learnMore")}
                        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-open/d:rotate-180" />
                      </summary>
                      <p className="t-body mt-3 text-[15px] leading-relaxed text-navy/70">
                        {t(`${key}.longDesc`)}
                      </p>
                    </details>
                  </article>
                </RevealOnLoad>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Subjects: a different axis from curricula, so a different shape.
           Same reasoning as above — this section itself mounts and unmounts
           as the query changes (it disappears entirely when a search
           matches no subjects), so its reveal has to be mount-triggered
           too; a scroll-triggered one only ever fires the first time it
           happens to exist. ── */}
      {subjectResults.length > 0 && (
        <section className="section-tight overflow-hidden bg-warm-deep">
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnLoad>
              {/* Each child gets its own max-w — a wrapper-level cap here
               *  would resolve `ch` against the wrapper's inherited body
               *  size, not each child's actual (larger, and different)
               *  font-size. See the identical fix in HowItWorks above. */}
              <h2 className="t-h2 max-w-[20ch] text-navy text-balance">{t("subjects.heading")}</h2>
              <p className="t-body mt-5 max-w-[46ch] text-navy/70 text-pretty">{t("subjects.tagline")}</p>
            </RevealOnLoad>
          </div>
          <RevealOnLoad delay={0.1} className="mt-12">
            <SubjectsGallery keys={subjectResults} />
          </RevealOnLoad>
        </section>
      )}

      {noResults && (
        <section ref={noResultsRef} className="section-tight scroll-mt-24 bg-white px-6">
          {/* Mount-triggered, not scroll-triggered: this card only exists in
           *  the DOM once there's nothing to show, and a visitor needs to
           *  see it the instant it appears — it can't wait on a scroll-into-
           *  view intersection the way a normal below-the-fold section can. */}
          <RevealOnLoad>
            <div className="mx-auto max-w-xl rounded-[20px] border border-gold/25 bg-warm p-10 text-center shadow-[var(--shadow-ambient)]">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold-ink">
                <SearchX aria-hidden className="h-6 w-6" />
              </span>
              <h2 className="t-h3 mt-5 text-navy">{t("noResultsHeading")}</h2>
              <p className="t-body mt-3 text-navy/70 text-pretty">{t("noResultsText")}</p>
              <div className="mt-8 flex justify-center">
                <ButtonLink
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  {t("ctaButton")}
                </ButtonLink>
              </div>
            </div>
          </RevealOnLoad>
        </section>
      )}

      {/* ── Close on the dark finale, matching the home page's ending ── */}
      <section className="grain on-dark section relative overflow-hidden bg-navy-deep text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle at 50% 120%, rgba(201,168,76,0.55) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="t-h2 mx-auto max-w-[18ch] text-white text-balance">
              {t("ctaHeading")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead mx-auto mt-5 max-w-[42ch] text-white/70 text-pretty">
              {t("ctaText")}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                {tRoot("contact.whatsapp")}
              </ButtonLink>
              <ButtonRoute href="/contact" variant="onDark" size="lg">
                {t("ctaButton")}
              </ButtonRoute>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

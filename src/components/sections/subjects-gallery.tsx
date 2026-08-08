"use client";

import { useTranslations } from "next-intl";

export const SUBJECT_KEYS = [
  "math",
  "physics",
  "chemistry",
  "biology",
  "science",
  "arabic",
  "english",
  "history",
  "socialStudies",
  "economics",
  "businessStudies",
  "ict",
  "religion",
] as const;

/** Lighter than CurriculumGallery on purpose — subjects are just names, no
 *  per-subject page or description, so a scrollable pill row rather than full
 *  cards. Pass `keys` to show a filtered subset (e.g. search results).
 *
 *  Fades at both edges so the row reads as continuing past the viewport
 *  rather than being clipped by it. */
export function SubjectsGallery({
  keys = SUBJECT_KEYS,
}: {
  keys?: readonly (typeof SUBJECT_KEYS)[number][];
}) {
  const t = useTranslations("programs.subjects");

  return (
    // A symmetric edge mask reads the same in LTR and RTL, unlike a
    // directional gradient overlay, and needs no extra element.
    <div
      className="overflow-x-auto pb-3 [mask-image:linear-gradient(to_right,transparent,black_4rem,black_calc(100%-4rem),transparent)]"
      data-lenis-prevent
    >
      <div className="flex gap-3 px-6">
        {keys.map((key) => (
          <span
            key={key}
            className="shrink-0 rounded-full border border-navy/10 bg-white px-6 py-3 text-[15px] font-semibold text-navy shadow-[var(--shadow-ambient)]"
          >
            {t(key)}
          </span>
        ))}
      </div>
    </div>
  );
}

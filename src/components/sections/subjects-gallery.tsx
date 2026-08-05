"use client";

import { useTranslations } from "next-intl";

export const SUBJECT_KEYS = [
  "math",
  "physics",
  "chemistry",
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

/** Lighter than CurriculumGallery on purpose — subjects are just names,
 *  no per-subject page or description, so a scrollable pill row rather
 *  than full cards. Pass `keys` to show a filtered subset (e.g. search
 *  results); defaults to the full list. */
export function SubjectsGallery({
  keys = SUBJECT_KEYS,
}: {
  keys?: readonly (typeof SUBJECT_KEYS)[number][];
}) {
  const t = useTranslations("programs.subjects");

  return (
    <div className="overflow-x-auto pb-2" data-lenis-prevent>
      <div className="flex gap-3 px-6">
        {keys.map((key) => (
          <span
            key={key}
            className="shrink-0 rounded-full border border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm"
          >
            {t(key)}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";

const SUBJECT_KEYS = [
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
 *  than full cards. */
export function SubjectsGallery() {
  const t = useTranslations("programs.subjects");

  return (
    <div className="overflow-x-auto pb-2" data-lenis-prevent>
      <div className="flex gap-3 px-6">
        {SUBJECT_KEYS.map((key) => (
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

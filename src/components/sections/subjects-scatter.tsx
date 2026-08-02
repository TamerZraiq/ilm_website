"use client";

import { useTranslations } from "next-intl";
import { ScatteredTypography } from "@/components/sections/scattered-typography";

type SubjectKey =
  | "math"
  | "physics"
  | "chemistry"
  | "science"
  | "arabic"
  | "english"
  | "history"
  | "socialStudies"
  | "economics"
  | "businessStudies"
  | "ict"
  | "religion";

/** Positions cover all 12 subject keys — TypeScript errors above on a typo.
 *  Deliberately different arrangement from CurriculumScatter so the two
 *  sections don't feel like a repeat. */
const POSITIONS: { key: SubjectKey; top: string; left: string; size: string; rotate: string }[] = [
  { key: "math", top: "2%", left: "6%", size: "text-2xl md:text-3xl", rotate: "3deg" },
  { key: "english", top: "0%", left: "36%", size: "text-3xl md:text-4xl", rotate: "-2deg" },
  { key: "physics", top: "8%", left: "68%", size: "text-xl md:text-2xl", rotate: "4deg" },
  { key: "chemistry", top: "4%", left: "88%", size: "text-lg md:text-xl", rotate: "-4deg" },
  { key: "arabic", top: "22%", left: "18%", size: "text-2xl md:text-3xl", rotate: "-3deg" },
  { key: "science", top: "24%", left: "78%", size: "text-xl md:text-2xl", rotate: "3deg" },
  { key: "history", top: "70%", left: "4%", size: "text-xl md:text-2xl", rotate: "-3deg" },
  { key: "socialStudies", top: "68%", left: "30%", size: "text-lg md:text-xl", rotate: "4deg" },
  { key: "economics", top: "76%", left: "62%", size: "text-xl md:text-2xl", rotate: "-2deg" },
  { key: "businessStudies", top: "84%", left: "4%", size: "text-lg md:text-xl", rotate: "3deg" },
  { key: "ict", top: "88%", left: "40%", size: "text-2xl md:text-3xl", rotate: "-3deg" },
  { key: "religion", top: "88%", left: "76%", size: "text-xl md:text-2xl", rotate: "4deg" },
];

export function SubjectsScatter() {
  const t = useTranslations("programs.subjects");
  const items = POSITIONS.map((p) => ({ ...p, label: t(p.key) }));

  return <ScatteredTypography items={items} tagline={t("tagline")} />;
}

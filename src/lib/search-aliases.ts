/** Extra search terms per curriculum/subject, beyond the canonical translated
 *  name/description text. Real users search with alternate transliterations,
 *  regional spellings, abbreviations, or the "wrong" language for the page
 *  they're on — this file is the fix for all of that at once, rather than
 *  patching one missed query at a time. Not user-facing display text, so it
 *  lives here rather than in src/messages/*.json. Both Arabic and English
 *  terms are included in every list regardless of site locale, since a
 *  bilingual visitor may search in either script on either page. */

import type { CURRICULA_KEYS } from "./curricula";

type CurriculumKey = (typeof CURRICULA_KEYS)[number];

export const CURRICULUM_ALIASES: Record<CurriculumKey, string[]> = {
  schoolCurriculum: [
    "school",
    "coursework",
    "homework",
    "school curriculum",
    "مدرسة",
    "مدرسي",
    "منهج مدرسي",
    "واجبات",
    "واجب",
    "متابعة",
  ],
  ib: ["ib", "international baccalaureate", "bacc", "baccalaureate", "آي بي", "بكالوريا دولية", "بكالوريا", "دبلوم"],
  clep: ["clep", "كليب", "كليپ"],
  gcse: ["gcse", "igcse", "جي سي اس اي", "اي جي سي اس اي", "جي سي إس إي"],
  ap: ["ap", "advanced placement", "ايه بي", "اي بي", "متقدم"],
  sat: ["sat", "سات"],
  tawjihi: ["tawjihi", "tawjeehi", "توجيهي", "تنسيق", "ثانوية عامة", "ثانوية"],
  alevel: ["a level", "a-level", "alevel", "اي ليفل", "أ ليفل"],
  ielts: ["ielts", "ايلتس", "آيلتس"],
  toefl: ["toefl", "توفل"],
  gre: ["gre", "جي آر اي", "جي ار اي"],
  checkpoint: ["checkpoint", "تشيك بوينت", "ابتدائي", "اعدادي", "إعدادي"],
};

type SubjectKey =
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "science"
  | "arabic"
  | "english"
  | "history"
  | "socialStudies"
  | "economics"
  | "businessStudies"
  | "ict"
  | "religion";

export const SUBJECT_ALIASES: Record<SubjectKey, string[]> = {
  math: ["math", "maths", "mathematics", "رياضيات", "حساب", "جبر", "هندسة"],
  physics: ["physics", "فيزياء"],
  chemistry: ["chemistry", "كيمياء"],
  biology: ["biology", "bio", "احياء", "أحياء", "علم الأحياء"],
  science: ["science", "علوم"],
  arabic: ["arabic", "عربي", "لغة عربية"],
  english: ["english", "eng", "انجليزي", "إنجليزي", "انكليزي", "إنكليزي", "لغة انجليزية", "لغة إنجليزية"],
  history: ["history", "تاريخ"],
  socialStudies: ["social studies", "social", "اجتماعيات", "دراسات اجتماعية"],
  economics: ["economics", "econ", "اقتصاد"],
  businessStudies: ["business", "business studies", "اعمال", "أعمال", "ادارة اعمال", "إدارة أعمال", "تجارة"],
  ict: ["ict", "computer", "computer science", "حاسوب", "كمبيوتر", "تكنولوجيا", "حاسب"],
  religion: ["religion", "islamic studies", "دين", "تربية دينية", "اسلامية", "إسلامية"],
};

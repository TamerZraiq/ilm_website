/** Single source of truth for which curricula/exams the site lists, in
 *  display priority order. Keys must match objects under the `programs`
 *  namespace in src/messages/{en,ar}.json. Add here first when adding a
 *  new one. */
export const CURRICULA_KEYS = [
  "schoolCurriculum",
  "ib",
  "clep",
  "gcse",
  "ap",
  "sat",
  "tawjihi",
  "alevel",
  "ielts",
  "toefl",
  "gre",
  "checkpoint",
] as const;

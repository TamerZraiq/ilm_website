/** Single source of truth for which curricula/exams the site lists.
 *  Keys must match objects under the `programs` namespace in
 *  src/messages/{en,ar}.json. Add here first when adding a new one. */
export const CURRICULA_KEYS = [
  "gcse",
  "alevel",
  "ib",
  "tawjihi",
  "sat",
  "ielts",
  "ap",
  "clep",
  "schoolCurriculum",
] as const;

export const CORE_CURRICULA = ["gcse", "alevel", "ib", "tawjihi"] as const;
export const TEST_PREP_CURRICULA = ["sat", "ielts", "ap", "clep", "schoolCurriculum"] as const;

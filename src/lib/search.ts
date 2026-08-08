/**
 * Search text handling for the Programs page.
 *
 * Kept out of the component so it can be tested directly: this is the part
 * that has repeatedly been wrong in real use (Arabic spelling variance), and
 * a regression here silently tells a visitor "we don't teach that."
 */

/** Lowercases, trims, and folds Arabic orthographic variants that people type
 *  inconsistently (hamza forms, taa marbuta, alef maksura, diacritics) down to
 *  one canonical form, so "إنجليزي"/"انجليزي"/"انجليزى" all compare equal
 *  instead of silently failing to match each other.
 *
 *  Genuinely different transliterations — إنجليزي vs إنكليزي, ج vs ك — are a
 *  different problem and are handled by the alias lists in
 *  `search-aliases.ts`, not here. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[ً-ْٰـ]/g, "") // strip Arabic diacritics/tatweel
    .replace(/[إأآا]/g, "ا") // fold hamza/alef forms to bare alef
    .replace(/ة/g, "ه") // taa marbuta -> haa
    .replace(/[ىی]/g, "ي") // alef maksura and Farsi yeh -> Arabic yaa
    .replace(/ک/g, "ك") // Farsi keheh -> Arabic kaf
    .replace(/\s+/g, " ");
}

/** Splits a raw query into normalized search terms. */
export function queryWords(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

/** True when any term appears anywhere in the haystack.
 *
 *  Deliberately lenient (substring, any-term): for this audience an extra
 *  plausible result costs far less than a false "we don't teach that." */
export function matches(haystack: string, words: string[]): boolean {
  const hay = normalize(haystack);
  return words.some((w) => hay.includes(w));
}

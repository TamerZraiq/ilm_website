import { matches, normalize, queryWords } from "../search";
import { CURRICULUM_ALIASES, SUBJECT_ALIASES } from "../search-aliases";
import { CURRICULA_KEYS } from "../curricula";
import { SUBJECT_KEYS } from "@/components/sections/subjects-gallery";

describe("normalize", () => {
  it("folds every hamza/alef form to a bare alef", () => {
    const forms = ["إنجليزي", "أنجليزي", "آنجليزي", "انجليزي"];
    const folded = forms.map(normalize);
    expect(new Set(folded).size).toBe(1);
  });

  it("strips diacritics so a vocalised word matches its plain spelling", () => {
    expect(normalize("مُدَرِّس")).toBe(normalize("مدرس"));
  });

  it("folds taa marbuta to haa and alef maksura to yaa", () => {
    expect(normalize("رياضية")).toBe(normalize("رياضيه"));
    expect(normalize("علىم")).toBe(normalize("عليم"));
  });

  it("folds the Persian-keyboard lookalikes for yeh and kaf", () => {
    // Visually identical to the Arabic letters and produced by the Persian
    // layouts shipped on many Android keyboards in the region.
    expect(normalize("انگلیزی".replace("گ", "ك"))).toBe(normalize("انكليزي"));
    expect(normalize("کيمياء")).toBe(normalize("كيمياء"));
  });

  it("lowercases and collapses whitespace", () => {
    expect(normalize("  A-Level   Maths ")).toBe("a-level maths");
  });
});

describe("queryWords", () => {
  it("returns no terms for an empty or whitespace-only query", () => {
    expect(queryWords("")).toEqual([]);
    expect(queryWords("   ")).toEqual([]);
  });

  it("splits on whitespace after normalising", () => {
    expect(queryWords("IB  Diploma")).toEqual(["ib", "diploma"]);
  });
});

describe("matches", () => {
  it("matches when any single term appears", () => {
    expect(matches("Cambridge IGCSE and Edexcel", queryWords("edexcel"))).toBe(true);
  });

  it("matches across the orthographic folding, not just literally", () => {
    // Typed with a hamza; the haystack has none.
    expect(matches("انجليزي", queryWords("إنجليزي"))).toBe(true);
  });

  it("does not match unrelated text", () => {
    expect(matches("Tawjihi scientific branch", queryWords("chemistry"))).toBe(false);
  });
});

describe("search aliases", () => {
  // A missing alias entry would throw at render time when the component
  // spreads `ALIASES[key]` into the haystack.
  it("covers every curriculum key", () => {
    for (const key of CURRICULA_KEYS) {
      expect(Array.isArray(CURRICULUM_ALIASES[key])).toBe(true);
    }
  });

  it("covers every subject key", () => {
    for (const key of SUBJECT_KEYS) {
      expect(Array.isArray(SUBJECT_ALIASES[key])).toBe(true);
    }
  });

  it("finds English written in Arabic script with the ك transliteration", () => {
    // "انكليزي" uses a different consonant from "انجليزي" — normalisation
    // alone can never bridge it, which is exactly why the alias list exists.
    const haystack = ["English", ...SUBJECT_ALIASES.english].join(" ");
    expect(matches(haystack, queryWords("انكليزي"))).toBe(true);
    expect(matches(haystack, queryWords("انجليزي"))).toBe(true);
  });

  it("finds Tawjihi by its colloquial Palestinian name", () => {
    const haystack = ["Tawjihi", ...CURRICULUM_ALIASES.tawjihi].join(" ");
    expect(matches(haystack, queryWords("تنسيق"))).toBe(true);
  });
});

import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import { pageAlternates, pageOpenGraph } from "../site";

type Json = Record<string, unknown>;

function keyPaths(obj: Json, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    return v !== null && typeof v === "object" && !Array.isArray(v)
      ? keyPaths(v as Json, path)
      : [path];
  });
}

describe("message files", () => {
  // A key present in one locale but not the other renders a raw
  // MISSING_MESSAGE error in the UI for half the audience — and Arabic is
  // this site's primary locale, so the half that breaks is the important one.
  it("define exactly the same keys in both locales", () => {
    const enKeys = keyPaths(en as Json).sort();
    const arKeys = keyPaths(ar as Json).sort();
    expect(arKeys.filter((k) => !enKeys.includes(k))).toEqual([]);
    expect(enKeys.filter((k) => !arKeys.includes(k))).toEqual([]);
  });

  it("carry no empty strings", () => {
    for (const [locale, msgs] of [["en", en], ["ar", ar]] as const) {
      for (const path of keyPaths(msgs as Json)) {
        const value = path
          .split(".")
          .reduce<unknown>((acc, k) => (acc as Json)[k], msgs);
        expect(`${locale}:${path}=${String(value).trim()}`).not.toMatch(/=$/);
      }
    }
  });

  it("declare the right text direction", () => {
    expect(en.dir).toBe("ltr");
    expect(ar.dir).toBe("rtl");
  });
});

describe("locale-aware URLs", () => {
  // `localePrefix: "as-needed"` means Arabic (the default) is served with no
  // prefix. Getting this wrong pointed every page's canonical at the homepage
  // once already.
  it("serves the default locale without a prefix", () => {
    expect(pageAlternates("ar", "/about").canonical).toBe("/about");
    expect(pageAlternates("ar", "").canonical).toBe("/");
  });

  it("prefixes the non-default locale", () => {
    expect(pageAlternates("en", "/about").canonical).toBe("/en/about");
    expect(pageAlternates("en", "").canonical).toBe("/en");
  });

  it("emits both hreflang alternates plus x-default for every page", () => {
    expect(pageAlternates("en", "/programs").languages).toEqual({
      ar: "/programs",
      en: "/en/programs",
      // x-default must point at the default locale's unprefixed URL, not
      // the English one — Arabic is what an unmatched visitor should get.
      "x-default": "/programs",
    });
  });

  it("restates siteName and locale on every page's Open Graph object", () => {
    // Next replaces rather than merges `openGraph` per route segment, so a
    // page that omits these silently drops them from the root layout.
    const og = pageOpenGraph({
      locale: "ar",
      path: "/contact",
      title: "t",
      description: "d",
      siteName: "s",
    });
    expect(og).toMatchObject({
      siteName: "s",
      url: "/contact",
      locale: "ar_PS",
      type: "website",
    });
  });
});

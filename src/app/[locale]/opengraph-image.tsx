import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pre-render both locales' cards at build time instead of serving them from
 *  a function — link-preview crawlers (WhatsApp especially, which is this
 *  centre's main sharing channel) are impatient and often skip a slow or
 *  redirecting image URL entirely. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Satori ships no Arabic glyphs by default, so an Arabic card rendered with
 *  the default font comes out as empty boxes. Both faces are read from disk
 *  and handed in explicitly. */
async function loadFont(file: string) {
  return readFile(join(process.cwd(), "assets", "fonts", file));
}

const hasLatin = (s: string) => /[A-Za-z0-9]/.test(s);

/**
 * Satori shapes Arabic glyphs correctly but has no bidirectional reordering:
 * it lays words out in source order, left to right, so an Arabic sentence
 * comes out with its words backwards. Reversing the word order before
 * handing it over cancels that out — and keeps normal text spacing, which
 * per-word flex boxes do not.
 *
 * Only applied to pure-Arabic lines: a line containing Latin or digits
 * (e.g. "GCSE و IB") has no single correct reversal, so it renders as-is
 * rather than being made worse. Keep the strings this card uses free of
 * Latin tokens.
 */
function Line({
  text,
  rtl,
  style,
}: {
  text: string;
  rtl: boolean;
  style: React.CSSProperties;
}) {
  const display = rtl && !hasLatin(text) ? text.split(" ").reverse().join(" ") : text;
  return <div style={{ display: "flex", ...style }}>{display}</div>;
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const isRtl = locale === "ar";

  const [tajawal, jakarta] = await Promise.all([
    loadFont("Tajawal-Bold.ttf"),
    loadFont("PlusJakartaSans-Bold.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: isRtl ? "flex-end" : "flex-start",
          backgroundColor: "#0B1234",
          padding: "76px 88px",
          fontFamily: isRtl ? "Tajawal" : "Jakarta",
        }}
      >
        {/* Gold bloom, bottom-trailing — the same "offering" accent the site
            opens and closes on. */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            [isRtl ? "left" : "right"]: -180,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              "radial-gradient(circle, rgba(201,168,76,0.34) 0%, rgba(201,168,76,0) 68%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 44,
              height: 4,
              backgroundColor: "#C9A84C",
              marginRight: isRtl ? 0 : 18,
              marginLeft: isRtl ? 18 : 0,
            }}
          />
          <Line
            text={t("siteName")}
            rtl={isRtl}
            style={{
              fontSize: 22,
              letterSpacing: isRtl ? 0 : 4,
              color: "#D4B86A",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
        >
          {[tHero("title1"), tHero("title2")].map((line) => (
            <Line
              key={line}
              text={line}
              rtl={isRtl}
              style={{
                fontSize: isRtl ? 84 : 92,
                color: "#FFFFFF",
                lineHeight: isRtl ? 1.3 : 1.06,
                letterSpacing: isRtl ? 0 : -3,
              }}
            />
          ))}
          <Line
            text={tFooter("tagline")}
            rtl={isRtl}
            style={{
              marginTop: 32,
              fontSize: 27,
              color: "rgba(255,255,255,0.62)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Tajawal", data: tajawal, weight: 700, style: "normal" },
        { name: "Jakarta", data: jakarta, weight: 700, style: "normal" },
      ],
    }
  );
}

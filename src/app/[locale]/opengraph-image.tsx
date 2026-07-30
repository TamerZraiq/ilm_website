import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isRtl = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: isRtl ? "flex-end" : "flex-start",
          justifyContent: "center",
          backgroundColor: "#1A2B6B",
          padding: "80px",
          direction: isRtl ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "4px",
            backgroundColor: "#C9A84C",
            marginBottom: "36px",
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.15,
            maxWidth: "900px",
          }}
        >
          {t("siteName")}
        </div>
        <div
          style={{
            marginTop: "28px",
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
            maxWidth: "820px",
            lineHeight: 1.4,
          }}
        >
          {t("siteDescription")}
        </div>
      </div>
    ),
    { ...size }
  );
}

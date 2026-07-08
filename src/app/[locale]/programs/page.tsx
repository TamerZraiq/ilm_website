import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPublicPrograms } from "@/lib/content/public-queries";
import { ProgramsClient } from "@/components/sections/programs-client";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.programs" });
  return { title: t("title"), description: t("description") };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");
  const programs = await getPublicPrograms();

  return (
    <ProgramsClient
      programs={programs}
      translations={{
        pageTitle: t("pageTitle"),
        pageIntro: t("pageIntro"),
        ctaHeading: t("ctaHeading"),
        ctaText: t("ctaText"),
        ctaButton: t("ctaButton"),
      }}
    />
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPublicTeachers } from "@/lib/content/public-queries";
import { AboutClient } from "@/components/sections/about-client";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const teachers = await getPublicTeachers();

  return (
    <AboutClient
      teachers={teachers}
      translations={{
        pageTitle: t("pageTitle"),
        story1: t("story1"),
        story2: t("story2"),
        valuesTitle: t("valuesTitle"),
        excellenceTitle: t("excellence.title"),
        excellenceDesc: t("excellence.desc"),
        personalisationTitle: t("personalisation.title"),
        personalisationDesc: t("personalisation.desc"),
        communityTitle: t("community.title"),
        communityDesc: t("community.desc"),
        familyTitle: t("familyTitle"),
        familyBody: t("familyBody"),
        familyNote: t("familyNote"),
        familyJoin: t("familyJoin"),
        teamTitle: t("teamTitle"),
      }}
    />
  );
}

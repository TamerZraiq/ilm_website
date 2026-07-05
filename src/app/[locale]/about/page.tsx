import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { checkIsAdmin } from "@/lib/auth/admin";
import { getPublicTeachers } from "@/lib/content/public-queries";
import { AboutClient } from "@/components/sections/about-client";
import type { Database } from "@/types/database.types";

type Teacher = Database["public"]["Tables"]["teachers"]["Row"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description") };
}

async function getTeachers(): Promise<Teacher[]> {
  if (await checkIsAdmin()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("teachers")
      .select("*")
      .order("display_order");
    return data ?? [];
  }
  return getPublicTeachers();
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const teachers = await getTeachers();

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
        teamTitle: t("teamTitle"),
      }}
    />
  );
}

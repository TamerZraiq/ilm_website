import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { AboutClient } from "@/components/sections/about-client";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ilm Learning Center — Palestinian educators providing expert, personalised tutoring for GCSE, A-Level, IB, and Tawjihi students.",
};

export default async function AboutPage() {
  const t = await getTranslations("about");
  const supabase = await createClient();

  const { data: teachers } = await supabase
    .from("teachers")
    .select("*")
    .order("display_order");

  return (
    <AboutClient
      teachers={teachers ?? []}
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

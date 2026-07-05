import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { checkIsAdmin } from "@/lib/auth/admin";
import { getPublicPrograms } from "@/lib/content/public-queries";
import { ProgramsClient } from "@/components/sections/programs-client";
import type { Database } from "@/types/database.types";

type Program = Database["public"]["Tables"]["programs"]["Row"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.programs" });
  return { title: t("title"), description: t("description") };
}

async function getPrograms(): Promise<Program[]> {
  if (await checkIsAdmin()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("display_order");
    return data ?? [];
  }
  return getPublicPrograms();
}

export default async function ProgramsPage() {
  const t = await getTranslations("programs");
  const programs = await getPrograms();

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

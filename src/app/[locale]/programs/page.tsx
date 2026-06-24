import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { ProgramsClient } from "@/components/sections/programs-client";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Tutoring programs for GCSE, A-Level, IB Diploma, and Palestinian Tawjihi examinations. Subject specialists covering all major disciplines.",
};

export default async function ProgramsPage() {
  const t = await getTranslations("programs");
  const supabase = await createClient();

  const { data: programs, error } = await supabase
    .from("programs")
    .select("*")
    .order("display_order");

  console.log("[programs] fetched:", programs?.length, "error:", error?.message);

  return (
    <ProgramsClient
      programs={programs ?? []}
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

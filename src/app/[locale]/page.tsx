import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { HomeClient } from "@/components/sections/home-client";

export const metadata: Metadata = {
  title: "Expert Tutoring in Palestine",
  description:
    "Expert tutoring for GCSE, A-Level, IB, and Tawjihi students. Personalised sessions built around each student's goals.",
};

export default async function HomePage() {
  const t = await getTranslations();
  const supabase = await createClient();

  const { data: plans } = await supabase
    .from("subscription_plans")
    .select("*")
    .order("display_order");

  return (
    <HomeClient
      plans={plans ?? []}
      translations={{
        heroLabel: t("hero.label"),
        heroHeadline: t("hero.headline"),
        heroSubheadline: t("hero.subheadline"),
        heroCtaPrimary: t("hero.ctaPrimary"),
        heroCtaSecondary: t("hero.ctaSecondary"),
        heroTrustLine: t("hero.trustLine"),
        programsSectionTitle: t("programs.sectionTitle"),
        gcse: { name: t("programs.gcse.name"), shortDesc: t("programs.gcse.shortDesc") },
        alevel: { name: t("programs.alevel.name"), shortDesc: t("programs.alevel.shortDesc") },
        ib: { name: t("programs.ib.name"), shortDesc: t("programs.ib.shortDesc") },
        tawjihi: { name: t("programs.tawjihi.name"), shortDesc: t("programs.tawjihi.shortDesc") },
        whyIlmTitle: t("whyIlm.title"),
        specialistsTitle: t("whyIlm.specialists.title"),
        specialistsDesc: t("whyIlm.specialists.desc"),
        tawjihiTitle: t("whyIlm.tawjihi.title"),
        tawjihiDesc: t("whyIlm.tawjihi.desc"),
        tailoredTitle: t("whyIlm.tailored.title"),
        tailoredDesc: t("whyIlm.tailored.desc"),
        testimonialsTitle: t("testimonials.title"),
        quote1: t("testimonials.quote1"),
        author1: t("testimonials.author1"),
        quote2: t("testimonials.quote2"),
        author2: t("testimonials.author2"),
        ctaHeading: t("ctaBanner.heading"),
        ctaSubtext: t("ctaBanner.subtext"),
        ctaButton: t("ctaBanner.button"),
      }}
    />
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { checkIsAdmin } from "@/lib/auth/admin";
import { getPublicPlans } from "@/lib/content/public-queries";
import { HomeClient } from "@/components/sections/home-client";
import type { Database } from "@/types/database.types";

type Plan = Database["public"]["Tables"]["subscription_plans"]["Row"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return { title: t("title"), description: t("description") };
}

async function getPlans(): Promise<Plan[]> {
  if (await checkIsAdmin()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("subscription_plans")
      .select("*")
      .order("display_order");
    return data ?? [];
  }
  return getPublicPlans();
}

export default async function HomePage() {
  const t = await getTranslations();
  const plans = await getPlans();

  return (
    <HomeClient
      plans={plans}
      translations={{
        heroLabel: t("hero.label"),
        heroTitle1: t("hero.title1"),
        heroTitle2: t("hero.title2"),
        heroSubheadline: t("hero.subheadline"),
        heroCtaPrimary: t("hero.ctaPrimary"),
        heroCtaSecondary: t("hero.ctaSecondary"),
        heroTrustLine: t("hero.trustLine"),
        programsSectionTitle: t("programs.sectionTitle"),
        learnMore: t("programs.learnMore"),
        gcse: { name: t("programs.gcse.name"), shortDesc: t("programs.gcse.shortDesc") },
        alevel: { name: t("programs.alevel.name"), shortDesc: t("programs.alevel.shortDesc") },
        ib: { name: t("programs.ib.name"), shortDesc: t("programs.ib.shortDesc") },
        tawjihi: { name: t("programs.tawjihi.name"), shortDesc: t("programs.tawjihi.shortDesc") },
        pricingTitle: t("pricing.title"),
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

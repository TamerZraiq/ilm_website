import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutClient } from "@/components/sections/about-client";
import { pageAlternates, pageOpenGraph } from "@/lib/site";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("about.title");
  const description = t("about.description");
  return {
    title,
    description,
    alternates: pageAlternates(locale, "/about"),
    openGraph: pageOpenGraph({ locale, path: "/about", title, description, siteName: t("siteName") }),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutClient />;
}

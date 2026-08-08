import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProgramsClient } from "@/components/sections/programs-client";
import { pageAlternates, pageOpenGraph } from "@/lib/site";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("programs.title");
  const description = t("programs.description");
  return {
    title,
    description,
    alternates: pageAlternates(locale, "/programs"),
    openGraph: pageOpenGraph({ locale, path: "/programs", title, description, siteName: t("siteName") }),
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProgramsClient />;
}

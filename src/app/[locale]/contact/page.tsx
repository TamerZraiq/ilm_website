import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactClient } from "@/components/sections/contact-client";
import { pageAlternates, pageOpenGraph } from "@/lib/site";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("contact.title");
  const description = t("contact.description");
  return {
    title,
    description,
    alternates: pageAlternates(locale, "/contact"),
    openGraph: pageOpenGraph({ locale, path: "/contact", title, description, siteName: t("siteName") }),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactClient />;
}

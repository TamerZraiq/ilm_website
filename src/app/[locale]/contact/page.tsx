import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactClient } from "@/components/sections/contact-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <ContactClient
      translations={{
        pageTitle: t("pageTitle"),
        formTitle: t("formTitle"),
        whatsapp: t("whatsapp"),
        emailLabel: t("emailLabel"),
        emailAddress: t("emailAddress"),
        locationLabel: t("locationLabel"),
        location: t("location"),
        hoursLabel: t("hoursLabel"),
        hours: t("hours"),
      }}
    />
  );
}

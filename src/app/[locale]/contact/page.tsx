import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactClient } from "@/components/sections/contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ilm Learning Center. Enquire about GCSE, A-Level, IB, or Tawjihi tutoring sessions.",
};

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

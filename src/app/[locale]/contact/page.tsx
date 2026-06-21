import { useTranslations } from "next-intl";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <section className="bg-navy px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white">{t("pageTitle")}</h1>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          {/* FORM */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-navy">
              {t("formTitle")}
            </h2>
            <ContactForm />
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            {/* WhatsApp */}
            {/* TODO: add WhatsApp number */}
            <div className="rounded-xl bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <MessageCircle className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-green-900">WhatsApp</h3>
              </div>
              <a
                href="#"
                className="inline-flex h-10 items-center rounded-lg bg-green-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                {t("whatsapp")}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5">
                <Mail className="h-5 w-5 text-navy" />
              </div>
              <div>
                <h3 className="font-bold text-navy">{t("emailLabel")}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {t("emailAddress")}
                </p>
              </div>
            </div>

            {/* Location */}
            {/* TODO: add specific city */}
            <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5">
                <MapPin className="h-5 w-5 text-navy" />
              </div>
              <div>
                <h3 className="font-bold text-navy">{t("locationLabel")}</h3>
                <p className="mt-1 text-sm text-gray-600">{t("location")}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5">
                <Clock className="h-5 w-5 text-navy" />
              </div>
              <div>
                <h3 className="font-bold text-navy">{t("hoursLabel")}</h3>
                <p className="mt-1 text-sm text-gray-600">{t("hours")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

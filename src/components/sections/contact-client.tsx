"use client";

import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { InlineText } from "@/components/cms/inline-text";
import { ContactForm } from "./contact-form";

interface ContactTranslations {
  pageTitle: string;
  formTitle: string;
  whatsapp: string;
  emailLabel: string;
  emailAddress: string;
  locationLabel: string;
  location: string;
  hoursLabel: string;
  hours: string;
}

export function ContactClient({ translations: t }: { translations: ContactTranslations }) {
  return (
    <>
      <section className="bg-navy px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <InlineText contentKey="contact.pageTitle" fallback={t.pageTitle} as="h1" className="text-4xl font-bold text-white" />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <InlineText contentKey="contact.formTitle" fallback={t.formTitle} as="h2" className="mb-6 text-2xl font-bold text-navy" />
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <MessageCircle className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-green-900">WhatsApp</h3>
              </div>
              <a href="#" className="inline-flex h-10 items-center rounded-lg bg-green-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                <InlineText contentKey="contact.whatsapp" fallback={t.whatsapp} />
              </a>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5">
                <Mail className="h-5 w-5 text-navy" />
              </div>
              <div>
                <InlineText contentKey="contact.emailLabel" fallback={t.emailLabel} as="h3" className="font-bold text-navy" />
                <InlineText contentKey="contact.emailAddress" fallback={t.emailAddress} as="p" className="mt-1 text-sm text-gray-600" />
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5">
                <MapPin className="h-5 w-5 text-navy" />
              </div>
              <div>
                <InlineText contentKey="contact.locationLabel" fallback={t.locationLabel} as="h3" className="font-bold text-navy" />
                <InlineText contentKey="contact.location" fallback={t.location} as="p" className="mt-1 text-sm text-gray-600" />
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5">
                <Clock className="h-5 w-5 text-navy" />
              </div>
              <div>
                <InlineText contentKey="contact.hoursLabel" fallback={t.hoursLabel} as="h3" className="font-bold text-navy" />
                <InlineText contentKey="contact.hours" fallback={t.hours} as="p" className="mt-1 text-sm text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

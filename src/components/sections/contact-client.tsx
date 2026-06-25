"use client";

import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
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
      <section className="bg-warm px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              <InlineText contentKey="contact.pageTitle" fallback={t.pageTitle} />
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-navy/50">We&apos;ll get back to you within 24 hours.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="mb-8 text-2xl font-bold text-navy">
                <InlineText contentKey="contact.formTitle" fallback={t.formTitle} />
              </h2>
            </Reveal>
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.15}>
              <div className="rounded-xl border border-navy/[0.06] bg-white p-8 shadow-sm">
                <div className="space-y-6">
                  {/* WhatsApp */}
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-bold text-navy">WhatsApp</h3>
                    </div>
                    <a href="#" className="inline-flex h-10 items-center rounded-lg bg-green-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                      <InlineText contentKey="contact.whatsapp" fallback={t.whatsapp} />
                    </a>
                  </div>

                  <hr className="border-navy/[0.06]" />

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/[0.04]">
                      <Mail className="h-5 w-5 text-navy/60" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy">
                        <InlineText contentKey="contact.emailLabel" fallback={t.emailLabel} />
                      </h3>
                      <p className="mt-1 text-sm text-navy/50">
                        <InlineText contentKey="contact.emailAddress" fallback={t.emailAddress} />
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/[0.04]">
                      <MapPin className="h-5 w-5 text-navy/60" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy">
                        <InlineText contentKey="contact.locationLabel" fallback={t.locationLabel} />
                      </h3>
                      <p className="mt-1 text-sm text-navy/50">
                        <InlineText contentKey="contact.location" fallback={t.location} />
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/[0.04]">
                      <Clock className="h-5 w-5 text-navy/60" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy">
                        <InlineText contentKey="contact.hoursLabel" fallback={t.hoursLabel} />
                      </h3>
                      <p className="mt-1 text-sm text-navy/50">
                        <InlineText contentKey="contact.hours" fallback={t.hours} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

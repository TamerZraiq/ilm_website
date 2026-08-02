"use client";

import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { whatsappUrl } from "@/lib/site";

interface ContactTranslations {
  pageTitle: string;
  intro: string;
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
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              {t.pageTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-navy/70">{t.intro}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-14 items-center gap-2.5 rounded-lg bg-gold px-9 text-base font-semibold text-navy shadow-[0_4px_20px_rgba(201,168,76,0.25)] transition-all hover:brightness-110"
            >
              <MessageCircle className="h-5 w-5" />
              {t.whatsapp}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <Reveal delay={0.05}>
            <div className="flex flex-col items-center gap-3 rounded-xl border border-navy/[0.06] bg-white p-8 text-center shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/[0.04]">
                <Mail className="h-5 w-5 text-navy/60" />
              </div>
              <h3 className="text-sm font-bold text-navy">{t.emailLabel}</h3>
              <p className="text-sm text-navy/70">{t.emailAddress}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col items-center gap-3 rounded-xl border border-navy/[0.06] bg-white p-8 text-center shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/[0.04]">
                <MapPin className="h-5 w-5 text-navy/60" />
              </div>
              <h3 className="text-sm font-bold text-navy">{t.locationLabel}</h3>
              <p className="text-sm text-navy/70">{t.location}</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col items-center gap-3 rounded-xl border border-navy/[0.06] bg-white p-8 text-center shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/[0.04]">
                <Clock className="h-5 w-5 text-navy/60" />
              </div>
              <h3 className="text-sm font-bold text-navy">{t.hoursLabel}</h3>
              <p className="text-sm text-navy/70">{t.hours}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import { Mail, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { whatsappUrl, MAPS_URL } from "@/lib/site";

interface ContactTranslations {
  pageTitle: string;
  intro: string;
  whatsapp: string;
  emailLabel: string;
  emailAddress: string;
  locationLabel: string;
  location: string;
  directions: string;
  hoursLabel: string;
  hoursAcademicLabel: string;
  hoursAcademic: string;
  hoursSummerLabel: string;
  hoursSummer: string;
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
              className="mt-8 inline-flex h-14 items-center gap-2.5 rounded-lg bg-gold px-9 text-base font-semibold text-navy shadow-[0_4px_20px_rgba(201,168,76,0.25)] transition-all hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] active:duration-100"
            >
              <MessageCircle className="h-5 w-5" />
              {t.whatsapp}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Location + hours lead — the two things a visitor actually needs to
       *  act on. Email is real but secondary for a WhatsApp-first business,
       *  so it gets a lighter, smaller treatment below rather than equal
       *  billing in the same grid. */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col items-center gap-3 rounded-xl border border-navy/[0.08] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(26,43,107,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                  <MapPin className="h-6 w-6 text-gold-dark" />
                </div>
                <h2 className="text-base font-bold text-navy">{t.locationLabel}</h2>
                <p className="text-base leading-relaxed text-navy/80">{t.location}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                  <Navigation className="h-4 w-4" />
                  {t.directions}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-navy/[0.08] bg-white p-8 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                  <Clock className="h-6 w-6 text-gold-dark" />
                </div>
                <h2 className="text-base font-bold text-navy">{t.hoursLabel}</h2>
                <div className="text-base text-navy/80">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    {t.hoursAcademicLabel}
                  </p>
                  <p>{t.hoursAcademic}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-navy/50">
                    {t.hoursSummerLabel}
                  </p>
                  <p>{t.hoursSummer}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-navy/60">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{t.emailLabel}:</span>
              <span className="text-navy/80">{t.emailAddress}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

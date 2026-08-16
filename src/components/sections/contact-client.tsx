"use client";

import { useLocale, useTranslations } from "next-intl";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Share2 } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { MAPS_URL, SOCIALS, whatsappUrl } from "@/lib/site";

export function ContactClient() {
  const t = useTranslations("contact");
  const isRtl = useLocale() === "ar";

  return (
    <>
      {/* ── The ask: one page, one action ── */}
      <section className="section relative overflow-hidden bg-warm">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 0%, rgba(201,168,76,0.16) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <h1 className="t-display max-w-[12ch] text-navy text-balance">
                  {t("pageTitle")}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="t-lead mt-7 max-w-[42ch] text-navy/75 text-pretty">
                  {t("intro")}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.16} className="md:col-span-5">
              <div className="flex flex-col items-start gap-6 md:items-end">
                <ButtonLink
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("whatsapp")}
                </ButtonLink>

                <a
                  href={`mailto:${t("emailAddress")}`}
                  className="inline-flex items-center gap-2 text-sm text-navy/70 transition-colors hover:text-gold-ink"
                >
                  <Mail aria-hidden className="h-4 w-4 shrink-0" />
                  <span className="sr-only">{t("emailLabel")}: </span>
                  {t("emailAddress")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The practicals, on their own dark band so they read as facts
           rather than footnotes ── */}
      <section className="grain on-dark section-tight relative overflow-hidden bg-navy-deep text-white">
        <div className="relative mx-auto max-w-6xl px-6">
          <Stagger className="grid gap-14 md:grid-cols-2 md:gap-20" stagger={0.12}>
            <StaggerItem>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="group block">
                <h2 className="t-micro flex items-center gap-2.5 text-gold-light">
                  <MapPin aria-hidden className="h-4 w-4" />
                  {t("locationLabel")}
                </h2>
                <p className="t-h3 mt-5 max-w-[24ch] font-normal leading-[1.5] text-white/90">
                  {t("location")}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light">
                  <Navigation aria-hidden className="h-4 w-4" />
                  {t("directions")}
                  <span
                    aria-hidden
                    className={`h-px w-6 origin-[left] scale-x-0 bg-gold-light transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${
                      isRtl ? "origin-[right]" : ""
                    }`}
                  />
                </span>
              </a>
            </StaggerItem>

            <StaggerItem>
              <h2 className="t-micro flex items-center gap-2.5 text-gold-light">
                <Clock aria-hidden className="h-4 w-4" />
                {t("hoursLabel")}
              </h2>
              <dl className="mt-5 space-y-6">
                <div>
                  <dt className="t-micro text-white/55">{t("hours.academicLabel")}</dt>
                  <dd className="t-h3 mt-2 font-normal text-white/90">{t("hours.academic")}</dd>
                </div>
                <div>
                  <dt className="t-micro text-white/55">{t("hours.summerLabel")}</dt>
                  <dd className="t-h3 mt-2 font-normal text-white/90">{t("hours.summer")}</dd>
                </div>
              </dl>
            </StaggerItem>
          </Stagger>

          {SOCIALS.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-16 flex flex-col gap-7 border-t border-white/10 pt-12 md:flex-row md:items-center md:justify-between md:gap-12">
                <div>
                  <h2 className="t-micro flex items-center gap-2.5 text-gold-light">
                    <Share2 aria-hidden className="h-4 w-4" />
                    {t("socialLabel")}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-white/70">
                    {t("socialIntro")}
                  </p>
                </div>
                <SocialLinks className="shrink-0" />
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

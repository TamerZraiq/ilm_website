"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { m, useReducedMotion, useTransform } from "framer-motion";
import { MessageSquare, ClipboardCheck, GraduationCap, ArrowRight } from "lucide-react";
import { HeroIllustration } from "@/components/sections/hero-illustration";
import {
  Marquee,
  Parallax,
  Reveal,
  RevealImage,
  RevealOnLoad,
  ScrollLitText,
  ScrollScale,
  Stagger,
  StaggerItem,
  useDesktopMotion,
  useSectionProgress,
} from "@/components/motion/motion";
import { ButtonLink, ButtonRoute } from "@/components/ui/button";
import { BrandImage } from "@/components/ui/brand-image";
import { FamilyMosaic } from "@/components/sections/family-mosaic";
import { FlowyGradientBackground } from "@/components/sections/flowy-gradient-background";
import { CurriculumGallery } from "@/components/sections/curriculum-gallery";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/site";
import { CURRICULA_KEYS } from "@/lib/curricula";
import { SUBJECT_KEYS } from "@/components/sections/subjects-gallery";
import { LeafHorizontal, LeafMedium, StarLarge, StarSmall } from "@/components/sections/logo-svgs";

/** One flowing strip: exam boards/curricula first, then the subjects taught
 *  within them — both breadth axes in the single "we teach everything"
 *  gesture the marquee makes. Each entry keeps its translation key + the
 *  namespace it lives under so it can be looked up with one `t()` call. */
const MARQUEE_ITEMS = [
  ...CURRICULA_KEYS.map((key) => ({ key, ns: "programs" as const })),
  ...SUBJECT_KEYS.map((key) => ({ key, ns: "programs.subjects" as const })),
];

/** Photography — self-hosted under /public/images. */
const IMG = {
  step1: "/images/ILC/tutor-focus.jpg",
  step2: "/images/ILC/peer-study.jpg",
  step3: "/images/ILC/tutoring-1on1.jpg",
  drift: "/images/ILC/study-pair.jpg",
  whyIlm: "/images/ILC/family-group.jpg",
  classSmiles: "/images/ILC/class-smiles.jpg",
  reel: "/images/ILC/reel-2.mp4",
} as const;

const HOME_MOSAIC = [
  { src: "/images/ILC/tutoring-1on1.jpg", altKey: "feature.altTutoring" },
  { src: "/images/ILC/kids-creative.jpg", altKey: "feature.altKids" },
  { src: "/images/ILC/welcome.jpg", altKey: "feature.altWelcome" },
  { src: "/images/ILC/class-smiles.jpg", altKey: "feature.altClass" },
] as const;

const STEPS = [
  { icon: MessageSquare, img: IMG.step1, variant: 4, tk: "step1Title", dk: "step1Desc" },
  { icon: ClipboardCheck, img: IMG.step2, variant: 1, tk: "step2Title", dk: "step2Desc" },
  { icon: GraduationCap, img: IMG.step3, variant: 6, tk: "step3Title", dk: "step3Desc" },
] as const;

/** Plane-1 atmosphere for dark sections: a soft gold bloom plus a few brand
 *  marks, all under 14% opacity. Never interactive, never load-bearing. */
function DarkAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.09]"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.42) 0%, transparent 62%)" }}
      />
      {/* Logical insets so the composition mirrors with the text direction
       *  instead of sitting on the wrong side of an RTL page. */}
      <div className="absolute start-[7%] top-[42%] hidden w-[100px] rotate-[40deg] text-gold opacity-[0.07] md:block">
        <LeafHorizontal />
      </div>
      <div className="absolute end-[42%] top-[6%] hidden w-[64px] -rotate-[15deg] text-gold opacity-[0.11] md:block">
        <StarLarge />
      </div>
      <div className="absolute start-[52%] top-[16%] hidden w-[72px] -rotate-[35deg] text-gold opacity-[0.08] md:block">
        <LeafMedium />
      </div>
      <div className="absolute start-[16%] top-[9%] hidden w-[28px] text-gold opacity-[0.13] md:block">
        <StarSmall />
      </div>
    </div>
  );
}

/** Oversized watermark type sitting on plane 1 — typography as ground rather
 *  than as label (DESIGN.md §3). */
function Wordmark({ children, className }: { children: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`t-mega pointer-events-none absolute select-none whitespace-nowrap ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

/** A line of display type that rises out of a clipping mask, rather than
 *  fading in as a block. The mask is what makes it read as typeset rather
 *  than animated.
 *
 *  The padding/negative-margin pair gives the mask room for descenders —
 *  Arabic's are deep enough that a tight box shears the bottom off ج/ح/م —
 *  without changing the line's layout height. */
function MaskLine({ children, delay = 0 }: { children: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="block">{children}</span>;
  return (
    <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
      <m.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.span>
    </span>
  );
}

/* ── Sections ─────────────────────────────────────────────────────────── */

function Hero() {
  const t = useTranslations();
  const isRtl = useLocale() === "ar";

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-warm">
      <FlowyGradientBackground />

      <div className="relative z-[1] mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-6 pb-10 pt-24 md:grid-cols-12 md:gap-4 md:pb-16 md:pt-20 lg:px-10">
        {/* Mark — 5 of 12, deliberately not half the grid */}
        <div className="relative order-first flex justify-center md:order-none md:col-span-5">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.16) 90deg, transparent 200deg, rgba(201,168,76,0.10) 300deg, transparent 360deg)",
              filter: "blur(28px)",
              animation: "halo-spin 46s linear infinite",
            }}
          />
          <Parallax speed={22} className="relative flex w-full justify-center">
            <HeroIllustration />
          </Parallax>
        </div>

        {/* Copy — 7 of 12 */}
        <div className="relative text-center md:col-span-7 md:text-start md:ps-6 lg:ps-12">
          <RevealOnLoad y={16}>
            <p className="t-micro text-gold-ink">{t("hero.label")}</p>
          </RevealOnLoad>

          <h1 className="t-display mt-6 text-navy">
            <MaskLine delay={0.08}>{t("hero.title1")}</MaskLine>
            <MaskLine delay={0.16}>{t("hero.title2")}</MaskLine>
          </h1>

          <div className="relative mx-auto mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-gold md:mx-0">
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-full animate-[shimmer_3.4s_ease-in-out_infinite]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
            />
          </div>

          <RevealOnLoad y={18} delay={0.34}>
            <p className="t-h3 mt-6 text-navy">{t("meta.siteName")}</p>
          </RevealOnLoad>

          <RevealOnLoad y={20} delay={0.42}>
            <p className="t-lead mx-auto mt-5 max-w-[46ch] text-navy/70 text-pretty md:mx-0">
              {t("hero.subheadline")}
            </p>
          </RevealOnLoad>

          <RevealOnLoad y={18} delay={0.52}>
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
              <ButtonLink
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                {t("hero.ctaWhatsapp")}
              </ButtonLink>
              <ButtonRoute href="/programs" variant="ghost" size="lg">
                {t("hero.ctaPrimary")}
                <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
              </ButtonRoute>
            </div>
          </RevealOnLoad>
        </div>
      </div>

      {/* Breadth, stated as motion rather than as a wrapping chip grid. Twelve
        * names scrolling past says "we cover everything" faster than reading
        * them ever could. */}
      <RevealOnLoad y={24} delay={0.66} className="relative z-[1] w-full">
        <div className="flex items-center gap-4 border-t border-navy/[0.07] py-5">
          <span className="t-micro shrink-0 ps-6 text-navy/70 lg:ps-10">
            {t("hero.curriculaLabel")}
          </span>
          {/* Duration scales with the doubled item count so each name still
           *  gets roughly the same amount of screen time as before. */}
          <Marquee duration={100} className="min-w-0 flex-1">
            {MARQUEE_ITEMS.map(({ key, ns }) => (
              <span key={`${ns}.${key}`} className="flex items-center whitespace-nowrap px-4">
                <span className="text-[15px] font-semibold text-navy/80">
                  {ns === "programs" ? t(`programs.${key}.name`) : t(`programs.subjects.${key}`)}
                </span>
                <span aria-hidden className="ms-8 h-1 w-1 rounded-full bg-gold" />
              </span>
            ))}
          </Marquee>
        </div>
      </RevealOnLoad>
    </section>
  );
}

function Feature() {
  const t = useTranslations();

  return (
    <section className="section relative overflow-hidden bg-white">
      {/* The heading block is contained; the media below breaks past it. */}
      <div className="mx-auto max-w-6xl px-6">
        {/* Top-aligned, not bottom-aligned: the heading here runs 2 lines
         *  and the paragraph is short, so items-end was stranding the
         *  paragraph well below the heading's top with a dead gap above it. */}
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-7">
            <h2 className="t-h2 text-navy text-balance">{t("feature.title")}</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="t-body text-navy/70 text-pretty">{t("feature.body")}</p>
          </Reveal>
        </div>
      </div>

      <ScrollScale className="mx-auto mt-14 max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <FamilyMosaic video={IMG.reel} photos={HOME_MOSAIC} badgeKey="feature.badge" />
      </ScrollScale>
    </section>
  );
}

function HowItWorks() {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const active = useDesktopMotion();
  const progress = useSectionProgress(ref, ["start end", "end start"]);
  const lineScale = useTransform(progress, [0.12, 0.72], [0, 1]);

  return (
    <section className="section-loose relative overflow-hidden bg-warm">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          {/* max-w belongs on the heading itself, not this wrapper: `ch`
           *  resolves against whichever element's font-size it's declared
           *  on, and the wrapper inherits body text size (~17px) rather
           *  than t-h2's 52px — putting it here once collapsed this
           *  heading's box to a quarter of the intended width. */}
          <h2 className="t-h2 max-w-[22ch] text-navy text-balance">{t("howItWorks.title")}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="t-lead mt-5 max-w-[46ch] text-navy/70 text-pretty">
            {t("howItWorks.intro")}
          </p>
        </Reveal>

        {/* A staircase, not a card row: each step steps further in and sits
         *  lower than the last, with a rule that draws itself as you scroll. */}
        <div ref={ref} className="relative mt-20 lg:mt-28">
          <div
            aria-hidden
            className="absolute bottom-0 top-0 hidden w-px bg-navy/10 md:block"
            style={{ insetInlineStart: "calc(1.75rem - 0.5px)" }}
          />
          <m.div
            aria-hidden
            className="absolute bottom-0 top-0 hidden w-px origin-top bg-gold md:block"
            style={{
              insetInlineStart: "calc(1.75rem - 0.5px)",
              scaleY: active ? lineScale : 1,
            }}
          />

          <div className="flex flex-col gap-16 lg:gap-24">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Stagger
                  key={step.tk}
                  stagger={0.12}
                  className="relative grid items-center gap-8 md:grid-cols-12 md:gap-10"
                >
                  {/* Oversized numeral, plane 1 */}
                  <StaggerItem
                    className={`pointer-events-none absolute -top-10 select-none md:-top-16 ${
                      i % 2 === 0 ? "end-0" : "start-0 md:start-[14%]"
                    }`}
                  >
                    <span aria-hidden className="t-mega block text-navy/[0.045]">
                      {`0${i + 1}`}
                    </span>
                  </StaggerItem>

                  <StaggerItem
                    className={`relative md:col-span-6 ${
                      i % 2 === 0 ? "md:col-start-2" : "md:col-start-7 md:row-start-1"
                    }`}
                  >
                    <RevealImage className="overflow-hidden rounded-[28px]">
                      <BrandImage
                        src={step.img}
                        alt={t(`howItWorks.${step.tk}`)}
                        variant={step.variant}
                        rounded="rounded-[28px]"
                        className="aspect-[5/4] w-full"
                        sizes="(min-width: 768px) 44vw, 100vw"
                      />
                    </RevealImage>
                  </StaggerItem>

                  <StaggerItem
                    anticipate
                    className={`relative md:col-span-4 ${
                      i % 2 === 0 ? "md:col-start-9" : "md:col-start-2 md:row-start-1"
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white text-gold-ink shadow-[var(--shadow-ambient)] ring-1 ring-navy/[0.06]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="t-h3 mt-5 text-navy">{t(`howItWorks.${step.tk}`)}</h3>
                    <p className="t-body mt-3 text-navy/70 text-pretty">
                      {t(`howItWorks.${step.dk}`)}
                    </p>
                  </StaggerItem>
                </Stagger>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  const t = useTranslations();

  return (
    <section className="grain on-dark section relative flex min-h-[85vh] items-center overflow-hidden bg-navy-deep text-white">
      <DarkAtmosphere />

      <Parallax speed={70} className="absolute end-[5%] top-[14%] hidden w-[180px] lg:block">
        <BrandImage
          src={IMG.classSmiles}
          alt=""
          variant={1}
          overlay="strong"
          className="aspect-[3/4] w-full opacity-70"
          sizes="180px"
        />
      </Parallax>
      <Parallax speed={-55} className="absolute start-[6%] bottom-[12%] hidden w-[150px] lg:block">
        <BrandImage
          src={IMG.drift}
          alt=""
          variant={6}
          overlay="strong"
          className="aspect-[3/4] w-full opacity-70"
          sizes="150px"
        />
      </Parallax>

      {/* The page's typographic peak: the sentence is read *by* the scroll,
       *  word by word, instead of dropped in by a fade. */}
      <div className="relative mx-auto w-full max-w-5xl px-6 lg:px-10">
        <ScrollLitText
          text={t("statement.text")}
          className="t-display mx-auto max-w-[16ch] text-balance text-white"
        />
      </div>
    </section>
  );
}

function Programs() {
  const t = useTranslations();

  return (
    // overflow-hidden lives on the heading wrapper below, not here — an
    // overflow-hidden ancestor disables `position: sticky` for every
    // descendant, and CurriculumGallery's pinned horizontal scroll is one.
    // With it on this outer section, the pin never engaged: the cards
    // scrolled past normally in the first screen-height, then the rest of
    // this section's (intentionally tall, for the pin) height sat empty —
    // exactly the "scrolls to blank white" symptom.
    <section className="section-tight relative bg-white pb-0">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-6">
        <Wordmark className="-top-6 end-0 text-navy/[0.035] lg:-top-10">
          {t("programs.sectionTitle")}
        </Wordmark>
        <Reveal>
          <h2 className="t-h2 relative text-navy text-balance">{t("programs.sectionTitle")}</h2>
        </Reveal>
        <Stagger className="mt-6" stagger={0.08}>
          <StaggerItem>
            <p className="t-body max-w-[54ch] text-navy/70 text-pretty">{t("programs.galleryIntro")}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="t-lead mt-4 max-w-[54ch] font-semibold text-navy text-pretty">
              {t("programs.gradeRange")}
            </p>
          </StaggerItem>
        </Stagger>
      </div>

      <div className="mt-14">
        <CurriculumGallery />
      </div>
      <div className="h-[var(--space-section)]" />
    </section>
  );
}

function WhyIlm() {
  const t = useTranslations();

  const PILLARS = [
    { k: "specialists", title: t("whyIlm.specialists.title"), desc: t("whyIlm.specialists.desc") },
    { k: "tawjihi", title: t("whyIlm.tawjihi.title"), desc: t("whyIlm.tawjihi.desc") },
    { k: "tailored", title: t("whyIlm.tailored.title"), desc: t("whyIlm.tailored.desc") },
  ] as const;

  return (
    // No overflow-hidden here: this section has nothing that needs
    // clipping, and an overflow-hidden ancestor silently disables
    // `position: sticky` for the pinned media panel below.
    <section className="section-loose relative bg-warm-deep">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        {/* The media pins while the pillars scroll past it — an interaction
         *  used nowhere else on the page. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <RevealImage className="overflow-hidden rounded-[28px]">
              <BrandImage
                src={IMG.whyIlm}
                alt={t("whyIlm.imageAlt")}
                variant={3}
                rounded="rounded-[28px]"
                className="aspect-[4/5] w-full"
                sizes="(min-width: 1024px) 460px, 100vw"
              />
            </RevealImage>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 className="t-h2 text-navy text-balance">{t("whyIlm.title")}</h2>
          </Reveal>

          <div className="mt-14 flex flex-col">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} className="border-t border-navy/10 py-10 first:border-t-0 first:pt-0">
                <div className="flex items-baseline gap-5">
                  <span aria-hidden className="t-micro shrink-0 text-gold-ink">
                    {`0${i + 1}`}
                  </span>
                  <div>
                    <h3 className="t-h3 text-navy">{p.title}</h3>
                    <p className="t-body mt-3 text-navy/70 text-pretty">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = useTranslations();

  const QUOTES = [
    { q: t("testimonials.quote1"), a: t("testimonials.author1") },
    { q: t("testimonials.quote2"), a: t("testimonials.author2") },
  ] as const;

  return (
    <section className="grain on-dark section relative overflow-hidden bg-navy text-white">
      <DarkAtmosphere />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="t-h2 max-w-[16ch] text-white text-balance">{t("testimonials.title")}</h2>
        </Reveal>

        {/* Pull-quotes, not cards. Two quotes at different widths and
         *  alignments so the pair reads as an editorial spread. */}
        <div className="mt-16 flex flex-col gap-16 lg:mt-24 lg:gap-24">
          {QUOTES.map((item, i) => (
            <Reveal
              key={item.a}
              className={i % 2 === 0 ? "lg:me-[22%]" : "lg:ms-[26%] lg:text-end"}
            >
              <figure className="relative">
                <span
                  aria-hidden
                  className="t-mega pointer-events-none absolute -top-[0.42em] select-none leading-none text-gold/15"
                  style={{ insetInlineStart: "-0.06em" }}
                >
                  &ldquo;
                </span>
                <blockquote className="relative">
                  <p className="t-h3 leading-[1.55] text-white/90 sm:text-[clamp(1.25rem,2.3vw,1.75rem)]">
                    {item.q}
                  </p>
                </blockquote>
                <figcaption className="t-micro mt-6 text-gold-light">{item.a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finale() {
  const t = useTranslations();
  const isRtl = useLocale() === "ar";

  return (
    <section className="grain on-dark section-loose relative overflow-hidden bg-navy-deep text-white">
      <DarkAtmosphere />

      {/* The brand mark, oversized and barely there — the page ends on the
       *  same image it opened with, at the opposite scale. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[18%] start-1/2 h-[80%] w-[80%] max-w-[720px] -translate-x-1/2 opacity-[0.05] rtl:translate-x-1/2"
        style={{
          backgroundImage: "url(/logo-icon.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="t-display mx-auto max-w-[14ch] text-white text-balance">
            {t("ctaBanner.heading")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead mx-auto mt-6 max-w-[44ch] text-white/70 text-pretty">
            {t("ctaBanner.subtext")}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              {t("hero.ctaWhatsapp")}
            </ButtonLink>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-gold-light"
            >
              {t("ctaBanner.button")}
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${
                  isRtl ? "rotate-180 group-hover:-translate-x-1" : ""
                }`}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeClient() {
  return (
    <div>
      <Hero />
      <Feature />
      <HowItWorks />
      <Statement />
      <Programs />
      <WhyIlm />
      <Testimonials />
      <Finale />
    </div>
  );
}

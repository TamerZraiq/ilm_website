"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  GraduationCap,
  MessageSquare,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { HeroIllustration } from "@/components/sections/hero-illustration";
import { Reveal, RevealImage, Parallax } from "@/components/motion/motion";
import { HorizontalGallery } from "@/components/motion/horizontal-gallery";
import { BrandImage } from "@/components/ui/brand-image";
import { FamilyMosaic } from "@/components/sections/family-mosaic";
import { FlowyGradientBackground } from "@/components/sections/flowy-gradient-background";
import { whatsappUrl } from "@/lib/site";
import {
  LeafHorizontal,
  LeafVertical,
  LeafTall,
  LeafMedium,
  StarLarge,
  StarMedium,
  StarSmall,
} from "@/components/sections/logo-svgs";

/** Photography — self-hosted under /public/images. Undefined renders a branded
 *  placeholder tile; drop a real photo path in to upgrade any slot. */
const IMG: Record<string, string | undefined> = {
  step1: "/images/ILC/tutor-focus.jpg",
  step2: "/images/ILC/peer-study.jpg",
  step3: "/images/ILC/tutoring-1on1.jpg",
  gcse: "/images/prog-gcse.jpg",
  alevel: "/images/prog-alevel.jpg",
  ib: "/images/prog-ib.jpg",
  tawjihi: "/images/prog-tawjihi.jpg",
  driftB: "/images/ILC/study-pair.jpg",
  whyIlm: "/images/ILC/family-group.jpg",
};

/** Real photos + session reel from the centre, in /public/images/ILC. */
const ILC = {
  classSmiles: "/images/ILC/class-smiles.jpg",
  reel2: "/images/ILC/reel-2.mp4",
} as const;

/** The four stills flanking the session reel on the home page. */
const HOME_MOSAIC = [
  { src: "/images/ILC/tutoring-1on1.jpg", altKey: "feature.altTutoring" },
  { src: "/images/ILC/kids-creative.jpg", altKey: "feature.altKids" },
  { src: "/images/ILC/welcome.jpg", altKey: "feature.altWelcome" },
  { src: "/images/ILC/class-smiles.jpg", altKey: "feature.altClass" },
] as const;

const PROGRAMS_META = [
  { key: "gcse", img: IMG.gcse, variant: 1 },
  { key: "alevel", img: IMG.alevel, variant: 2 },
  { key: "ib", img: IMG.ib, variant: 3 },
  { key: "tawjihi", img: IMG.tawjihi, variant: 5 },
] as const;

const STEPS = [
  { icon: MessageSquare, img: IMG.step1, variant: 4, tk: "step1Title", dk: "step1Desc" },
  { icon: ClipboardCheck, img: IMG.step2, variant: 1, tk: "step2Title", dk: "step2Desc" },
  { icon: GraduationCap, img: IMG.step3, variant: 6, tk: "step3Title", dk: "step3Desc" },
] as const;

function ScatterDark() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute opacity-[0.08]" style={{ left: "50%", top: "50%", width: "50vw", height: "50vw", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 60%)", borderRadius: "50%" }} />
      <div className="absolute text-[#C9A84C] opacity-[0.14] hidden md:block" style={{ left: "16%", top: "8%", width: "30px" }}><StarSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.14] hidden md:block" style={{ right: "42%", top: "5%", width: "65px", transform: "rotate(-15deg)" }}><StarLarge /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "7%", top: "42%", width: "100px", transform: "rotate(40deg)" }}><LeafHorizontal /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ left: "52%", top: "15%", width: "75px", transform: "rotate(-35deg)" }}><LeafMedium /></div>
    </div>
  );
}

export function HomeClient() {
  const t = useTranslations();
  const isRtl = useLocale() === "ar";

  const waHref = whatsappUrl();

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-screen flex-col items-center overflow-hidden bg-warm md:flex-row md:items-center">
        <FlowyGradientBackground />

        <div className="relative z-[1] flex w-full items-center justify-center px-6 py-10 sm:px-10 md:w-1/2 md:py-0 lg:px-14">
          <Parallax speed={26} className="flex w-full justify-center">
            <HeroIllustration />
          </Parallax>
        </div>

        <div className="relative z-[1] w-full px-6 pb-16 text-center md:w-1/2 md:pb-0 md:ps-10 md:pe-[8%] md:text-start">
          <Reveal y={20}>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-gold">
              {t("hero.label")}
            </p>
          </Reveal>
          <Reveal y={26} delay={0.05}>
            <h1 className="text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-navy text-balance sm:text-5xl md:text-[56px]">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
            </h1>
          </Reveal>
          <div className="relative mx-auto mt-3 h-[3px] w-48 overflow-hidden rounded-full bg-gold md:mx-0">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
          </div>
          <Reveal y={20} delay={0.12}>
            <p className="mx-auto mt-5 max-w-[440px] text-[16px] leading-[1.7] text-navy/70 md:mx-0">
              {t("hero.subheadline")}
            </p>
          </Reveal>
          <Reveal y={18} delay={0.18}>
            <div className="mt-8 flex justify-center md:justify-start">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gold px-7 py-3 text-sm font-semibold text-navy transition-all hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:brightness-110">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                {t("hero.ctaWhatsapp")}
              </a>
            </div>
          </Reveal>
          <Reveal y={14} delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
              <span className="text-[11px] uppercase tracking-[2px] text-navy/50">
                {t("hero.curriculaLabel")}
              </span>
              {PROGRAMS_META.map((p) => (
                <span key={p.key} className="rounded-full border border-navy/10 bg-white/60 px-3.5 py-1.5 text-[13px] font-semibold text-navy">
                  {t(`programs.${p.key}.name`)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FEATURE — mask reveal ═══ */}
      <section className="relative overflow-hidden bg-white px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-x-10 gap-y-6 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-navy text-balance sm:text-[2.75rem]">
                {t("feature.title")}
              </h2>
              <div className="mt-5 h-[2px] w-12 bg-gold" />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="text-[15px] leading-[1.75] text-navy/70 text-pretty">
                {t("feature.body")}
              </p>
            </Reveal>
          </div>
          <FamilyMosaic video={ILC.reel2} photos={HOME_MOSAIC} />
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative overflow-hidden bg-warm px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-[20ch] text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-navy text-balance sm:text-[2.75rem]">
              {t("howItWorks.title")}
            </h2>
            <div className="mt-5 h-[2px] w-12 bg-gold" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.75] text-navy/70 text-pretty">
              {t("howItWorks.intro")}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.tk} delay={i * 0.12}>
                  <div className="flex flex-col">
                    <RevealImage className="overflow-hidden rounded-2xl">
                      <BrandImage
                        src={step.img}
                        alt={t(`howItWorks.${step.tk}`)}
                        variant={step.variant}
                        className="aspect-[5/4] w-full"
                        sizes="(min-width: 768px) 30vw, 100vw"
                      />
                    </RevealImage>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/[0.04] text-gold">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="text-[12px] font-bold uppercase tracking-[2px] text-gold">
                        {`0${i + 1}`}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-navy">
                      {t(`howItWorks.${step.tk}`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/70">
                      {t(`howItWorks.${step.dk}`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy-dark px-6 py-28 text-white">
        <ScatterDark />
        <Parallax speed={90} className="absolute end-[6%] top-[12%] hidden w-[210px] md:block">
          <BrandImage src={ILC.classSmiles} alt="" variant={1} overlay="strong" className="aspect-[3/4] w-full" sizes="210px" />
        </Parallax>
        <Parallax speed={-70} className="absolute end-[24%] bottom-[10%] hidden w-[160px] lg:block">
          <BrandImage src={IMG.driftB} alt="" variant={6} overlay="strong" className="aspect-[3/4] w-full" sizes="160px" />
        </Parallax>
        <div className="relative mx-auto w-full max-w-5xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[3px] text-gold-light">
              Ilm
            </p>
            <h2 className="mt-5 max-w-[20ch] text-[2.2rem] font-bold leading-[1.12] tracking-[-0.02em] text-balance sm:text-[3.4rem]">
              {t("statement.text")}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROGRAMS — horizontal gallery ═══ */}
      <section className="relative bg-white pt-24 lg:pt-32">
        <div className="mx-auto mb-14 max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-navy text-balance sm:text-[2.75rem]">
              {t("programs.sectionTitle")}
            </h2>
            <div className="mt-5 h-[2px] w-12 bg-gold" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.75] text-navy/70 text-pretty">
              {t("programs.galleryIntro")}
            </p>
          </Reveal>
        </div>

        <HorizontalGallery rtl={isRtl}>
          {PROGRAMS_META.map((p) => (
            <Link
              key={p.key}
              href="/programs"
              className="group block w-[78vw] shrink-0 sm:w-[380px]"
            >
              <RevealImage className="overflow-hidden rounded-2xl">
                <BrandImage
                  src={p.img}
                  alt={t(`programs.${p.key}.name`)}
                  variant={p.variant}
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 640px) 380px, 78vw"
                />
              </RevealImage>
              <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[2px] text-gold">
                {t(`programs.${p.key}.kicker`)}
              </span>
              <h3 className="mt-1.5 text-xl font-semibold text-navy">
                {t(`programs.${p.key}.name`)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/70">
                {t(`programs.${p.key}.shortDesc`)}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold">
                {t("programs.learnMore")}
                <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </span>
            </Link>
          ))}
        </HorizontalGallery>
        <div className="pb-24 lg:pb-32" />
      </section>

      {/* ═══ WHY ILM ═══ */}
      <section className="relative overflow-hidden bg-warm px-6 py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <RevealImage className="overflow-hidden rounded-3xl">
            <BrandImage
              src={IMG.whyIlm}
              alt=""
              variant={3}
              className="aspect-[4/3] w-full"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </RevealImage>
          <div>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-navy text-balance sm:text-[2.75rem]">
                {t("whyIlm.title")}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-gold" />
            </Reveal>
            <div className="mt-10 flex flex-col gap-8">
              {([
                { tk: "whyIlm.specialists.title", tf: t("whyIlm.specialists.title"), dk: "whyIlm.specialists.desc", df: t("whyIlm.specialists.desc") },
                { tk: "whyIlm.tawjihi.title", tf: t("whyIlm.tawjihi.title"), dk: "whyIlm.tawjihi.desc", df: t("whyIlm.tawjihi.desc") },
                { tk: "whyIlm.tailored.title", tf: t("whyIlm.tailored.title"), dk: "whyIlm.tailored.desc", df: t("whyIlm.tailored.desc") },
              ] as const).map((item, i) => (
                <Reveal key={item.tk} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{item.tf}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-navy/70">{item.df}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="relative overflow-hidden bg-navy px-6 py-24 lg:py-32">
        <ScatterDark />
        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-white text-balance sm:text-[2.75rem]">
              {t("testimonials.title")}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-gold" />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { qf: t("testimonials.quote1"), af: t("testimonials.author1") },
              { qf: t("testimonials.quote2"), af: t("testimonials.author2") },
            ].map((item, i) => (
              <Reveal key={item.af} delay={i * 0.12}>
                <div className="h-full rounded-xl border border-white/[0.08] bg-white/[0.05] p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.08]">
                  <span className="mb-3 block text-5xl leading-none text-gold">&ldquo;</span>
                  <p className="text-base italic leading-[1.7] text-white/85">{item.qf}</p>
                  <p className="mt-5 text-[13px] text-white/65">— {item.af}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-warm px-6 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute text-[#C9A84C] opacity-[0.10]" style={{ right: "6%", top: "12%", width: "65px", transform: "rotate(-35deg)" }}><StarLarge /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.08]" style={{ left: "4%", bottom: "8%", width: "110px", transform: "rotate(30deg)" }}><LeafHorizontal /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ right: "22%", bottom: "15%", width: "50px", transform: "rotate(55deg)" }}><LeafMedium /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "42%", bottom: "4%", width: "45px", transform: "rotate(-45deg)" }}><LeafVertical /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.06] hidden md:block" style={{ right: "40%", top: "5%", width: "70px", transform: "rotate(15deg)" }}><LeafTall /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.12] hidden md:block" style={{ left: "18%", top: "8%", width: "25px" }}><StarSmall /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "60%", top: "30%", width: "40px" }}><StarMedium /></div>
        </div>

        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-gold/[0.2] bg-white p-10 text-center shadow-[0_0_40px_rgba(201,168,76,0.08)] lg:p-14">
              <h2 className="text-[32px] font-bold tracking-tight text-navy text-balance">
                {t("ctaBanner.heading")}
              </h2>
              <p className="mt-3 text-base text-navy/70">
                {t("ctaBanner.subtext")}
              </p>
              <div className="mt-8 flex justify-center">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="group relative inline-flex h-[52px] items-center justify-center overflow-hidden rounded-[10px] bg-gold px-8 text-sm font-semibold text-navy transition-all hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:brightness-110">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  {t("hero.ctaWhatsapp")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

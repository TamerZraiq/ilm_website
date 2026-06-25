"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { BookOpen, GraduationCap, Target, Award } from "lucide-react";
import { InlineText } from "@/components/cms/inline-text";
import { PlanEditor } from "@/components/cms/plan-editor";
import { useAdmin } from "@/lib/auth/admin-context";
import {
  HandSvg,
  LeafHorizontal,
  LeafVertical,
  LeafLarge,
  LeafSmall,
  LeafThin,
  LeafTall,
  LeafMedium,
  StarLarge,
  StarMedium,
  StarSmall,
} from "@/components/sections/logo-svgs";
import type { Database } from "@/types/database.types";

type Plan = Database["public"]["Tables"]["subscription_plans"]["Row"];

interface HomeTranslations {
  heroLabel: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubheadline: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroTrustLine: string;
  programsSectionTitle: string;
  gcse: { name: string; shortDesc: string };
  alevel: { name: string; shortDesc: string };
  ib: { name: string; shortDesc: string };
  tawjihi: { name: string; shortDesc: string };
  whyIlmTitle: string;
  specialistsTitle: string;
  specialistsDesc: string;
  tawjihiTitle: string;
  tawjihiDesc: string;
  tailoredTitle: string;
  tailoredDesc: string;
  testimonialsTitle: string;
  quote1: string;
  author1: string;
  quote2: string;
  author2: string;
  ctaHeading: string;
  ctaSubtext: string;
  ctaButton: string;
}

const PROGRAMS_META = [
  { key: "gcse", icon: BookOpen },
  { key: "alevel", icon: GraduationCap },
  { key: "ib", icon: Award },
  { key: "tawjihi", icon: Target },
] as const;

function LogoIllustration({ handClass }: { handClass: string }) {
  return (
    <div className="relative w-fit">
      <HandSvg className={`block w-auto text-[#1A2B6B] ${handClass}`} />
      <div className="absolute text-[#C9A84C]" style={{ left: "-35%", top: "22%", width: "42%", transform: "translate(-50%,-50%)" }}><LeafLarge /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "-40%", top: "6%", width: "48%", transform: "translate(-50%,-50%)" }}><LeafHorizontal /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "-18%", top: "-8%", width: "14%", transform: "translate(-50%,-50%)" }}><LeafMedium /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "-8%", top: "-18%", width: "16%", transform: "translate(-50%,-50%)" }}><LeafTall /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "2%", top: "-5%", width: "10%", transform: "translate(-50%,-50%)" }}><LeafSmall /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "12%", top: "-25%", width: "12%", transform: "translate(-50%,-50%)" }}><LeafVertical /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "24%", top: "-20%", width: "8%", transform: "translate(-50%,-50%)" }}><LeafThin /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "82%", top: "-12%", width: "22%", transform: "translate(-50%,-50%)" }}><StarLarge /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "100%", top: "5%", width: "13%", transform: "translate(-50%,-50%)" }}><StarMedium /></div>
      <div className="absolute text-[#C9A84C]" style={{ left: "62%", top: "-25%", width: "8%", transform: "translate(-50%,-50%)" }}><StarSmall /></div>
    </div>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute hidden md:block" style={{ left: "8%", top: "15%", width: "35vw", height: "35vw", background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 50%, transparent 70%)", borderRadius: "50%" }} />
      <div className="absolute hidden md:block" style={{ right: "-5%", top: "-20%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 60%)", borderRadius: "50%" }} />
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
        <pattern id="hero-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#1A2B6B" /></pattern>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
      <div className="absolute hidden md:block" style={{ left: "44%", top: "20%", width: "1px", height: "60%", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.1), transparent)", transform: "rotate(3deg)" }} />
      <div className="absolute text-[#C9A84C] opacity-[0.12] hidden md:block" style={{ right: "6%", bottom: "18%", width: "80px", transform: "rotate(25deg)" }}><LeafSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ right: "22%", bottom: "8%", width: "35px", transform: "rotate(-15deg)" }}><StarSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "42%", top: "8%", width: "100px", transform: "rotate(40deg)" }}><LeafHorizontal /></div>
    </div>
  );
}

function ScatterLight() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute text-[#C9A84C] opacity-[0.12]" style={{ right: "4%", top: "6%", width: "110px", transform: "rotate(35deg)" }}><LeafLarge /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10]" style={{ left: "3%", bottom: "10%", width: "55px", transform: "rotate(-20deg)" }}><StarLarge /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ right: "26%", bottom: "5%", width: "60px", transform: "rotate(60deg)" }}><LeafThin /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.12] hidden md:block" style={{ left: "14%", top: "18%", width: "28px", transform: "rotate(10deg)" }}><StarSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ right: "40%", top: "4%", width: "45px", transform: "rotate(-40deg)" }}><LeafSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "36%", bottom: "12%", width: "38px" }}><StarMedium /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.06] hidden md:block" style={{ left: "55%", top: "50%", width: "70px", transform: "rotate(-30deg)" }}><LeafTall /></div>
    </div>
  );
}

function ScatterWarm() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute text-[#C9A84C] opacity-[0.12]" style={{ right: "3%", bottom: "8%", width: "130px", transform: "rotate(-25deg)" }}><LeafHorizontal /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10]" style={{ left: "5%", top: "12%", width: "60px", transform: "rotate(15deg)" }}><StarLarge /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "2%", bottom: "18%", width: "65px", transform: "rotate(45deg)" }}><LeafVertical /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.12] hidden md:block" style={{ right: "16%", top: "6%", width: "40px", transform: "rotate(-10deg)" }}><LeafSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ right: "33%", bottom: "4%", width: "28px" }}><StarSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "28%", top: "4%", width: "50px", transform: "rotate(70deg)" }}><LeafTall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ right: "7%", top: "38%", width: "80px", transform: "rotate(-55deg)" }}><LeafMedium /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.06] hidden md:block" style={{ left: "50%", bottom: "25%", width: "45px", transform: "rotate(20deg)" }}><StarMedium /></div>
    </div>
  );
}

function ScatterDark() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute opacity-[0.08]" style={{ left: "50%", top: "50%", width: "50vw", height: "50vw", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 60%)", borderRadius: "50%" }} />
      <div className="absolute text-[#C9A84C] opacity-[0.15]" style={{ right: "5%", top: "10%", width: "90px", transform: "rotate(20deg)" }}><LeafLarge /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.12]" style={{ left: "4%", bottom: "12%", width: "50px", transform: "rotate(-30deg)" }}><StarMedium /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ right: "28%", bottom: "6%", width: "60px", transform: "rotate(50deg)" }}><LeafTall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.14] hidden md:block" style={{ left: "16%", top: "8%", width: "30px" }}><StarSmall /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.12] hidden md:block" style={{ left: "33%", bottom: "18%", width: "55px", transform: "rotate(-60deg)" }}><LeafThin /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.14] hidden md:block" style={{ right: "42%", top: "5%", width: "65px", transform: "rotate(-15deg)" }}><StarLarge /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "7%", top: "42%", width: "100px", transform: "rotate(40deg)" }}><LeafHorizontal /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ left: "52%", top: "15%", width: "75px", transform: "rotate(-35deg)" }}><LeafMedium /></div>
      <div className="absolute text-[#C9A84C] opacity-[0.12] hidden md:block" style={{ right: "8%", top: "55%", width: "45px", transform: "rotate(25deg)" }}><LeafVertical /></div>
    </div>
  );
}

export function HomeClient({
  plans,
  translations: t,
}: {
  plans: Plan[];
  translations: HomeTranslations;
}) {
  const locale = useLocale();
  const isAdmin = useAdmin();
  const isRtl = locale === "ar";

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#F7F5F0] md:flex-row md:items-center">
        <HeroBackground />

        <div className={`relative z-[1] flex w-full items-center justify-center py-10 md:w-[45%] md:py-0 ${isRtl ? "md:justify-start" : "md:justify-end"}`}>
          <div className="hidden md:block" style={{ transform: isRtl ? "translateX(-2%)" : "translateX(-15%)" }}>
            <div style={isRtl ? { transform: "scaleX(-1)" } : undefined}>
              <LogoIllustration handClass="h-[85vh]" />
            </div>
          </div>
          <div className="md:hidden">
            <LogoIllustration handClass="h-[40vh]" />
          </div>
        </div>

        <div className="relative z-[1] w-full px-6 pb-16 text-center md:w-[55%] md:pb-0 md:ps-10 md:pe-[8%] md:text-start">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-[#C9A84C]">
            <InlineText contentKey="hero.label" fallback={t.heroLabel} />
          </p>
          <h1 className="text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#1A2B6B] sm:text-5xl md:text-[56px]">
            <InlineText contentKey="hero.title1" fallback={t.heroTitle1} />
            <br />
            <InlineText contentKey="hero.title2" fallback={t.heroTitle2} />
          </h1>
          <div className="relative mx-auto mt-3 h-[3px] w-48 overflow-hidden rounded-full bg-[#C9A84C] md:mx-0">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
          </div>
          <p className="mx-auto mt-5 max-w-[440px] text-[16px] leading-[1.7] text-[#1A2B6B]/50 md:mx-0">
            <InlineText contentKey="hero.subheadline" fallback={t.heroSubheadline} multiline />
          </p>
          <div className="mt-8 flex flex-col items-center gap-[14px] sm:flex-row sm:justify-center md:justify-start">
            <Link href="/programs" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[#C9A84C] px-7 py-3 text-sm font-semibold text-[#1A2B6B] transition-all hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:brightness-110">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <InlineText contentKey="hero.ctaPrimary" fallback={t.heroCtaPrimary} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-[#1A2B6B]/20 px-7 py-3 text-sm font-semibold text-[#1A2B6B] transition-all hover:border-[#1A2B6B]/40 hover:bg-[#1A2B6B]/[0.03]">
              <InlineText contentKey="hero.ctaSecondary" fallback={t.heroCtaSecondary} />
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-[#1A2B6B]/25">
            <InlineText contentKey="hero.trustLine" fallback={t.heroTrustLine} />
          </p>
        </div>
      </section>

      {/* ═══ SECTION DIVIDER ═══ */}
      <div className="relative h-16 bg-white">
        <svg className="absolute -top-px left-0 w-full text-white" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 C480 48, 960 48, 1440 0 L1440 64 L0 64 Z" fill="currentColor" />
        </svg>
      </div>

      {/* ═══ PROGRAMS ═══ */}
      <section className="relative overflow-hidden bg-white px-6 pb-20 pt-4 lg:pb-28">
        <ScatterLight />
        <div className="relative mx-auto max-w-6xl">
          <h2 className="mb-2 text-4xl font-bold tracking-[-0.02em] text-navy">
            <InlineText contentKey="programs.sectionTitle" fallback={t.programsSectionTitle} />
          </h2>
          <div className="mb-12 h-[2px] w-12 bg-gold" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS_META.map((p) => {
              const Icon = p.icon;
              const prog = t[p.key as keyof HomeTranslations] as { name: string; shortDesc: string };
              return (
                <Link key={p.key} href="/programs" className="group flex flex-col rounded-2xl border border-navy/[0.06] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(26,43,107,0.08)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/[0.04] text-navy transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-navy">
                    <InlineText contentKey={`programs.${p.key}.name`} fallback={prog.name} />
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-navy/50">
                    <InlineText contentKey={`programs.${p.key}.shortDesc`} fallback={prog.shortDesc} />
                  </p>
                  <span className="mt-auto text-[13px] font-semibold text-gold transition-transform duration-200 group-hover:translate-x-1">
                    Learn more →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      {(plans.length > 0 || isAdmin) && (
        <section className="relative overflow-hidden bg-warm px-6 py-20 lg:py-28">
          <ScatterWarm />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <h2 className="text-4xl font-bold tracking-[-0.02em] text-navy">Pricing</h2>
              <div className="mx-auto mt-3 h-[2px] w-12 bg-gold" />
            </div>
            <PlanEditor plans={plans} />
          </div>
        </section>
      )}

      {/* ═══ WHY ILM ═══ */}
      <section className="relative overflow-hidden bg-warm px-6 py-20 lg:py-28">
        <ScatterWarm />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold tracking-[-0.02em] text-navy">
                <InlineText contentKey="whyIlm.title" fallback={t.whyIlmTitle} />
              </h2>
              <div className="mt-3 h-[2px] w-12 bg-gold" />
            </div>
            <div className="flex flex-col gap-10 lg:col-span-3">
              {([
                { tk: "whyIlm.specialists.title", tf: t.specialistsTitle, dk: "whyIlm.specialists.desc", df: t.specialistsDesc },
                { tk: "whyIlm.tawjihi.title", tf: t.tawjihiTitle, dk: "whyIlm.tawjihi.desc", df: t.tawjihiDesc },
                { tk: "whyIlm.tailored.title", tf: t.tailoredTitle, dk: "whyIlm.tailored.desc", df: t.tailoredDesc },
              ] as const).map((item, i) => (
                <div key={item.tk} className="flex gap-5">
                  <span className="mt-1 text-[48px] font-bold leading-none text-gold/10">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">
                      <InlineText contentKey={item.tk} fallback={item.tf} />
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy/50">
                      <InlineText contentKey={item.dk} fallback={item.df} multiline />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="relative overflow-hidden bg-navy px-6 py-20 lg:py-28">
        <ScatterDark />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-white">
              <InlineText contentKey="testimonials.title" fallback={t.testimonialsTitle} />
            </h2>
            <div className="mx-auto mt-3 h-[2px] w-12 bg-gold" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { qk: "testimonials.quote1", qf: t.quote1, ak: "testimonials.author1", af: t.author1 },
              { qk: "testimonials.quote2", qf: t.quote2, ak: "testimonials.author2", af: t.author2 },
            ].map((item) => (
              <div key={item.qk} className="rounded-xl border border-white/[0.08] bg-white/[0.05] p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.08]">
                <span className="mb-3 block text-5xl leading-none text-gold">&ldquo;</span>
                <p className="text-base italic leading-[1.7] text-white/85">
                  <InlineText contentKey={item.qk} fallback={item.qf} multiline />
                </p>
                <p className="mt-5 text-[13px] text-white/45">
                  — <InlineText contentKey={item.ak} fallback={item.af} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-warm px-6 py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute text-[#C9A84C] opacity-[0.10]" style={{ right: "6%", top: "12%", width: "65px", transform: "rotate(-35deg)" }}><StarLarge /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.08]" style={{ left: "4%", bottom: "8%", width: "110px", transform: "rotate(30deg)" }}><LeafHorizontal /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.12] hidden md:block" style={{ left: "18%", top: "8%", width: "25px" }}><StarSmall /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.10] hidden md:block" style={{ right: "22%", bottom: "15%", width: "50px", transform: "rotate(55deg)" }}><LeafMedium /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.08] hidden md:block" style={{ left: "42%", bottom: "4%", width: "45px", transform: "rotate(-45deg)" }}><LeafVertical /></div>
          <div className="absolute text-[#C9A84C] opacity-[0.06] hidden md:block" style={{ right: "40%", top: "5%", width: "70px", transform: "rotate(15deg)" }}><LeafTall /></div>
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-gold/[0.2] bg-white p-10 text-center shadow-[0_0_40px_rgba(201,168,76,0.08)] lg:p-14">
            <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-gold/20 rounded-tl-md" />
            <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-gold/20 rounded-tr-md" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-gold/20 rounded-bl-md" />
            <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-gold/20 rounded-br-md" />
            <h2 className="text-[32px] font-bold tracking-tight text-navy">
              <InlineText contentKey="ctaBanner.heading" fallback={t.ctaHeading} />
            </h2>
            <p className="mt-3 text-base text-navy/50">
              <InlineText contentKey="ctaBanner.subtext" fallback={t.ctaSubtext} />
            </p>
            <Link href="/contact" className="group relative mt-8 inline-flex h-[52px] items-center overflow-hidden rounded-[10px] bg-gold px-8 text-sm font-semibold text-navy-dark transition-all hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:brightness-110">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <InlineText contentKey="ctaBanner.button" fallback={t.ctaButton} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

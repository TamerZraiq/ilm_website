"use client";

import { GraduationCap, BookOpen, Users, Target, Award, Quote } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { InlineText } from "@/components/cms/inline-text";
import { PlanEditor } from "@/components/cms/plan-editor";
import { useAdmin } from "@/lib/auth/admin-context";
import type { Database } from "@/types/database.types";

type Plan = Database["public"]["Tables"]["subscription_plans"]["Row"];

interface HomeTranslations {
  heroLabel: string;
  heroHeadline: string;
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

export function HomeClient({
  plans,
  translations: t,
}: {
  plans: Plan[];
  translations: HomeTranslations;
}) {
  const isAdmin = useAdmin();

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-navy px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-light)_0%,_var(--color-navy-dark)_70%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <InlineText contentKey="hero.label" fallback={t.heroLabel} as="p" className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold" />
          <InlineText contentKey="hero.headline" fallback={t.heroHeadline} as="h1" className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl" />
          <InlineText contentKey="hero.subheadline" fallback={t.heroSubheadline} as="p" className="mx-auto mt-6 max-w-xl text-lg text-white/70" multiline />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/programs" className="inline-flex h-12 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-light">
              <InlineText contentKey="hero.ctaPrimary" fallback={t.heroCtaPrimary} />
            </Link>
            <Link href="/contact" className="inline-flex h-12 items-center rounded-lg border border-gold px-8 text-sm font-semibold text-gold transition-colors hover:bg-gold/10">
              <InlineText contentKey="hero.ctaSecondary" fallback={t.heroCtaSecondary} />
            </Link>
          </div>
          <InlineText contentKey="hero.trustLine" fallback={t.heroTrustLine} as="p" className="mt-8 text-sm text-white/40" />
        </div>
      </section>

      {/* PROGRAMS STRIP */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <InlineText contentKey="programs.sectionTitle" fallback={t.programsSectionTitle} as="h2" className="mb-12 text-center text-3xl font-bold text-navy" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProgramCard icon={<BookOpen className="h-8 w-8" />} nameKey="programs.gcse.name" nameFallback={t.gcse.name} descKey="programs.gcse.shortDesc" descFallback={t.gcse.shortDesc} />
            <ProgramCard icon={<GraduationCap className="h-8 w-8" />} nameKey="programs.alevel.name" nameFallback={t.alevel.name} descKey="programs.alevel.shortDesc" descFallback={t.alevel.shortDesc} />
            <ProgramCard icon={<Award className="h-8 w-8" />} nameKey="programs.ib.name" nameFallback={t.ib.name} descKey="programs.ib.shortDesc" descFallback={t.ib.shortDesc} />
            <ProgramCard icon={<Target className="h-8 w-8" />} nameKey="programs.tawjihi.name" nameFallback={t.tawjihi.name} descKey="programs.tawjihi.shortDesc" descFallback={t.tawjihi.shortDesc} />
          </div>
        </div>
      </section>

      {/* WHY ILM */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <InlineText contentKey="whyIlm.title" fallback={t.whyIlmTitle} as="h2" className="mb-12 text-center text-3xl font-bold text-navy" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <WhyCard icon={<Users className="h-8 w-8 text-gold" />} titleKey="whyIlm.specialists.title" titleFallback={t.specialistsTitle} descKey="whyIlm.specialists.desc" descFallback={t.specialistsDesc} />
            <WhyCard icon={<BookOpen className="h-8 w-8 text-gold" />} titleKey="whyIlm.tawjihi.title" titleFallback={t.tawjihiTitle} descKey="whyIlm.tawjihi.desc" descFallback={t.tawjihiDesc} />
            <WhyCard icon={<Target className="h-8 w-8 text-gold" />} titleKey="whyIlm.tailored.title" titleFallback={t.tailoredTitle} descKey="whyIlm.tailored.desc" descFallback={t.tailoredDesc} />
          </div>
        </div>
      </section>

      {/* PRICING */}
      {(plans.length > 0 || isAdmin) && (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-navy">Pricing</h2>
            <PlanEditor plans={plans} />
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <InlineText contentKey="testimonials.title" fallback={t.testimonialsTitle} as="h2" className="mb-12 text-center text-3xl font-bold text-white" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8">
              <Quote className="mb-4 h-8 w-8 text-gold" />
              <InlineText contentKey="testimonials.quote1" fallback={t.quote1} as="p" className="mb-6 text-base leading-relaxed text-gray-700" multiline />
              <InlineText contentKey="testimonials.author1" fallback={t.author1} as="p" className="text-sm font-semibold text-navy" />
            </div>
            <div className="rounded-xl bg-white p-8">
              <Quote className="mb-4 h-8 w-8 text-gold" />
              <InlineText contentKey="testimonials.quote2" fallback={t.quote2} as="p" className="mb-6 text-base leading-relaxed text-gray-700" multiline />
              <InlineText contentKey="testimonials.author2" fallback={t.author2} as="p" className="text-sm font-semibold text-navy" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gold px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <InlineText contentKey="ctaBanner.heading" fallback={t.ctaHeading} as="h2" className="text-3xl font-bold text-navy" />
          <InlineText contentKey="ctaBanner.subtext" fallback={t.ctaSubtext} as="p" className="mt-4 text-lg text-navy/70" />
          <Link href="/contact" className="mt-8 inline-flex h-12 items-center rounded-lg bg-navy px-8 text-sm font-semibold text-white transition-colors hover:bg-navy-dark">
            <InlineText contentKey="ctaBanner.button" fallback={t.ctaButton} />
          </Link>
        </div>
      </section>
    </>
  );
}

function ProgramCard({ icon, nameKey, nameFallback, descKey, descFallback }: {
  icon: React.ReactNode; nameKey: string; nameFallback: string; descKey: string; descFallback: string;
}) {
  return (
    <Link href="/programs" className="group flex flex-col items-start rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-gold/30 hover:bg-navy hover:shadow-lg">
      <div className="mb-4 text-navy transition-colors group-hover:text-gold">{icon}</div>
      <InlineText contentKey={nameKey} fallback={nameFallback} as="h3" className="mb-2 text-lg font-bold text-navy transition-colors group-hover:text-white" />
      <InlineText contentKey={descKey} fallback={descFallback} as="p" className="text-sm text-gray-600 transition-colors group-hover:text-white/70" />
      <span className="mt-4 text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">→</span>
    </Link>
  );
}

function WhyCard({ icon, titleKey, titleFallback, descKey, descFallback }: {
  icon: React.ReactNode; titleKey: string; titleFallback: string; descKey: string; descFallback: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">{icon}</div>
      <InlineText contentKey={titleKey} fallback={titleFallback} as="h3" className="mb-3 text-lg font-bold text-navy" />
      <InlineText contentKey={descKey} fallback={descFallback} as="p" className="text-sm leading-relaxed text-gray-600" multiline />
    </div>
  );
}

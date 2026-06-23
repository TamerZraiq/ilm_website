import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { GraduationCap, BookOpen, Users, Target, Award, Quote } from "lucide-react";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Expert Tutoring in Palestine",
  description:
    "Expert tutoring for GCSE, A-Level, IB, and Tawjihi students. Personalised sessions built around each student's goals.",
};

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-navy px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-light)_0%,_var(--color-navy-dark)_70%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            {t("hero.label")}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("hero.headline")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            {t("hero.subheadline")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/programs"
              className="inline-flex h-12 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-lg border border-gold px-8 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/40">{t("hero.trustLine")}</p>
        </div>
      </section>

      {/* PROGRAMS STRIP */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-navy">
            {t("programs.sectionTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProgramCard
              icon={<BookOpen className="h-8 w-8" />}
              name={t("programs.gcse.name")}
              desc={t("programs.gcse.shortDesc")}
            />
            <ProgramCard
              icon={<GraduationCap className="h-8 w-8" />}
              name={t("programs.alevel.name")}
              desc={t("programs.alevel.shortDesc")}
            />
            <ProgramCard
              icon={<Award className="h-8 w-8" />}
              name={t("programs.ib.name")}
              desc={t("programs.ib.shortDesc")}
            />
            <ProgramCard
              icon={<Target className="h-8 w-8" />}
              name={t("programs.tawjihi.name")}
              desc={t("programs.tawjihi.shortDesc")}
            />
          </div>
        </div>
      </section>

      {/* WHY ILM */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-navy">
            {t("whyIlm.title")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <WhyCard
              icon={<Users className="h-8 w-8 text-gold" />}
              title={t("whyIlm.specialists.title")}
              desc={t("whyIlm.specialists.desc")}
            />
            <WhyCard
              icon={<BookOpen className="h-8 w-8 text-gold" />}
              title={t("whyIlm.tawjihi.title")}
              desc={t("whyIlm.tawjihi.desc")}
            />
            <WhyCard
              icon={<Target className="h-8 w-8 text-gold" />}
              title={t("whyIlm.tailored.title")}
              desc={t("whyIlm.tailored.desc")}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* TODO: Replace with real testimonials from client */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            {t("testimonials.title")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <TestimonialCard
              quote={t("testimonials.quote1")}
              author={t("testimonials.author1")}
            />
            <TestimonialCard
              quote={t("testimonials.quote2")}
              author={t("testimonials.author2")}
            />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gold px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy">
            {t("ctaBanner.heading")}
          </h2>
          <p className="mt-4 text-lg text-navy/70">{t("ctaBanner.subtext")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-navy px-8 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
          >
            {t("ctaBanner.button")}
          </Link>
        </div>
      </section>
    </>
  );
}

function ProgramCard({
  icon,
  name,
  desc,
}: {
  icon: React.ReactNode;
  name: string;
  desc: string;
}) {
  return (
    <Link
      href="/programs"
      className="group flex flex-col items-start rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-gold/30 hover:bg-navy hover:shadow-lg"
    >
      <div className="mb-4 text-navy transition-colors group-hover:text-gold">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-navy transition-colors group-hover:text-white">
        {name}
      </h3>
      <p className="text-sm text-gray-600 transition-colors group-hover:text-white/70">
        {desc}
      </p>
      <span className="mt-4 text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}

function WhyCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-bold text-navy">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <div className="rounded-xl bg-white p-8">
      <Quote className="mb-4 h-8 w-8 text-gold" />
      <p className="mb-6 text-base leading-relaxed text-gray-700">{quote}</p>
      <p className="text-sm font-semibold text-navy">— {author}</p>
    </div>
  );
}

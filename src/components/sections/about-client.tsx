"use client";

import { Award, User, Users } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { InlineText } from "@/components/cms/inline-text";
import { TeacherEditor } from "@/components/cms/teacher-editor";
import type { Database } from "@/types/database.types";

type Teacher = Database["public"]["Tables"]["teachers"]["Row"];

interface AboutTranslations {
  pageTitle: string;
  story1: string;
  story2: string;
  valuesTitle: string;
  excellenceTitle: string;
  excellenceDesc: string;
  personalisationTitle: string;
  personalisationDesc: string;
  communityTitle: string;
  communityDesc: string;
  teamTitle: string;
}

export function AboutClient({ teachers, translations: t }: { teachers: Teacher[]; translations: AboutTranslations }) {
  return (
    <>
      {/* STORY — editorial, left-aligned */}
      <section className="bg-warm px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              <InlineText contentKey="about.pageTitle" fallback={t.pageTitle} />
            </h1>
          </Reveal>
          <div className="mt-10 max-w-2xl">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-navy/60">
                <InlineText contentKey="about.story1" fallback={t.story1} multiline />
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-navy/60">
                <InlineText contentKey="about.story2" fallback={t.story2} multiline />
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES — white cards */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-navy">
              <InlineText contentKey="about.valuesTitle" fallback={t.valuesTitle} />
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: <Award className="h-6 w-6 text-gold" />, tk: "about.excellence.title", tf: t.excellenceTitle, dk: "about.excellence.desc", df: t.excellenceDesc },
              { icon: <User className="h-6 w-6 text-gold" />, tk: "about.personalisation.title", tf: t.personalisationTitle, dk: "about.personalisation.desc", df: t.personalisationDesc },
              { icon: <Users className="h-6 w-6 text-gold" />, tk: "about.community.title", tf: t.communityTitle, dk: "about.community.desc", df: t.communityDesc },
            ].map((v, i) => (
              <Reveal key={v.tk} delay={i * 0.1}>
                <div className="rounded-xl border border-navy/[0.06] bg-white p-8 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy">
                    <InlineText contentKey={v.tk} fallback={v.tf} />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/50">
                    <InlineText contentKey={v.dk} fallback={v.df} multiline />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-warm px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-navy">
              <InlineText contentKey="about.teamTitle" fallback={t.teamTitle} />
            </h2>
          </Reveal>
          <TeacherEditor teachers={teachers} />
        </div>
      </section>
    </>
  );
}

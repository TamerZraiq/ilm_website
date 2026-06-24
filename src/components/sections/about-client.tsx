"use client";

import { Award, User, Users } from "lucide-react";
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
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <InlineText contentKey="about.pageTitle" fallback={t.pageTitle} as="h1" className="mb-8 text-4xl font-bold text-white" />
          <InlineText contentKey="about.story1" fallback={t.story1} as="p" className="mb-6 text-lg leading-relaxed text-white/80" multiline />
          <InlineText contentKey="about.story2" fallback={t.story2} as="p" className="text-lg leading-relaxed text-white/70" multiline />
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <InlineText contentKey="about.valuesTitle" fallback={t.valuesTitle} as="h2" className="mb-12 text-center text-3xl font-bold text-navy" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ValueCard icon={<Award className="h-8 w-8 text-gold" />} titleKey="about.excellence.title" titleFallback={t.excellenceTitle} descKey="about.excellence.desc" descFallback={t.excellenceDesc} />
            <ValueCard icon={<User className="h-8 w-8 text-gold" />} titleKey="about.personalisation.title" titleFallback={t.personalisationTitle} descKey="about.personalisation.desc" descFallback={t.personalisationDesc} />
            <ValueCard icon={<Users className="h-8 w-8 text-gold" />} titleKey="about.community.title" titleFallback={t.communityTitle} descKey="about.community.desc" descFallback={t.communityDesc} />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <InlineText contentKey="about.teamTitle" fallback={t.teamTitle} as="h2" className="mb-12 text-center text-3xl font-bold text-navy" />
          <TeacherEditor teachers={teachers} />
        </div>
      </section>
    </>
  );
}

function ValueCard({ icon, titleKey, titleFallback, descKey, descFallback }: {
  icon: React.ReactNode; titleKey: string; titleFallback: string; descKey: string; descFallback: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">{icon}</div>
      <InlineText contentKey={titleKey} fallback={titleFallback} as="h3" className="mb-3 text-lg font-bold text-navy" />
      <InlineText contentKey={descKey} fallback={descFallback} as="p" className="text-sm leading-relaxed text-gray-600" multiline />
    </div>
  );
}

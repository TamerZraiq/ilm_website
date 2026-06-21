import { useTranslations } from "next-intl";
import { Award, User, Users } from "lucide-react";

// TODO: Replace with real team data and photos from client
const TEAM = [
  {
    name: "TBD",
    title: "Mathematics Tutor",
    subjects: ["GCSE Maths", "A-Level Maths"],
    bio: "Specialist in GCSE and A-Level Maths with a focus on exam technique.",
    initials: "TBD",
  },
  {
    name: "TBD",
    title: "Science Tutor",
    subjects: ["Physics", "Chemistry"],
    bio: "Expert in A-Level and IB Sciences with extensive lab experience.",
    initials: "TBD",
  },
  {
    name: "TBD",
    title: "English Language Tutor",
    subjects: ["English Literature", "English Language"],
    bio: "Experienced in GCSE and IB English with a passion for critical analysis.",
    initials: "TBD",
  },
  {
    name: "TBD",
    title: "Tawjihi Tutor",
    subjects: ["Tawjihi Maths", "Tawjihi Sciences"],
    bio: "Deep knowledge of the Palestinian Ministry of Education curriculum.",
    initials: "TBD",
  },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* STORY */}
      {/* TODO: Replace with client's real story */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-8 text-4xl font-bold text-white">
            {t("pageTitle")}
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-white/80">
            {t("story1")}
          </p>
          <p className="text-lg leading-relaxed text-white/70">{t("story2")}</p>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-navy">
            {t("valuesTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ValueCard
              icon={<Award className="h-8 w-8 text-gold" />}
              title={t("excellence.title")}
              desc={t("excellence.desc")}
            />
            <ValueCard
              icon={<User className="h-8 w-8 text-gold" />}
              title={t("personalisation.title")}
              desc={t("personalisation.desc")}
            />
            <ValueCard
              icon={<Users className="h-8 w-8 text-gold" />}
              title={t("community.title")}
              desc={t("community.desc")}
            />
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-navy">
            {t("teamTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-lg font-bold text-gold">
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-navy">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-gold">
                  {member.title}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {member.subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-bold text-navy">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
}

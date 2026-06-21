import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

const GCSE_SUBJECTS = [
  "Mathematics",
  "Further Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Language",
  "English Literature",
  "Arabic Language",
  "History",
  "Geography",
  "Economics",
  "Business Studies",
  "Art & Design",
];

const ALEVEL_SUBJECTS = [
  "Mathematics",
  "Further Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Business Studies",
  "Psychology",
  "English Literature",
  "Arabic Language",
  "History",
  "Sociology",
];

const IB_SUBJECTS = [
  "Mathematics: Analysis & Approaches",
  "Mathematics: Applications & Interpretation",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Business Management",
  "Psychology",
  "English A: Literature",
  "English B",
  "Arabic B",
  "History",
  "Geography",
  "Environmental Systems",
];

const TAWJIHI_SUBJECTS = [
  "Arabic Language",
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Islamic Education",
  "Physical Education",
  "Computer Science",
  "Economics",
];

export default function ProgramsPage() {
  const t = useTranslations("programs");

  return (
    <>
      <section className="bg-navy px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white">{t("pageTitle")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t("pageIntro")}
          </p>
        </div>
      </section>

      <ProgramSection
        title={t("gcse.name")}
        desc={t("gcse.longDesc")}
        subjects={GCSE_SUBJECTS}
        bg="white"
      />

      <ProgramSection
        title={t("alevel.name")}
        desc={t("alevel.longDesc")}
        subjects={ALEVEL_SUBJECTS}
        bg="gray"
      />

      <ProgramSection
        title={t("ib.name")}
        desc={t("ib.longDesc")}
        subjects={IB_SUBJECTS}
        bg="white"
        note="HL/SL available"
      />

      <ProgramSection
        title={t("tawjihi.name")}
        desc={t("tawjihi.longDesc")}
        subjects={TAWJIHI_SUBJECTS}
        bg="gray"
        note={t("tawjihiBranches")}
      />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-navy">{t("ctaHeading")}</h2>
          <p className="mt-3 text-gray-600">{t("ctaText")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}

function ProgramSection({
  title,
  desc,
  subjects,
  bg,
  note,
}: {
  title: string;
  desc: string;
  subjects: string[];
  bg: "white" | "gray";
  note?: string;
}) {
  return (
    <section className={`px-6 py-16 ${bg === "gray" ? "bg-gray-50" : "bg-white"}`}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-2xl font-bold text-navy">{title}</h2>
        <p className="mb-8 max-w-3xl text-gray-600">{desc}</p>
        <div className="flex flex-wrap gap-3">
          {subjects.map((subject) => (
            <Badge
              key={subject}
              className="bg-navy px-3 py-1.5 text-sm text-white"
            >
              {subject}
            </Badge>
          ))}
        </div>
        {note && (
          <p className="mt-6 text-sm font-medium text-gold">{note}</p>
        )}
      </div>
    </section>
  );
}

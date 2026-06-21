import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("nav");

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      <h1 className="text-4xl font-bold text-navy">{t("home")}</h1>
      <p className="mt-4 text-lg text-gray-600">
        Ilm Learning Center — Coming soon
      </p>
    </div>
  );
}

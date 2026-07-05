"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-navy px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
        <p className="mt-3 text-lg text-white/65">{t("message")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center rounded-lg bg-gold px-8 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            {t("tryAgain")}
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-lg border border-gold px-8 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}

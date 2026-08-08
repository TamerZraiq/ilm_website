"use client";

import { useTranslations } from "next-intl";
import { ButtonRoute } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");

  return (
    <section className="grain on-dark relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-navy-deep px-6 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(201,168,76,0.5) 0%, transparent 62%)",
        }}
      />
      <div className="relative text-center">
        <h1 className="t-h2 text-white text-balance">{t("title")}</h1>
        <p className="t-lead mx-auto mt-5 max-w-[40ch] text-white/70 text-pretty">
          {t("message")}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-14 items-center rounded-[14px] bg-gold px-9 text-[15px] font-semibold text-navy transition-[transform,filter,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] hover:brightness-[1.08] active:scale-[0.97] active:duration-[120ms]"
          >
            {t("tryAgain")}
          </button>
          <ButtonRoute href="/" variant="onDark" size="lg">
            {t("goHome")}
          </ButtonRoute>
        </div>
      </div>
    </section>
  );
}

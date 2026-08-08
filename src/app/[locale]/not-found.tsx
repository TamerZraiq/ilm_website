import { getTranslations } from "next-intl/server";
import { ButtonRoute } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("errors");

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
        <p aria-hidden className="t-mega leading-none text-white/[0.07]">
          404
        </p>
        <h1 className="t-h2 -mt-[0.32em] text-white text-balance">{t("notFoundTitle")}</h1>
        <p className="t-lead mx-auto mt-5 max-w-[40ch] text-white/70 text-pretty">
          {t("notFoundMessage")}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonRoute href="/" variant="primary" size="lg">
            {t("goHome")}
          </ButtonRoute>
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import { requireRole } from "@/lib/auth/roles";
import { ProtectedPageShell } from "@/components/layout/protected-page-shell";

export default async function TeacherPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await requireRole("teacher", locale);
  const t = await getTranslations("auth");

  return (
    <ProtectedPageShell
      title={`Teacher Portal — ${t("comingSoon")}`}
      email={user.email ?? ""}
      role={user.app_metadata?.user_role ?? "teacher"}
      locale={locale}
      t={{
        signOut: t("signOut"),
        role: t("role"),
      }}
    />
  );
}

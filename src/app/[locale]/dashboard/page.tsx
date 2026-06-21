import { getTranslations } from "next-intl/server";
import { requireAuth } from "@/lib/auth/roles";
import { ProtectedPageShell } from "@/components/layout/protected-page-shell";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await requireAuth(locale);
  const t = await getTranslations("auth");

  return (
    <ProtectedPageShell
      title={`Student Dashboard — ${t("comingSoon")}`}
      email={user.email ?? ""}
      role={user.app_metadata?.user_role ?? "student"}
      locale={locale}
      t={{
        signOut: t("signOut"),
        role: t("role"),
      }}
    />
  );
}

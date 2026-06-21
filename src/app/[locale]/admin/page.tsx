import { getTranslations } from "next-intl/server";
import { requireRole } from "@/lib/auth/roles";
import { ProtectedPageShell } from "@/components/layout/protected-page-shell";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await requireRole("admin", locale);
  const t = await getTranslations("auth");

  return (
    <ProtectedPageShell
      title={`Admin Panel — ${t("comingSoon")}`}
      email={user.email ?? ""}
      role={user.app_metadata?.user_role ?? "admin"}
      locale={locale}
      t={{
        signOut: t("signOut"),
        role: t("role"),
      }}
    />
  );
}

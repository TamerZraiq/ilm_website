import { requireAdmin } from "@/lib/auth/admin";
import { UpdatePasswordForm } from "./update-password-form";

export default async function UpdatePasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAdmin(locale);

  return <UpdatePasswordForm locale={locale} />;
}

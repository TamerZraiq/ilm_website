import { AdminLoginForm } from "./admin-login-form";

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ reset?: string }>;
}) {
  const { locale } = await params;
  const { reset } = await searchParams;

  return <AdminLoginForm locale={locale} justReset={reset === "success"} />;
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function getAdminRole(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  return profile?.role ?? undefined;
}

export async function requireAdmin(locale = "en") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/admin/login`);

  let role = user.app_metadata?.user_role as string | undefined;
  if (!role) role = await getAdminRole(supabase, user.id);
  if (role !== "admin") redirect(`/${locale}`);

  return user;
}

export async function checkIsAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    let role = user.app_metadata?.user_role as string | undefined;
    if (!role) role = await getAdminRole(supabase, user.id);
    return role === "admin";
  } catch {
    return false;
  }
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Role } from "@/types/database.types";

export type { Role };

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserRole(): Promise<Role | null> {
  const user = await getSession();
  if (!user) return null;
  return (user.app_metadata?.user_role as Role) ?? null;
}

export async function requireAuth(locale = "en") {
  const user = await getSession();
  if (!user) {
    redirect(`/${locale}/auth/login`);
  }
  return user;
}

export async function requireRole(role: Role, locale = "en") {
  const user = await requireAuth(locale);
  const userRole = (user.app_metadata?.user_role as Role) ?? null;

  if (userRole !== role && userRole !== "admin") {
    redirect(`/${locale}`);
  }

  return user;
}

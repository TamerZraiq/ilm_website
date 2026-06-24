"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const adminLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type AdminLoginResult = {
  error?: string;
};

export async function adminLoginAction(
  locale: string,
  _prev: AdminLoginResult,
  formData: FormData
): Promise<AdminLoginResult> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "invalid_input" };
  }

  const supabase = await createClient();
  const { error, data: signInData } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "invalid_credentials" };
  }

  const userId = signInData.user?.id;
  let role = signInData.user?.app_metadata?.user_role as string | undefined;

  if (!role && userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    role = profile?.role ?? undefined;
  }

  if (role !== "admin") {
    await supabase.auth.signOut();
    return { error: "invalid_credentials" };
  }

  redirect(`/${locale}`);
}

export async function adminSignOutAction(locale: string) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${locale}`);
}

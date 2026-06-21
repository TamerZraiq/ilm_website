"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "./schemas";
import { redirect } from "next/navigation";

export type AuthResult = {
  error?: string;
  success?: boolean;
};

export async function loginAction(
  locale: string,
  redirectTo: string | null,
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "incorrectCredentials" };
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "emailNotConfirmed" };
    }
    return { error: "genericError" };
  }

  redirect(redirectTo ?? `/${locale}/dashboard`);
}

export async function signupAction(
  locale: string,
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "genericError" };
    }
    return { error: "genericError" };
  }

  return { success: true };
}

export async function signOutAction(locale: string) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${locale}`);
}

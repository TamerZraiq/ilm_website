"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { checkRateLimit } from "@/lib/rate-limit";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

async function requestAllowed(): Promise<boolean> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  try {
    return await checkRateLimit("password-reset-request", ip, 3, "1 h");
  } catch (err) {
    console.error("Password reset rate limit unavailable:", err);
    return true;
  }
}

const emailSchema = z.email();

export type ResetRequestResult = { success?: boolean; error?: string };

export async function requestPasswordReset(
  locale: string,
  _prev: ResetRequestResult,
  formData: FormData
): Promise<ResetRequestResult> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { error: "invalid_input" };

  if (!(await requestAllowed())) {
    return { error: "rate_limited" };
  }

  const supabase = await createClient();
  // Always report success, whether or not the email matches an account —
  // this is the only path that doesn't require an existing session, so
  // it's the one place an attacker could otherwise probe for valid emails.
  await supabase.auth.resetPasswordForEmail(parsed.data, {
    redirectTo: `${SITE_URL}/${locale}/admin/reset-password/confirm`,
  });

  return { success: true };
}

const updatePasswordSchema = z
  .object({
    password: z.string().min(12, "Password must be at least 12 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "passwords_mismatch",
    path: ["confirmPassword"],
  });

export type UpdatePasswordResult = { error?: string };

export async function updatePasswordAction(
  locale: string,
  _prev: UpdatePasswordResult,
  formData: FormData
): Promise<UpdatePasswordResult> {
  await requireAdmin(locale);

  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    const tooShort = parsed.error.issues.some((i) => i.path[0] === "password");
    return { error: tooShort ? "password_too_short" : "passwords_mismatch" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) return { error: "update_failed" };

  // Force a fresh sign-in with the new password rather than leaving the
  // recovery session active.
  await supabase.auth.signOut();
  redirect(`/${locale}/admin/login?reset=success`);
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import type { BillingPeriod } from "@/types/database.types";

export type ActionResult = { success: true } | { error: string };

export async function createPlan(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("subscription_plans").insert({
    name: formData.get("name") as string,
    name_ar: (formData.get("name_ar") as string) || null,
    description: (formData.get("description") as string) || null,
    description_ar: (formData.get("description_ar") as string) || null,
    price: Number(formData.get("price")),
    currency: (formData.get("currency") as string) || "USD",
    billing_period: (formData.get("billing_period") as BillingPeriod) || "month",
    features: JSON.parse((formData.get("features") as string) || "[]"),
    features_ar: JSON.parse((formData.get("features_ar") as string) || "[]"),
    display_order: Number(formData.get("display_order") || 0),
    is_active: formData.get("is_active") === "true",
  });

  if (error) return { error: "Failed to create plan" };

  revalidatePath("/", "page");
  return { success: true };
}

export async function updatePlan(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("subscription_plans")
    .update({
      name: formData.get("name") as string,
      name_ar: (formData.get("name_ar") as string) || null,
      description: (formData.get("description") as string) || null,
      description_ar: (formData.get("description_ar") as string) || null,
      price: Number(formData.get("price")),
      currency: (formData.get("currency") as string) || "USD",
      billing_period: (formData.get("billing_period") as BillingPeriod) || "month",
      features: JSON.parse((formData.get("features") as string) || "[]"),
      features_ar: JSON.parse((formData.get("features_ar") as string) || "[]"),
      display_order: Number(formData.get("display_order") || 0),
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);

  if (error) return { error: "Failed to update plan" };

  revalidatePath("/", "page");
  return { success: true };
}

export async function deletePlan(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("subscription_plans")
    .delete()
    .eq("id", id);

  if (error) return { error: "Failed to delete plan" };

  revalidatePath("/", "page");
  return { success: true };
}

export async function togglePlanActive(
  id: string,
  currentlyActive: boolean
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("subscription_plans")
    .update({ is_active: !currentlyActive })
    .eq("id", id);

  if (error) return { error: "Failed to update status" };

  revalidatePath("/", "page");
  return { success: true };
}

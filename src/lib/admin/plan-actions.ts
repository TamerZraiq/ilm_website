"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { parseJsonField } from "@/lib/admin/form-utils";

export type ActionResult = { success: true } | { error: string };

const planSchema = z.object({
  name: z.string().trim().min(1).max(100),
  name_ar: z.string().trim().max(100).transform((v) => v || null),
  description: z.string().trim().max(1000).transform((v) => v || null),
  description_ar: z.string().trim().max(1000).transform((v) => v || null),
  price: z.coerce.number().min(0).max(99_999_999),
  currency: z
    .string()
    .trim()
    .max(8)
    .transform((v) => v || "USD"),
  billing_period: z.enum(["month", "term", "year"]).catch("month"),
  features: z.array(z.string().trim().min(1).max(200)).max(50),
  features_ar: z.array(z.string().trim().min(1).max(200)).max(50),
  display_order: z.coerce.number().int().min(0).max(10_000).catch(0),
  is_active: z.boolean(),
});

function parsePlanForm(formData: FormData) {
  return planSchema.safeParse({
    name: formData.get("name") ?? "",
    name_ar: formData.get("name_ar") ?? "",
    description: formData.get("description") ?? "",
    description_ar: formData.get("description_ar") ?? "",
    price: formData.get("price") ?? 0,
    currency: formData.get("currency") ?? "",
    billing_period: formData.get("billing_period") ?? "month",
    features: parseJsonField(formData.get("features")),
    features_ar: parseJsonField(formData.get("features_ar")),
    display_order: formData.get("display_order") ?? 0,
    is_active: formData.get("is_active") === "true",
  });
}

function revalidatePlans() {
  revalidateTag("plans", "max");
  revalidatePath("/", "page");
}

export async function createPlan(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parsePlanForm(formData);
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase.from("subscription_plans").insert(parsed.data);

  if (error) return { error: "Failed to create plan" };

  revalidatePlans();
  return { success: true };
}

export async function updatePlan(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parsePlanForm(formData);
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("subscription_plans")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { error: "Failed to update plan" };

  revalidatePlans();
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

  revalidatePlans();
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

  revalidatePlans();
  return { success: true };
}

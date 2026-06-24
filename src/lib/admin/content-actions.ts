"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

export async function upsertContent(
  key: string,
  valueEn: string,
  valueAr: string | null
): Promise<{ success: true } | { error: string }> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value_en: valueEn, value_ar: valueAr }, { onConflict: "key" });

  if (error) return { error: "Failed to save content" };

  revalidatePath("/", "layout");
  return { success: true };
}

export async function upsertMultipleContent(
  entries: { key: string; value_en: string; value_ar: string | null }[]
): Promise<{ success: true } | { error: string }> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("site_content")
    .upsert(entries, { onConflict: "key" });

  if (error) return { error: "Failed to save content" };

  revalidatePath("/", "layout");
  return { success: true };
}

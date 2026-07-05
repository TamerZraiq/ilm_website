"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

const contentEntrySchema = z.object({
  key: z.string().trim().min(1).max(200),
  value_en: z.string().max(5000),
  value_ar: z.string().max(5000).nullable(),
});

function revalidateContent() {
  revalidateTag("site-content", "max");
  revalidatePath("/", "layout");
}

export async function upsertContent(
  key: string,
  valueEn: string,
  valueAr: string | null
): Promise<{ success: true } | { error: string }> {
  await requireAdmin();

  const parsed = contentEntrySchema.safeParse({
    key,
    value_en: valueEn,
    value_ar: valueAr,
  });
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert(parsed.data, { onConflict: "key" });

  if (error) return { error: "Failed to save content" };

  revalidateContent();
  return { success: true };
}

export async function upsertMultipleContent(
  entries: { key: string; value_en: string; value_ar: string | null }[]
): Promise<{ success: true } | { error: string }> {
  await requireAdmin();

  const parsed = z.array(contentEntrySchema).max(100).safeParse(entries);
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert(parsed.data, { onConflict: "key" });

  if (error) return { error: "Failed to save content" };

  revalidateContent();
  return { success: true };
}

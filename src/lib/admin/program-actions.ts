"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

export type ActionResult = { success: true } | { error: string };

export async function createProgram(data: {
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  subjects?: string[];
  subjects_ar?: string[];
  display_order?: number;
}): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("programs").insert({
    name: data.name,
    name_ar: data.name_ar ?? null,
    description: data.description ?? null,
    description_ar: data.description_ar ?? null,
    subjects: data.subjects ?? [],
    subjects_ar: data.subjects_ar ?? [],
    display_order: data.display_order ?? 0,
  });

  if (error) return { error: "Failed to create program" };

  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateProgram(
  id: string,
  data: {
    name?: string;
    name_ar?: string | null;
    description?: string | null;
    description_ar?: string | null;
    subjects?: string[];
    subjects_ar?: string[];
    display_order?: number;
    is_visible?: boolean;
  }
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("programs")
    .update(data)
    .eq("id", id);

  if (error) return { error: "Failed to update program" };

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteProgram(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("programs").delete().eq("id", id);

  if (error) return { error: "Failed to delete program" };

  revalidatePath("/", "layout");
  return { success: true };
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

export type ActionResult = { success: true } | { error: string };

export async function createTeacher(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("teachers").insert({
    full_name: formData.get("full_name") as string,
    full_name_ar: (formData.get("full_name_ar") as string) || null,
    bio: (formData.get("bio") as string) || null,
    bio_ar: (formData.get("bio_ar") as string) || null,
    subjects: JSON.parse((formData.get("subjects") as string) || "[]"),
    avatar_url: (formData.get("avatar_url") as string) || null,
    display_order: Number(formData.get("display_order") || 0),
    is_visible: formData.get("is_visible") === "true",
  });

  if (error) return { error: "Failed to create teacher" };

  revalidatePath("/about", "page");
  return { success: true };
}

export async function updateTeacher(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("teachers")
    .update({
      full_name: formData.get("full_name") as string,
      full_name_ar: (formData.get("full_name_ar") as string) || null,
      bio: (formData.get("bio") as string) || null,
      bio_ar: (formData.get("bio_ar") as string) || null,
      subjects: JSON.parse((formData.get("subjects") as string) || "[]"),
      avatar_url: (formData.get("avatar_url") as string) || null,
      display_order: Number(formData.get("display_order") || 0),
      is_visible: formData.get("is_visible") === "true",
    })
    .eq("id", id);

  if (error) return { error: "Failed to update teacher" };

  revalidatePath("/about", "page");
  return { success: true };
}

export async function deleteTeacher(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("teachers").delete().eq("id", id);

  if (error) return { error: "Failed to delete teacher" };

  revalidatePath("/about", "page");
  return { success: true };
}

export async function toggleTeacherVisibility(
  id: string,
  currentlyVisible: boolean
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("teachers")
    .update({ is_visible: !currentlyVisible })
    .eq("id", id);

  if (error) return { error: "Failed to update visibility" };

  revalidatePath("/about", "page");
  return { success: true };
}

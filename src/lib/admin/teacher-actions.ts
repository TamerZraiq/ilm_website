"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { parseJsonField } from "@/lib/admin/form-utils";

export type ActionResult = { success: true } | { error: string };

const teacherSchema = z.object({
  full_name: z.string().trim().min(1).max(100),
  full_name_ar: z.string().trim().max(100).transform((v) => v || null),
  bio: z.string().trim().max(2000).transform((v) => v || null),
  bio_ar: z.string().trim().max(2000).transform((v) => v || null),
  subjects: z.array(z.string().trim().min(1).max(100)).max(50),
  avatar_url: z
    .union([z.literal(""), z.url().max(500)])
    .transform((v) => v || null),
  display_order: z.coerce.number().int().min(0).max(10_000).catch(0),
  is_visible: z.boolean(),
});

function parseTeacherForm(formData: FormData) {
  return teacherSchema.safeParse({
    full_name: formData.get("full_name") ?? "",
    full_name_ar: formData.get("full_name_ar") ?? "",
    bio: formData.get("bio") ?? "",
    bio_ar: formData.get("bio_ar") ?? "",
    subjects: parseJsonField(formData.get("subjects")),
    avatar_url: formData.get("avatar_url") ?? "",
    display_order: formData.get("display_order") ?? 0,
    is_visible: formData.get("is_visible") === "true",
  });
}

function revalidateTeachers() {
  revalidateTag("teachers", "max");
  revalidatePath("/about", "page");
}

export async function createTeacher(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseTeacherForm(formData);
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").insert(parsed.data);

  if (error) return { error: "Failed to create teacher" };

  revalidateTeachers();
  return { success: true };
}

export async function updateTeacher(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseTeacherForm(formData);
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("teachers")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { error: "Failed to update teacher" };

  revalidateTeachers();
  return { success: true };
}

export async function deleteTeacher(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("teachers").delete().eq("id", id);

  if (error) return { error: "Failed to delete teacher" };

  revalidateTeachers();
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

  revalidateTeachers();
  return { success: true };
}

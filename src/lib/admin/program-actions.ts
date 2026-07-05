"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

export type ActionResult = { success: true } | { error: string };

const programSchema = z.object({
  name: z.string().trim().min(1).max(100),
  name_ar: z.string().trim().max(100).nullish(),
  description: z.string().trim().max(2000).nullish(),
  description_ar: z.string().trim().max(2000).nullish(),
  subjects: z.array(z.string().trim().min(1).max(100)).max(60).optional(),
  subjects_ar: z.array(z.string().trim().min(1).max(100)).max(60).optional(),
  display_order: z.number().int().min(0).max(10_000).optional(),
  is_visible: z.boolean().optional(),
});

function revalidatePrograms() {
  revalidateTag("programs", "max");
  revalidatePath("/", "layout");
}

export async function createProgram(
  data: z.input<typeof programSchema>
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = programSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase.from("programs").insert({
    name: parsed.data.name,
    name_ar: parsed.data.name_ar ?? null,
    description: parsed.data.description ?? null,
    description_ar: parsed.data.description_ar ?? null,
    subjects: parsed.data.subjects ?? [],
    subjects_ar: parsed.data.subjects_ar ?? [],
    display_order: parsed.data.display_order ?? 0,
  });

  if (error) return { error: "Failed to create program" };

  revalidatePrograms();
  return { success: true };
}

export async function updateProgram(
  id: string,
  data: Partial<z.input<typeof programSchema>>
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = programSchema.partial().safeParse(data);
  if (!parsed.success) return { error: "Invalid input" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("programs")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { error: "Failed to update program" };

  revalidatePrograms();
  return { success: true };
}

export async function deleteProgram(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("programs").delete().eq("id", id);

  if (error) return { error: "Failed to delete program" };

  revalidatePrograms();
  return { success: true };
}

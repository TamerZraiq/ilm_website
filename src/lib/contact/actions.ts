"use server";

import { contactSchema } from "./schemas";

export async function submitContactForm(
  data: unknown
): Promise<{ success: true } | { error: string }> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  // TODO: Replace with Resend email in Phase 4
  console.log("Contact form submission:", parsed.data);

  return { success: true };
}

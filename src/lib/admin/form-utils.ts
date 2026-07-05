// FormData can only carry strings, so array fields arrive as JSON.
// Returns unknown so the caller's Zod schema stays the single validator.
export function parseJsonField(value: FormDataEntryValue | null): unknown {
  if (typeof value !== "string" || value === "") return [];
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

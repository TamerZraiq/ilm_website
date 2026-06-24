import { createClient } from "@/lib/supabase/server";

export type ContentMap = Record<string, { en: string; ar: string | null }>;

export async function getSiteContent(): Promise<ContentMap> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_content").select("key, value_en, value_ar");

  const map: ContentMap = {};
  if (data) {
    for (const row of data) {
      map[row.key] = { en: row.value_en, ar: row.value_ar };
    }
  }
  return map;
}

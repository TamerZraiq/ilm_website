import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";

export type ContentMap = Record<string, { en: string; ar: string | null }>;

export const getSiteContent = unstable_cache(
  async (): Promise<ContentMap> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_content")
      .select("key, value_en, value_ar");

    const map: ContentMap = {};
    for (const row of data ?? []) {
      map[row.key] = { en: row.value_en, ar: row.value_ar };
    }
    return map;
  },
  ["site-content"],
  { tags: ["site-content"], revalidate: 3600 }
);

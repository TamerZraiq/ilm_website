import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";

// Cached public reads for anonymous visitors. RLS already limits the anon
// client to active/visible rows. Admin pages fetch fresh with the cookie
// client instead, so editors always see unpublished rows.

export const getPublicPlans = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("subscription_plans")
      .select("*")
      .order("display_order");
    return data ?? [];
  },
  ["public-plans"],
  { tags: ["plans"], revalidate: 3600 }
);

export const getPublicPrograms = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("display_order");
    return data ?? [];
  },
  ["public-programs"],
  { tags: ["programs"], revalidate: 3600 }
);

export const getPublicTeachers = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("teachers")
      .select("*")
      .order("display_order");
    return data ?? [];
  },
  ["public-teachers"],
  { tags: ["teachers"], revalidate: 3600 }
);

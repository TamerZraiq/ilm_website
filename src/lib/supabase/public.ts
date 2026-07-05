import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Cookie-less anon client for public data reads. Safe to use inside
// unstable_cache because it never touches request state; RLS limits it
// to publicly visible rows.
export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

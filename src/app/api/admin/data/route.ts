import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkIsAdmin } from "@/lib/auth/admin";

// Client-side admin bootstrap. The public pages are statically rendered and
// never read cookies, so anything that depends on the logged-in admin — the
// edit toolbar and the full row set including hidden/inactive items — is loaded
// from here after hydration. Non-admins get a cheap { isAdmin: false }.
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await checkIsAdmin())) {
    return NextResponse.json({ isAdmin: false });
  }

  const supabase = await createClient();
  const [plans, programs, teachers] = await Promise.all([
    supabase.from("subscription_plans").select("*").order("display_order"),
    supabase.from("programs").select("*").order("display_order"),
    supabase.from("teachers").select("*").order("display_order"),
  ]);

  return NextResponse.json(
    {
      isAdmin: true,
      plans: plans.data ?? [],
      programs: programs.data ?? [],
      teachers: teachers.data ?? [],
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

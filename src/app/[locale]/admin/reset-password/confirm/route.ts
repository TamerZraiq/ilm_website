import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const code = new URL(request.url).searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(
        new URL(`/${locale}/admin/reset-password/update`, request.url)
      );
    }
  }

  return NextResponse.redirect(
    new URL(`/${locale}/admin/reset-password?error=invalid_link`, request.url)
  );
}

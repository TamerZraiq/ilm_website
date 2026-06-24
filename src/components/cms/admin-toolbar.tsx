"use client";

import { useAdmin } from "@/lib/auth/admin-context";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { LogOut, Shield } from "lucide-react";
import { adminSignOutAction } from "@/lib/auth/admin-actions";

export function AdminToolbar() {
  const isAdmin = useAdmin();
  const t = useTranslations("cms");
  const adminT = useTranslations("admin");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  if (!isAdmin) return null;

  const boundSignOut = adminSignOutAction.bind(null, locale);

  return (
    <div className="sticky top-0 z-[60] flex items-center justify-between bg-gold px-4 py-1.5">
      <div className="flex items-center gap-2 text-sm font-semibold text-navy">
        <Shield className="size-4" />
        {t("adminMode")}
      </div>
      <form action={boundSignOut}>
        <button
          type="submit"
          className="flex items-center gap-1.5 text-sm font-medium text-navy/70 transition-colors hover:text-navy"
        >
          <LogOut className="size-3.5" />
          {adminT("signOut")}
        </button>
      </form>
    </div>
  );
}

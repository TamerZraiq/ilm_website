"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminLoginAction, type AdminLoginResult } from "@/lib/auth/admin-actions";

export default function AdminLoginPage() {
  const t = useTranslations("admin");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  const boundAction = adminLoginAction.bind(null, locale);
  const [state, formAction, isPending] = useActionState<AdminLoginResult, FormData>(
    boundAction,
    {}
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <Card className="w-full max-w-md border-gold/20 bg-white">
        <CardHeader className="items-center gap-2 pb-2">
          <div className="flex items-center gap-2 text-navy">
            <BookOpen className="size-6" />
            <span className="text-xl font-bold">Ilm Learning Center</span>
          </div>
          <CardTitle className="text-center text-lg font-medium text-navy/70">
            {t("signIn")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            {state.error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {t("invalidCredentials")}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="mt-2 bg-navy text-white hover:bg-navy-light"
            >
              {isPending ? t("signingIn") : t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

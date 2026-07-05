"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  updatePasswordAction,
  type UpdatePasswordResult,
} from "@/lib/auth/reset-actions";

const ERROR_KEYS: Record<string, string> = {
  password_too_short: "passwordTooShort",
  passwords_mismatch: "passwordMismatch",
  update_failed: "invalidCredentials",
};

export function UpdatePasswordForm({ locale }: { locale: string }) {
  const t = useTranslations("admin");

  const boundAction = updatePasswordAction.bind(null, locale);
  const [state, formAction, isPending] = useActionState<
    UpdatePasswordResult,
    FormData
  >(boundAction, {});

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <Card className="w-full max-w-md border-gold/20 bg-white">
        <CardHeader className="items-center gap-2 pb-2">
          <div className="flex items-center gap-2 text-navy">
            <BookOpen className="size-6" />
            <span className="text-xl font-bold">Ilm Learning Center</span>
          </div>
          <CardTitle className="text-center text-lg font-medium text-navy/70">
            {t("updatePasswordTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            {state.error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {t(ERROR_KEYS[state.error] ?? "invalidCredentials")}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">{t("newPassword")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={12}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={12}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="mt-2 bg-navy text-white hover:bg-navy-light"
            >
              {isPending ? t("updating") : t("updatePassword")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

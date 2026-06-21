"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { loginAction, type AuthResult } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const t = useTranslations("auth");
  const params = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const boundAction = loginAction.bind(
    null,
    params.locale,
    redirectTo
  );
  const [state, formAction, isPending] = useActionState<AuthResult, FormData>(
    boundAction,
    {}
  );

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-navy">
            {t("loginTitle")}
          </CardTitle>
          <CardDescription>
            {t("noAccount")}{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-gold hover:text-gold-dark"
            >
              {t("signUpLink")}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {t.has(state.error)
                  ? t(state.error as "incorrectCredentials" | "emailNotConfirmed" | "genericError")
                  : state.error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-navy text-white hover:bg-navy-light"
            >
              {isPending ? t("signingIn") : t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

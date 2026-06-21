import { signOutAction } from "@/lib/auth/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProtectedPageShellProps {
  title: string;
  email: string;
  role: string;
  locale: string;
  t: {
    signOut: string;
    role: string;
  };
}

export function ProtectedPageShell({
  title,
  email,
  role,
  locale,
  t,
}: ProtectedPageShellProps) {
  const boundSignOut = signOutAction.bind(null, locale);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-navy">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">{email}</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{t.role}:</span>
            <span className="rounded-md bg-navy/10 px-2 py-0.5 text-xs font-medium text-navy">
              {role}
            </span>
          </div>
          <Separator />
          <form action={boundSignOut}>
            <Button
              type="submit"
              variant="outline"
              className="w-full"
            >
              {t.signOut}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

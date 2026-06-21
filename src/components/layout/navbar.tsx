import { getSession } from "@/lib/auth/roles";
import { NavbarClient } from "./navbar-client";

export async function Navbar({ locale }: { locale: string }) {
  const user = await getSession();

  const firstName = user?.user_metadata?.full_name
    ? (user.user_metadata.full_name as string).split(" ")[0]
    : null;

  return (
    <NavbarClient
      locale={locale}
      user={
        user
          ? {
              firstName: firstName ?? user.email?.split("@")[0] ?? "",
              email: user.email ?? "",
            }
          : null
      }
    />
  );
}

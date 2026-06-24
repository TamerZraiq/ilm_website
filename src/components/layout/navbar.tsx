import { NavbarClient } from "./navbar-client";

export async function Navbar({ locale }: { locale: string }) {
  return <NavbarClient locale={locale} />;
}

import { NavbarClient } from "./navbar-client";

export function Navbar({ locale }: { locale: string }) {
  return <NavbarClient locale={locale} />;
}

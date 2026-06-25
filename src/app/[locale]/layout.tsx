import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminProvider } from "@/lib/auth/admin-context";
import { SiteContentProvider } from "@/lib/content/site-content-context";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { checkIsAdmin } from "@/lib/auth/admin";
import { getSiteContent } from "@/lib/content/get-site-content";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Ilm Learning Center",
    template: "%s | Ilm Learning Center",
  },
  description:
    "Expert tutoring for GCSE, A-Level, IB, and Tawjihi students in Palestine.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const [messages, isAdmin, siteContent] = await Promise.all([
    getMessages(),
    checkIsAdmin(),
    getSiteContent(),
  ]);

  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontClass =
    locale === "ar"
      ? `${cairo.variable} font-arabic`
      : `${jakarta.variable} font-sans`;

  return (
    <html lang={locale} dir={dir} className={`${jakarta.variable} ${cairo.variable}`}>
      <body className={`${fontClass} min-h-screen flex flex-col bg-warm text-navy antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AdminProvider isAdmin={isAdmin}>
            <SiteContentProvider content={siteContent}>
              <SmoothScroll>
                <Navbar locale={locale} />
                <main className="flex-1">{children}</main>
                <Footer />
              </SmoothScroll>
            </SiteContentProvider>
          </AdminProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

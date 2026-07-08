import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminProvider } from "@/lib/auth/admin-context";
import { SiteContentProvider } from "@/lib/content/site-content-context";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { getSiteContent } from "@/lib/content/get-site-content";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("siteDescription"),
  };
}

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

  // Enables static rendering with next-intl; without it the translation
  // helpers opt the whole route back into dynamic rendering.
  setRequestLocale(locale);

  const [messages, siteContent] = await Promise.all([
    getMessages(),
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
          <AdminProvider>
            <SiteContentProvider content={siteContent}>
              <SmoothScroll />
              <Navbar locale={locale} />
              <main className="flex-1">{children}</main>
              <Footer />
            </SiteContentProvider>
          </AdminProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

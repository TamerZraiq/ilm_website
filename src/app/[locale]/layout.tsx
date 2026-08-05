import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LazyMotion, domAnimation } from "framer-motion";
import { CURRICULA_KEYS } from "@/lib/curricula";
import { pageAlternates, pageOpenGraph } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteName = t("siteName");
  const description = t("siteDescription");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: pageAlternates(locale, ""),
    openGraph: pageOpenGraph({ locale, path: "", title: siteName, description, siteName }),
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
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

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });
  const tp = await getTranslations({ locale, namespace: "programs" });

  const orgId = `${SITE_URL}/#organization`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": orgId,
        name: t("siteName"),
        description: t("siteDescription"),
        url: `${SITE_URL}${locale === "ar" ? "" : "/en"}`,
        logo: `${SITE_URL}/logo-icon.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "4th Floor, Murrah and Falaneh Center, Tireh Main Street",
          addressLocality: "Ramallah",
          addressRegion: "Tireh",
          addressCountry: "PS",
        },
        areaServed: {
          "@type": "Country",
          name: "Palestine",
        },
      },
      ...CURRICULA_KEYS.map((key) => ({
        "@type": "Course",
        name: tp(`${key}.name`),
        description: tp(`${key}.shortDesc`),
        provider: { "@id": orgId },
      })),
    ],
  };

  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontClass =
    locale === "ar"
      ? `${tajawal.variable} font-arabic`
      : `${jakarta.variable} font-sans`;

  return (
    <html lang={locale} dir={dir} className={`${jakarta.variable} ${tajawal.variable}`}>
      <body className={`${fontClass} min-h-screen flex flex-col bg-warm text-navy antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <LazyMotion features={domAnimation} strict>
            <SmoothScroll />
            <Navbar locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer />
          </LazyMotion>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

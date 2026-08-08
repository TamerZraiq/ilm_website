import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
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
import { pageAlternates, pageOpenGraph, SITE_URL } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/*
 * Both families are declared in this one shared layout, and next/font emits a
 * `<link rel="preload">` for every font in a route's module graph — not just
 * the one whose CSS variable is actually mounted. That was force-downloading
 * all 9 woff2 files (~101KB) on every page in both locales, roughly half of
 * it a script the visitor's language never renders.
 *
 * `preload: false` hands the decision back to the browser, which honours the
 * `unicode-range` on each @font-face and fetches only the subsets whose
 * glyphs actually appear on the page. Paired with `display: "swap"` the cost
 * is a brief fallback flash rather than invisible text — a fair trade for not
 * shipping ~50KB of unused font to a mostly-mobile audience.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

// Latin subset included deliberately: Arabic pages are full of Latin exam
// names (GCSE, IB, SAT, A-Level, TOEFL), and they should set in Tajawal
// rather than dropping to a fallback face mid-sentence.
//
// Weights are exactly what the design system uses — 400 body, 500 medium,
// 700 bold. Tajawal has no 600, so `font-semibold` (18 call sites) resolves
// upward to 700 per CSS font matching, which is the intended look. 800 was
// being downloaded and never used by a single rule.
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
  preload: false,
});


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

/** Warm paper, so the browser chrome on mobile matches the page rather than
 *  flashing white above it. */
export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  colorScheme: "light",
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

  // Enables static rendering with next-intl; without it the translation
  // helpers opt the whole route back into dynamic rendering.
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });
  const tp = await getTranslations({ locale, namespace: "programs" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

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
  const isArabic = locale === "ar";

  // Only the active locale's family is applied. next/font preloads every
  // font whose variable is mounted, so putting both on <html> was shipping
  // ~96KB across 9 woff2 files on every page — half of it a face the
  // visitor's language never renders. Each locale needs exactly one.
  const fontVariable = isArabic ? tajawal.variable : jakarta.variable;
  const fontClass = isArabic ? "font-arabic" : "font-sans";

  return (
    <html lang={locale} dir={dir} className={fontVariable}>
      <body className={`${fontClass} min-h-screen flex flex-col bg-warm text-navy antialiased`}>
        {/* `<` is escaped to its unicode form so a translation containing
         *  "</script>" can never break out of this block. Today every value
         *  comes from our own message files, so this is hardening rather
         *  than a live hole — but JSON.stringify does not escape `<`, and
         *  the copy here is edited far more often than this file is. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* Entrance animations ship their start state as inline styles, so
         *  without JS the copy would sit at opacity 0 forever. `!important`
         *  in a stylesheet outranks a plain inline style, which is what makes
         *  this work at all. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-[12px] focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
          >
            {tNav("skipToContent")}
          </a>
          <LazyMotion features={domAnimation} strict>
            <SmoothScroll />
            <Navbar locale={locale} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </LazyMotion>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { BookOpen, Camera, Globe, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { InlineText } from "@/components/cms/inline-text";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-gold/30 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-gold" />
              <span className="text-lg font-bold">Ilm Learning Center</span>
            </div>
            <p className="mt-3 text-sm text-white/50">
              <InlineText contentKey="footer.tagline" fallback={t("tagline")} />
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              {t("programs")}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/programs" className="transition-colors hover:text-gold">{t("gcse")}</Link></li>
              <li><Link href="/programs" className="transition-colors hover:text-gold">{t("alevel")}</Link></li>
              <li><Link href="/programs" className="transition-colors hover:text-gold">{t("ib")}</Link></li>
              <li><Link href="/programs" className="transition-colors hover:text-gold">{t("tawjihi")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/" className="transition-colors hover:text-gold">{nav("home")}</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-gold">{nav("about")}</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-gold">{nav("contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              {t("contactUs")}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><InlineText contentKey="footer.email" fallback={t("email")} /></li>
              <li><InlineText contentKey="footer.phone" fallback={t("phone")} /></li>
              <li><InlineText contentKey="footer.hours" fallback={t("hours")} /></li>
            </ul>
            <div className="mt-5 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-white/30 transition-colors hover:text-gold"><Camera className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="text-white/30 transition-colors hover:text-gold"><Globe className="h-4 w-4" /></a>
              <a href="#" aria-label="WhatsApp" className="text-white/30 transition-colors hover:text-gold"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          {t("copyright", { year: new Date().getFullYear().toString() })}
        </div>
      </div>
    </footer>
  );
}

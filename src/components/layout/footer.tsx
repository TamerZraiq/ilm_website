"use client";

import { useTranslations } from "next-intl";
import { BookOpen, Camera, Globe, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-gold" />
              <span className="text-lg font-bold">Ilm Learning Center</span>
            </div>
            <p className="mt-3 text-sm text-white/60">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {t("programs")}
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/programs" className="transition-colors hover:text-white">
                  {t("gcse")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="transition-colors hover:text-white">
                  {t("alevel")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="transition-colors hover:text-white">
                  {t("ib")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="transition-colors hover:text-white">
                  {t("tawjihi")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {t("contactUs")}
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{t("email")}</li>
              <li>{t("phone")}</li>
              <li>{t("hours")}</li>
            </ul>
            <div className="mt-4 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-white/40 transition-colors hover:text-gold">
                <Camera className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-white/40 transition-colors hover:text-gold">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-white/40 transition-colors hover:text-gold">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          {t("copyright", { year: new Date().getFullYear().toString() })}
        </div>
      </div>
    </footer>
  );
}

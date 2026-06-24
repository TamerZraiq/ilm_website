"use client";

import { createContext, useContext, type ReactNode } from "react";

type ContentMap = Record<string, { en: string; ar: string | null }>;

const SiteContentContext = createContext<ContentMap>({});

export function SiteContentProvider({
  content,
  children,
}: {
  content: ContentMap;
  children: ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const content = useContext(SiteContentContext);

  return function getContent(key: string, locale: string): string | null {
    const entry = content[key];
    if (!entry) return null;
    return (locale === "ar" ? entry.ar : entry.en) ?? entry.en;
  };
}

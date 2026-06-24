"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Pencil, Check, Loader2 } from "lucide-react";
import { useAdmin } from "@/lib/auth/admin-context";
import { useSiteContent } from "@/lib/content/site-content-context";
import { upsertContent } from "@/lib/admin/content-actions";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface InlineTextProps {
  contentKey: string;
  fallback: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  multiline?: boolean;
}

export function InlineText({
  contentKey,
  fallback,
  as: Tag = "span",
  className = "",
  multiline = false,
}: InlineTextProps) {
  const isAdmin = useAdmin();
  const getContent = useSiteContent();
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) ?? "en";

  const dbValue = getContent(contentKey, locale);
  const displayValue = dbValue ?? fallback;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const save = useCallback(async () => {
    const el = ref.current;
    if (!el) return;
    const newValue = el.innerText.trim();
    if (newValue === displayValue) {
      setEditing(false);
      return;
    }

    setSaving(true);
    const otherLocale = locale === "en" ? "ar" : "en";
    const otherValue = getContent(contentKey, otherLocale);

    const valueEn = locale === "en" ? newValue : (otherValue ?? fallback);
    const valueAr = locale === "ar" ? newValue : (otherValue ?? null);

    await upsertContent(contentKey, valueEn, valueAr);
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    router.refresh();
  }, [contentKey, displayValue, fallback, getContent, locale, router]);

  useEffect(() => {
    if (!editing) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && !multiline) {
        e.preventDefault();
        save();
      }
      if (e.key === "Escape") {
        if (ref.current) ref.current.innerText = displayValue;
        setEditing(false);
      }
    }
    const el = ref.current;
    el?.addEventListener("keydown", handleKeyDown);
    return () => el?.removeEventListener("keydown", handleKeyDown);
  }, [editing, save, displayValue, multiline]);

  if (!isAdmin) {
    return <Tag className={className}>{displayValue}</Tag>;
  }

  return (
    <span className="group/inline relative inline-block">
      <Tag
        ref={ref as React.Ref<never>}
        className={`${className} ${editing ? "outline outline-2 outline-gold rounded px-1 -mx-1" : "cursor-pointer"}`}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={() => {
          if (!editing) {
            setEditing(true);
            setTimeout(() => ref.current?.focus(), 0);
          }
        }}
        onBlur={() => {
          if (editing) save();
        }}
      >
        {displayValue}
      </Tag>
      {!editing && !saving && !saved && (
        <button
          onClick={() => {
            setEditing(true);
            setTimeout(() => ref.current?.focus(), 0);
          }}
          className="absolute -top-2 -end-6 hidden size-5 items-center justify-center rounded-full bg-gold text-navy shadow group-hover/inline:flex"
        >
          <Pencil className="size-2.5" />
        </button>
      )}
      {saving && (
        <Loader2 className="absolute -top-2 -end-6 size-5 animate-spin text-gold" />
      )}
      {saved && (
        <Check className="absolute -top-2 -end-6 size-5 text-green-500" />
      )}
    </span>
  );
}

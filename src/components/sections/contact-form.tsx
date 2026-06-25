"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, contactSubjects, type ContactInput } from "@/lib/contact/schemas";

type Status = "idle" | "loading" | "success" | "error" | "rateLimited";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        reset();
      } else if (res.status === 429) {
        setStatus("rateLimited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle className="mb-4 h-10 w-10 text-green-600" />
        <p className="text-lg font-medium text-green-800">{t("success")}</p>
      </div>
    );
  }

  const inputClass = "mt-1.5 h-11 rounded-lg border-navy/10 bg-warm/50 text-navy placeholder:text-navy/30 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30";
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-navy/50";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name" className={labelClass}>{t("name")}</Label>
        <Input id="name" {...register("name")} className={inputClass} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className={labelClass}>{t("email")}</Label>
        <Input id="email" type="email" {...register("email")} className={inputClass} aria-invalid={!!errors.email} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="subject" className={labelClass}>{t("subject")}</Label>
        <select
          id="subject"
          {...register("subject")}
          className={`${inputClass} flex w-full px-3 text-sm`}
          aria-invalid={!!errors.subject}
        >
          <option value="">{t("subject")}</option>
          {contactSubjects.map((s) => (
            <option key={s} value={s}>{t(`subjectOptions.${s}`)}</option>
          ))}
        </select>
        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className={labelClass}>{t("message")}</Label>
        <Textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1.5 rounded-lg border-navy/10 bg-warm/50 text-navy placeholder:text-navy/30 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      {status === "error" && <p className="text-sm text-red-600">{t("error")}</p>}
      {status === "rateLimited" && <p className="text-sm text-amber-600">{t("rateLimited")}</p>}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-12 w-full bg-gold text-sm font-semibold text-navy hover:bg-gold-dark"
        size="lg"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}

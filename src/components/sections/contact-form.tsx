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
import { submitContactForm } from "@/lib/contact/actions";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    const result = await submitContactForm(data);

    if ("success" in result) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-green-600" />
        <p className="text-lg font-medium text-green-800">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          {...register("name")}
          className="mt-1.5"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1.5"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="subject">{t("subject")}</Label>
        <select
          id="subject"
          {...register("subject")}
          className="mt-1.5 flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-invalid={!!errors.subject}
        >
          <option value="">{t("subject")}</option>
          {contactSubjects.map((s) => (
            <option key={s} value={s}>
              {t(`subjectOptions.${s}`)}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1.5"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{t("error")}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gold text-navy hover:bg-gold-light"
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

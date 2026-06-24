"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAdmin } from "@/lib/auth/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/admin/tag-input";
import {
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/lib/admin/teacher-actions";
import type { Database } from "@/types/database.types";

type Teacher = Database["public"]["Tables"]["teachers"]["Row"];

export function TeacherEditor({ teachers }: { teachers: Teacher[] }) {
  const isAdmin = useAdmin();
  const t = useTranslations("cms");
  const [adding, setAdding] = useState(false);

  return (
    <>
      {isAdmin && (
        <div className="mb-6 flex justify-center">
          <Button
            onClick={() => setAdding(true)}
            className="bg-gold text-navy hover:bg-gold-light"
          >
            <Plus className="size-4" />
            {t("addTeacher")}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} isAdmin={isAdmin} />
        ))}
        {adding && isAdmin && (
          <TeacherCard
            isNew
            onSave={() => setAdding(false)}
            onCancel={() => setAdding(false)}
          />
        )}
      </div>
      {teachers.length === 0 && !adding && (
        <p className="mt-4 text-center text-gray-500">Team coming soon</p>
      )}
    </>
  );
}

function TeacherCard({
  teacher,
  isAdmin,
  isNew,
  onSave,
  onCancel,
}: {
  teacher?: Teacher;
  isAdmin?: boolean;
  isNew?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}) {
  const t = useTranslations("cms");
  const [editing, setEditing] = useState(!!isNew);
  const [name, setName] = useState(teacher?.full_name ?? "");
  const [nameAr, setNameAr] = useState(teacher?.full_name_ar ?? "");
  const [bio, setBio] = useState(teacher?.bio ?? "");
  const [bioAr, setBioAr] = useState(teacher?.bio_ar ?? "");
  const [subjects, setSubjects] = useState<string[]>(teacher?.subjects ?? []);
  const [avatarUrl, setAvatarUrl] = useState(teacher?.avatar_url ?? "");
  const [order, setOrder] = useState(teacher?.display_order ?? 0);
  const [isPending, startTransition] = useTransition();

  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleSave() {
    const formData = new FormData();
    formData.set("full_name", name);
    formData.set("full_name_ar", nameAr);
    formData.set("bio", bio);
    formData.set("bio_ar", bioAr);
    formData.set("subjects", JSON.stringify(subjects));
    formData.set("avatar_url", avatarUrl);
    formData.set("display_order", String(order));
    formData.set("is_visible", "true");

    startTransition(async () => {
      if (teacher) {
        await updateTeacher(teacher.id, formData);
      } else {
        await createTeacher(formData);
      }
      setEditing(false);
      onSave?.();
    });
  }

  function handleDelete() {
    if (!teacher || !confirm(t("deleteConfirm"))) return;
    startTransition(async () => {
      await deleteTeacher(teacher.id);
    });
  }

  if (!editing) {
    return (
      <div className="relative flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm">
        {isAdmin && (
          <div className="absolute top-2 end-2 flex gap-1">
            <button
              onClick={() => setEditing(true)}
              className="rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-navy shadow hover:bg-gold-light"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-full bg-red-100 p-1.5 text-red-600 shadow hover:bg-red-200"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        )}

        {teacher?.avatar_url ? (
          <Image src={teacher.avatar_url} alt={name} width={64} height={64} className="mb-4 h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-lg font-bold text-gold">
            {initials}
          </div>
        )}
        <h3 className="text-lg font-bold text-navy">{name}</h3>
        {subjects.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {subjects.map((s) => (
              <span key={s} className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">{s}</span>
            ))}
          </div>
        )}
        {bio && <p className="mt-4 text-sm text-gray-600">{bio}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-gold/40 bg-white p-5 shadow-sm">
      <div className="space-y-3">
        <Input placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} className="font-semibold" />
        <Input placeholder="الاسم بالعربية" value={nameAr} onChange={(e) => setNameAr(e.target.value)} dir="rtl" />
        <Textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={2} />
        <Textarea placeholder="السيرة بالعربية" value={bioAr} onChange={(e) => setBioAr(e.target.value)} rows={2} dir="rtl" />
        <div>
          <span className="mb-1 block text-xs text-gray-400">Subjects</span>
          <TagInput value={subjects} onChange={setSubjects} placeholder="Type subject, press Enter" />
        </div>
        <Input placeholder="Avatar URL" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
        <Input type="number" placeholder="Display Order" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={handleSave} disabled={isPending || !name} className="bg-navy text-white hover:bg-navy-light" size="sm">
          {isPending ? t("saving") : t("save")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setEditing(false); onCancel?.(); }}>
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}

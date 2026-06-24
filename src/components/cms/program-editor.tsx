"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAdmin } from "@/lib/auth/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TagInput } from "@/components/admin/tag-input";
import { createProgram, updateProgram, deleteProgram } from "@/lib/admin/program-actions";
import type { Database } from "@/types/database.types";

type Program = Database["public"]["Tables"]["programs"]["Row"];

export function ProgramEditor({ programs }: { programs: Program[] }) {
  const isAdmin = useAdmin();
  const [adding, setAdding] = useState(false);

  return (
    <>
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} isAdmin={isAdmin} />
      ))}

      {adding && isAdmin && (
        <ProgramCard
          isNew
          onSave={() => setAdding(false)}
          onCancel={() => setAdding(false)}
        />
      )}

      {isAdmin && !adding && (
        <section className="flex justify-center py-8">
          <Button onClick={() => setAdding(true)} className="bg-gold text-navy hover:bg-gold-light">
            <Plus className="size-4" />
            Add Program
          </Button>
        </section>
      )}
    </>
  );
}

function ProgramCard({
  program,
  isAdmin,
  isNew,
  onSave,
  onCancel,
}: {
  program?: Program;
  isAdmin?: boolean;
  isNew?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}) {
  const t = useTranslations("cms");
  const [editing, setEditing] = useState(!!isNew);
  const [name, setName] = useState(program?.name ?? "");
  const [nameAr, setNameAr] = useState(program?.name_ar ?? "");
  const [desc, setDesc] = useState(program?.description ?? "");
  const [descAr, setDescAr] = useState(program?.description_ar ?? "");
  const [subjects, setSubjects] = useState<string[]>(program?.subjects ?? []);
  const [subjectsAr, setSubjectsAr] = useState<string[]>(program?.subjects_ar ?? []);
  const [order, setOrder] = useState(program?.display_order ?? 0);
  const [isPending, startTransition] = useTransition();

  const idx = program?.display_order ?? 0;
  const bg = idx % 2 === 0 ? "bg-white" : "bg-gray-50";

  function handleSave() {
    startTransition(async () => {
      if (program) {
        await updateProgram(program.id, {
          name,
          name_ar: nameAr || null,
          description: desc || null,
          description_ar: descAr || null,
          subjects,
          subjects_ar: subjectsAr,
          display_order: order,
        });
      } else {
        await createProgram({
          name,
          name_ar: nameAr || undefined,
          description: desc || undefined,
          description_ar: descAr || undefined,
          subjects,
          subjects_ar: subjectsAr,
          display_order: order,
        });
      }
      setEditing(false);
      onSave?.();
    });
  }

  function handleDelete() {
    if (!program || !confirm(t("deleteConfirm"))) return;
    startTransition(async () => {
      await deleteProgram(program.id);
    });
  }

  if (!editing) {
    return (
      <section className={`group/prog relative px-6 py-16 ${bg}`}>
        <div className="mx-auto max-w-5xl">
          {isAdmin && (
            <div className="absolute top-4 end-4 flex gap-2">
              <button onClick={() => setEditing(true)} className="rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-navy shadow hover:bg-gold-light">Edit</button>
              <button onClick={handleDelete} disabled={isPending} className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 shadow hover:bg-red-200"><Trash2 className="inline size-3 me-1" />Delete</button>
            </div>
          )}
          <h2 className="mb-4 text-2xl font-bold text-navy">{name}</h2>
          {desc && <p className="mb-8 max-w-3xl text-gray-600">{desc}</p>}
          <div className="flex flex-wrap gap-3">
            {subjects.map((s) => (
              <Badge key={s} className="bg-navy px-3 py-1.5 text-sm text-white">{s}</Badge>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-2 border-dashed border-gold/40 px-6 py-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input placeholder="Program Name *" value={name} onChange={(e) => setName(e.target.value)} className="text-lg font-bold" />
          <Input placeholder="اسم البرنامج بالعربية" value={nameAr} onChange={(e) => setNameAr(e.target.value)} dir="rtl" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} />
          <Textarea placeholder="الوصف بالعربية" value={descAr} onChange={(e) => setDescAr(e.target.value)} rows={3} dir="rtl" />
        </div>
        <div>
          <span className="mb-1 block text-xs text-gray-400">Subjects (type and press Enter to add)</span>
          <TagInput value={subjects} onChange={setSubjects} placeholder="Add subject, press Enter" />
        </div>
        <div>
          <span className="mb-1 block text-xs text-gray-400">Subjects (Arabic)</span>
          <TagInput value={subjectsAr} onChange={setSubjectsAr} placeholder="أضف مادة واضغط Enter" />
        </div>
        <Input type="number" placeholder="Display Order" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-24" />
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={isPending || !name} className="bg-navy text-white hover:bg-navy-light" size="sm">
            {isPending ? t("saving") : t("save")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setEditing(false); onCancel?.(); }}>{t("cancel")}</Button>
        </div>
      </div>
    </section>
  );
}

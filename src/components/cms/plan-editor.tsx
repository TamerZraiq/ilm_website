"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAdmin } from "@/lib/auth/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/admin/tag-input";
import { Badge } from "@/components/ui/badge";
import { createPlan, updatePlan, deletePlan } from "@/lib/admin/plan-actions";
import type { Database } from "@/types/database.types";

type Plan = Database["public"]["Tables"]["subscription_plans"]["Row"];

const PERIOD_LABELS: Record<string, string> = { month: "/mo", term: "/term", year: "/yr" };

export function PlanEditor({ plans }: { plans: Plan[] }) {
  const isAdmin = useAdmin();
  const t = useTranslations("cms");
  const [adding, setAdding] = useState(false);

  return (
    <>
      {isAdmin && (
        <div className="mb-6 flex justify-center">
          <Button onClick={() => setAdding(true)} className="bg-gold text-navy hover:bg-gold-light">
            <Plus className="size-4" />
            {t("addPlan")}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} isAdmin={isAdmin} />
        ))}
        {adding && isAdmin && (
          <PlanCard isNew onSave={() => setAdding(false)} onCancel={() => setAdding(false)} />
        )}
      </div>
      {plans.length === 0 && !adding && isAdmin && (
        <p className="mt-4 text-center text-gray-500">{t("noPlans")}</p>
      )}
    </>
  );
}

function PlanCard({
  plan,
  isAdmin,
  isNew,
  onSave,
  onCancel,
}: {
  plan?: Plan;
  isAdmin?: boolean;
  isNew?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}) {
  const t = useTranslations("cms");
  const [editing, setEditing] = useState(!!isNew);
  const [name, setName] = useState(plan?.name ?? "");
  const [nameAr, setNameAr] = useState(plan?.name_ar ?? "");
  const [description, setDescription] = useState(plan?.description ?? "");
  const [descAr, setDescAr] = useState(plan?.description_ar ?? "");
  const [price, setPrice] = useState(plan?.price ?? 0);
  const [currency, setCurrency] = useState(plan?.currency ?? "USD");
  const [period, setPeriod] = useState(plan?.billing_period ?? "month");
  const [features, setFeatures] = useState<string[]>(plan?.features ?? []);
  const [featuresAr, setFeaturesAr] = useState<string[]>(plan?.features_ar ?? []);
  const [order, setOrder] = useState(plan?.display_order ?? 0);
  const [isActive, setIsActive] = useState(plan?.is_active ?? true);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    const formData = new FormData();
    formData.set("name", name);
    formData.set("name_ar", nameAr);
    formData.set("description", description);
    formData.set("description_ar", descAr);
    formData.set("price", String(price));
    formData.set("currency", currency);
    formData.set("billing_period", period);
    formData.set("features", JSON.stringify(features));
    formData.set("features_ar", JSON.stringify(featuresAr));
    formData.set("display_order", String(order));
    formData.set("is_active", String(isActive));

    startTransition(async () => {
      if (plan) {
        await updatePlan(plan.id, formData);
      } else {
        await createPlan(formData);
      }
      setEditing(false);
      onSave?.();
    });
  }

  function handleDelete() {
    if (!plan || !confirm(t("deleteConfirm"))) return;
    startTransition(async () => { await deletePlan(plan.id); });
  }

  if (!editing) {
    return (
      <div className="relative flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {isAdmin && (
          <div className="absolute top-2 end-2 flex gap-1">
            <button onClick={() => setEditing(true)} className="rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-navy shadow hover:bg-gold-light">Edit</button>
            <button onClick={handleDelete} disabled={isPending} className="rounded-full bg-red-100 p-1.5 text-red-600 shadow hover:bg-red-200"><Trash2 className="size-3.5" /></button>
          </div>
        )}
        <h3 className="text-xl font-bold text-navy">{name}</h3>
        {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-navy">{currency === "USD" ? "$" : currency} {price}</span>
          <span className="text-sm text-gray-500">{PERIOD_LABELS[period] ?? `/${period}`}</span>
        </div>
        {features.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-0.5 text-gold">✓</span>{f}</li>
            ))}
          </ul>
        )}
        {!isActive && isAdmin && <Badge variant="outline" className="mt-3 w-fit text-xs text-gray-400">Inactive</Badge>}
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-gold/40 bg-white p-5 shadow-sm">
      <div className="space-y-3">
        <Input placeholder="Plan Name *" value={name} onChange={(e) => setName(e.target.value)} className="font-semibold" />
        <Input placeholder="الاسم بالعربية" value={nameAr} onChange={(e) => setNameAr(e.target.value)} dir="rtl" />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        <Textarea placeholder="الوصف بالعربية" value={descAr} onChange={(e) => setDescAr(e.target.value)} rows={2} dir="rtl" />
        <div className="grid grid-cols-3 gap-2">
          <Input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <Input placeholder="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
          <select value={period} onChange={(e) => setPeriod(e.target.value as "month" | "term" | "year")} className="rounded-lg border border-input px-2 text-sm">
            <option value="month">Monthly</option>
            <option value="term">Per Term</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div>
          <span className="mb-1 block text-xs text-gray-400">Features</span>
          <TagInput value={features} onChange={setFeatures} placeholder="Add feature, press Enter" />
        </div>
        <div>
          <span className="mb-1 block text-xs text-gray-400">Features (Arabic)</span>
          <TagInput value={featuresAr} onChange={setFeaturesAr} placeholder="أضف ميزة" />
        </div>
        <div className="flex gap-2">
          <Input type="number" placeholder="Order" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-20" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="size-4" />
            Active
          </label>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={handleSave} disabled={isPending || !name} className="bg-navy text-white hover:bg-navy-light" size="sm">
          {isPending ? t("saving") : t("save")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setEditing(false); onCancel?.(); }}>{t("cancel")}</Button>
      </div>
    </div>
  );
}

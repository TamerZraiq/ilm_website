"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Database } from "@/types/database.types";

type Plan = Database["public"]["Tables"]["subscription_plans"]["Row"];
type Program = Database["public"]["Tables"]["programs"]["Row"];
type Teacher = Database["public"]["Tables"]["teachers"]["Row"];

type AdminState = {
  isAdmin: boolean;
  plans: Plan[] | null;
  programs: Program[] | null;
  teachers: Teacher[] | null;
};

type AdminContextValue = AdminState & {
  // Re-fetch the admin bootstrap after a mutation so hidden/inactive rows and
  // toggles reflect immediately in the admin's own view.
  refresh: () => Promise<void>;
};

const EMPTY: AdminState = {
  isAdmin: false,
  plans: null,
  programs: null,
  teachers: null,
};

const AdminContext = createContext<AdminContextValue>({
  ...EMPTY,
  refresh: async () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(EMPTY);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setState(
        data.isAdmin
          ? {
              isAdmin: true,
              plans: data.plans ?? [],
              programs: data.programs ?? [],
              teachers: data.teachers ?? [],
            }
          : EMPTY
      );
    } catch {
      // Network/parse failure: stay in the safe non-admin state.
    }
  }, []);

  useEffect(() => {
    // Fetch-on-mount: setState happens only in refresh's async network
    // callback, not synchronously during commit, so it's not the render
    // cascade this rule guards against.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return (
    <AdminContext.Provider value={{ ...state, refresh }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext).isAdmin;
}

export function useAdminData() {
  return useContext(AdminContext);
}

-- Fix infinite recursion in profiles RLS policies.
-- The admin policies queried profiles from within profiles policies.
-- Fix: use a SECURITY DEFINER function that bypasses RLS to check the role.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Drop the broken policies
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- Recreate without recursion
CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
  );

CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.is_admin());

-- Also fix the same pattern in teachers and subscription_plans policies
-- (they reference profiles too, but from a different table so no recursion —
--  however using the function is cleaner and faster)
DROP POLICY IF EXISTS "teachers_select_admin" ON public.teachers;
DROP POLICY IF EXISTS "teachers_insert_admin" ON public.teachers;
DROP POLICY IF EXISTS "teachers_update_admin" ON public.teachers;
DROP POLICY IF EXISTS "teachers_delete_admin" ON public.teachers;

CREATE POLICY "teachers_select_admin"
  ON public.teachers FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "teachers_insert_admin"
  ON public.teachers FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "teachers_update_admin"
  ON public.teachers FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "teachers_delete_admin"
  ON public.teachers FOR DELETE TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "plans_select_admin" ON public.subscription_plans;
DROP POLICY IF EXISTS "plans_insert_admin" ON public.subscription_plans;
DROP POLICY IF EXISTS "plans_update_admin" ON public.subscription_plans;
DROP POLICY IF EXISTS "plans_delete_admin" ON public.subscription_plans;

CREATE POLICY "plans_select_admin"
  ON public.subscription_plans FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "plans_insert_admin"
  ON public.subscription_plans FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "plans_update_admin"
  ON public.subscription_plans FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "plans_delete_admin"
  ON public.subscription_plans FOR DELETE TO authenticated
  USING (public.is_admin());

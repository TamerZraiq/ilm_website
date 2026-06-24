CREATE TABLE public.teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  full_name_ar TEXT,
  bio TEXT,
  bio_ar TEXT,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  avatar_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_teachers_updated_at
  BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- Public site (unauthenticated) can read visible teachers
CREATE POLICY "teachers_select_public"
ON public.teachers FOR SELECT TO anon, authenticated
USING (is_visible = true);

-- Admin can read all including hidden
CREATE POLICY "teachers_select_admin"
ON public.teachers FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
));

-- Admin-only writes
CREATE POLICY "teachers_insert_admin"
ON public.teachers FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
));

CREATE POLICY "teachers_update_admin"
ON public.teachers FOR UPDATE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
));

CREATE POLICY "teachers_delete_admin"
ON public.teachers FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
));

GRANT SELECT ON public.teachers TO anon;
GRANT ALL ON public.teachers TO authenticated;

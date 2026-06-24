CREATE TABLE public.site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value_en TEXT NOT NULL,
  value_ar TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_content_select_public"
  ON public.site_content FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "site_content_insert_admin"
  ON public.site_content FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "site_content_update_admin"
  ON public.site_content FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "site_content_delete_admin"
  ON public.site_content FOR DELETE TO authenticated
  USING (public.is_admin());

GRANT SELECT ON public.site_content TO anon;
GRANT ALL ON public.site_content TO authenticated;

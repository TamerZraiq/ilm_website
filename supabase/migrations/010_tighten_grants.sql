-- 010_tighten_grants.sql
-- Earlier migrations used GRANT ALL, which includes TRUNCATE, REFERENCES, and
-- TRIGGER. TRUNCATE is not governed by RLS, so any authenticated user could
-- empty these tables. Restrict authenticated to the four DML privileges;
-- RLS policies then control which rows each role can touch.

REVOKE ALL ON public.teachers FROM authenticated;
REVOKE ALL ON public.subscription_plans FROM authenticated;
REVOKE ALL ON public.site_content FROM authenticated;
REVOKE ALL ON public.programs FROM authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.teachers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscription_plans TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.programs TO authenticated;

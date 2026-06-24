-- The original migrations never granted table-level access on profiles.
-- RLS handles row-level filtering, but the GRANT is needed for any query to work.
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

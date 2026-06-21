-- 003_jwt_hook.sql
-- Creates the custom_access_token_hook function that embeds user roles into JWTs.
-- Run this AFTER 002_rls_policies.sql in the Supabase SQL Editor.
--
-- MANUAL STEP REQUIRED: After running this migration, go to:
--   Supabase Dashboard → Authentication → Hooks → Customize Access Token
--   and select the `custom_access_token_hook` function.
-- Without that step, roles will NOT appear in JWTs and role-based routing won't work.

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event JSONB)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claims JSONB;
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = (event->>'userId')::UUID;

  claims := event->'claims';
  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  END IF;
  RETURN jsonb_set(event, '{claims}', claims);
END;
$$;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;
GRANT SELECT ON TABLE public.profiles TO supabase_auth_admin;

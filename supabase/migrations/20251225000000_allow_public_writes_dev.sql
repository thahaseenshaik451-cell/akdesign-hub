-- ⚠️ DEVELOPMENT ONLY: This migration allows public writes to bypass RLS
-- DO NOT USE IN PRODUCTION!
-- 
-- This is a temporary fix for when using Firebase Auth instead of Supabase Auth.
-- For production, use the service role key approach (see SUPABASE_AUTH_FIX.md)

-- Drop existing admin-only policies
DROP POLICY IF EXISTS "Admins can manage portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

-- Allow public writes for development (INSECURE - development only!)
CREATE POLICY "Allow public writes for development - portfolio"
  ON public.portfolio FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public writes for development - testimonials"
  ON public.testimonials FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public writes for development - services"
  ON public.services FOR ALL
  USING (true)
  WITH CHECK (true);

-- Note: Public reads are already allowed by existing policies


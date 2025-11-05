-- =============================================================================
-- QUICK FIX: Update RLS Policies for sponsor_submissions
-- =============================================================================
-- Copy and paste THIS ENTIRE FILE into Supabase SQL Editor
-- This fixes the "violates row-level security policy" error
-- =============================================================================

-- Step 1: Drop the old restrictive SELECT policy
DROP POLICY IF EXISTS "Enable select for authenticated users" ON sponsor_submissions;

-- Step 2: Create new SELECT policy that allows public access
CREATE POLICY "Enable select for public" ON sponsor_submissions
  FOR SELECT USING (true);

-- =============================================================================
-- That's it! Your form should now work.
-- Test by submitting the form at /be-our-sponsor
-- =============================================================================

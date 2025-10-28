-- IEDC Summit 2025 - Supabase Database Schema
-- Copy and paste this entire file into Supabase SQL Editor
-- Generated: 2025-10-28

-- ============================================================================
-- 1. MAIN SPONSOR SUBMISSIONS TABLE
-- ============================================================================

CREATE TABLE sponsor_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  website VARCHAR(500),
  partnership_type VARCHAR(100) NOT NULL,
  remarks TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_sponsor_submissions_email ON sponsor_submissions(email);
CREATE INDEX idx_sponsor_submissions_partnership_type ON sponsor_submissions(partnership_type);
CREATE INDEX idx_sponsor_submissions_submitted_at ON sponsor_submissions(submitted_at DESC);
CREATE INDEX idx_sponsor_submissions_status ON sponsor_submissions(status);

-- ============================================================================
-- 2. PARTNERSHIP TYPES REFERENCE TABLE (Optional)
-- ============================================================================

CREATE TABLE partnership_types (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  amount_inr DECIMAL(10, 2),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order SMALLINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on partnership_types table
ALTER TABLE partnership_types ENABLE ROW LEVEL SECURITY;

-- Policy: Public can SELECT partnership types (read-only reference data)
CREATE POLICY "Enable select for public" ON partnership_types
  FOR SELECT USING (true);

-- Policy: Public cannot INSERT/UPDATE/DELETE
CREATE POLICY "Disable insert for all" ON partnership_types
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Disable update for all" ON partnership_types
  FOR UPDATE USING (false);

CREATE POLICY "Disable delete for all" ON partnership_types
  FOR DELETE USING (false);

-- Insert partnership type options
INSERT INTO partnership_types (code, label, amount_inr, display_order) VALUES
('INNOVATION_PARTNER_OF_THE_YEAR', 'INNOVATION PARTNER OF THE YEAR', 2600000, 1),
('TECHNOLOGY_ENABLER', 'TECHNOLOGY TRAILBLAZERS', 1000000, 2),
('STARTUP_ENABLER', 'STARTUP ENABLER', 600000, 3),
('INNOVATION_SUPPORTER', 'INNOVATION SUPPORTER', 300000, 4),
('EVENT_COLLABORATOR', 'EVENT COLLABORATOR', 200000, 5),
('OTHER', 'OTHER', NULL, 6);

-- ============================================================================
-- 3. AUDIT LOGS TABLE (Optional - for tracking admin actions)
-- ============================================================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES sponsor_submissions(id) ON DELETE CASCADE,
  admin_user_id UUID,
  action VARCHAR(100) NOT NULL,
  changes JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for audit logs
CREATE INDEX idx_audit_logs_submission_id ON audit_logs(submission_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on sponsor_submissions table
ALTER TABLE sponsor_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Public can INSERT new submissions (anonymous users via public key)
CREATE POLICY "Enable insert for public" ON sponsor_submissions
  FOR INSERT WITH CHECK (true);

-- Policy: Public can SELECT after INSERT (for .select() to work)
CREATE POLICY "Enable select for public" ON sponsor_submissions
  FOR SELECT USING (true);

-- Policy: Only authenticated users can UPDATE
CREATE POLICY "Enable update for authenticated users" ON sponsor_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Public cannot DELETE
CREATE POLICY "Disable delete for all" ON sponsor_submissions
  FOR DELETE USING (false);

-- Enable RLS on audit_logs table
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can INSERT audit logs
CREATE POLICY "Enable insert for authenticated users" ON audit_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can SELECT audit logs
CREATE POLICY "Enable select for authenticated users on audit_logs" ON audit_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================================
-- 5. VIEWS FOR ADMIN DASHBOARD (Optional)
-- ============================================================================

-- Drop views if they exist (in case of re-running)
DROP VIEW IF EXISTS recent_submissions;
DROP VIEW IF EXISTS sponsor_submissions_stats;

-- View: Submission statistics by partnership type
-- Using SECURITY INVOKER to enforce caller's RLS policies
CREATE VIEW sponsor_submissions_stats WITH (SECURITY_INVOKER = ON) AS
SELECT 
  partnership_type,
  COUNT(*) as submission_count,
  COUNT(CASE WHEN status = 'reviewed' THEN 1 END) as reviewed_count,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_count,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count
FROM sponsor_submissions
GROUP BY partnership_type
ORDER BY submission_count DESC;

-- View: Recent submissions
-- Using SECURITY INVOKER to enforce caller's RLS policies
CREATE VIEW recent_submissions WITH (SECURITY_INVOKER = ON) AS
SELECT 
  id,
  organization_name,
  contact_name,
  email,
  partnership_type,
  status,
  submitted_at
FROM sponsor_submissions
ORDER BY submitted_at DESC
LIMIT 50;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
-- 
-- NEXT STEPS:
-- 1. Copy all the SQL above
-- 2. Go to Supabase Dashboard → SQL Editor
-- 3. Click "New Query"
-- 4. Paste the SQL
-- 5. Click "Run"
-- 6. You should see "Success" message
-- 7. Go to Table Editor and verify "sponsor_submissions" table exists
--
-- ============================================================================

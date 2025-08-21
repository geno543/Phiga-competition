-- Simple migration script to add birth_date column
-- Run this in your Supabase SQL editor

-- Add the new birth_date column if it doesn't exist
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS birth_date DATE;

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'registrations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

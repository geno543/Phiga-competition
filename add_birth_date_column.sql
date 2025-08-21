-- Migration script to add birth_date column to existing registrations table
-- Run this in your Supabase SQL editor

-- Add the birth_date column if it doesn't exist
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS birth_date DATE;

-- Optional: If you want to remove the old physics_experience column
-- (Only uncomment this if you're sure you don't need the existing data)
-- ALTER TABLE public.registrations DROP COLUMN IF EXISTS physics_experience;

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'registrations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

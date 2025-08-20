-- Create the registrations table in Supabase
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    country TEXT NOT NULL,
    school TEXT,
    grade_level TEXT,
    physics_experience TEXT,
    motivation TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous insertions" ON public.registrations;
DROP POLICY IF EXISTS "Allow authenticated users to view registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow anonymous users to view registrations" ON public.registrations;

-- Create a policy to allow anonymous users to insert registrations
CREATE POLICY "Allow anonymous insertions" ON public.registrations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create a policy to allow anonymous users to view all registrations (for admin page)
CREATE POLICY "Allow anonymous users to view registrations" ON public.registrations
    FOR SELECT
    TO anon
    USING (true);

-- Create a policy to allow authenticated users to view all registrations
CREATE POLICY "Allow authenticated users to view registrations" ON public.registrations
    FOR SELECT
    TO authenticated
    USING (true);

-- Create a policy to allow anonymous users to update registrations (for admin functions)
CREATE POLICY "Allow anonymous users to update registrations" ON public.registrations
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Add an index on email for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);

-- Add an index on created_at for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);

-- Add competition code and status fields
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS competition_code VARCHAR(8) UNIQUE,
ADD COLUMN IF NOT EXISTS code_generated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS registration_status VARCHAR(20) DEFAULT 'pending';

-- Create index for faster code lookups
CREATE INDEX IF NOT EXISTS idx_registrations_competition_code ON public.registrations(competition_code);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(registration_status);
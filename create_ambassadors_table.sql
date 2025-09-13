-- Create ambassadors table
CREATE TABLE IF NOT EXISTS public.ambassadors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    school VARCHAR(255),
    ambassador_code VARCHAR(50) UNIQUE NOT NULL,
    referral_count INTEGER DEFAULT 0,
    total_registrations INTEGER DEFAULT 0,
    ranking INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Create referrals table to track referrals
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ambassador_code VARCHAR(50) NOT NULL,
    referee_email VARCHAR(255) NOT NULL,
    referee_name VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    FOREIGN KEY (ambassador_code) REFERENCES ambassadors(ambassador_code)
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.ambassadors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access on ambassadors" ON public.ambassadors;
DROP POLICY IF EXISTS "Allow public insert on ambassadors" ON public.ambassadors;
DROP POLICY IF EXISTS "Allow ambassadors to update own data" ON public.ambassadors;
DROP POLICY IF EXISTS "Allow public read access on referrals" ON public.referrals;
DROP POLICY IF EXISTS "Allow public insert on referrals" ON public.referrals;

-- Recreate policies
CREATE POLICY "Allow public read access on ambassadors" ON public.ambassadors
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on ambassadors" ON public.ambassadors
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow ambassadors to update own data" ON public.ambassadors
    FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on referrals" ON public.referrals
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on referrals" ON public.referrals
    FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ambassadors_email ON public.ambassadors(email);
CREATE INDEX IF NOT EXISTS idx_ambassadors_code ON public.ambassadors(ambassador_code);
CREATE INDEX IF NOT EXISTS idx_referrals_ambassador_code ON public.referrals(ambassador_code);
CREATE INDEX IF NOT EXISTS idx_referrals_email ON public.referrals(referee_email);

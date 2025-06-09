-- First, let's update the table structure if needed
CREATE TABLE IF NOT EXISTS public.pdfs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    filename TEXT NOT NULL,
    original_size INTEGER NOT NULL,
    compressed_size INTEGER NOT NULL,
    compression_ratio FLOAT NOT NULL,
    original_url TEXT,
    compressed_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMPTZ
);

-- Make sure RLS is enabled
ALTER TABLE public.pdfs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can insert their own pdfs" ON public.pdfs;
DROP POLICY IF EXISTS "Users can view their own pdfs" ON public.pdfs;
DROP POLICY IF EXISTS "Users can update their own pdfs" ON public.pdfs;

-- Create comprehensive RLS policies
CREATE POLICY "Users can insert their own pdfs"
ON public.pdfs FOR INSERT 
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can view their own pdfs"
ON public.pdfs FOR SELECT
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can update their own pdfs"
ON public.pdfs FOR UPDATE
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);

-- Grant necessary permissions to authenticated users
GRANT ALL ON public.pdfs TO authenticated;


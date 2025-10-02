-- Create user type enum
CREATE TYPE public.user_type AS ENUM ('landlord', 'tenant');

-- Create verification status enum
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected', 'not_started');

-- Create document type enum
CREATE TYPE public.document_type AS ENUM ('national_id', 'passport', 'driving_license', 'utility_bill', 'student_id', 'employment_letter');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  user_type public.user_type NOT NULL,
  verification_status public.verification_status DEFAULT 'not_started',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create verification_documents table
CREATE TABLE public.verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_type public.document_type NOT NULL,
  file_url TEXT NOT NULL,
  status public.verification_status DEFAULT 'pending',
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.profiles(id),
  UNIQUE(user_id, document_type)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Verification documents RLS policies
CREATE POLICY "Users can view their own documents"
  ON public.verification_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON public.verification_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON public.verification_documents FOR UPDATE
  USING (auth.uid() = user_id);

-- Create storage bucket for verification documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'verification-documents',
  'verification-documents',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
);

-- Storage RLS policies
CREATE POLICY "Users can upload their own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'verification-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'verification-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Create function to update profile verification status
CREATE OR REPLACE FUNCTION public.update_profile_verification_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update profile verification status based on documents
  UPDATE public.profiles
  SET verification_status = CASE
    WHEN EXISTS (
      SELECT 1 FROM public.verification_documents
      WHERE user_id = NEW.user_id AND status = 'rejected'
    ) THEN 'rejected'::public.verification_status
    WHEN EXISTS (
      SELECT 1 FROM public.verification_documents
      WHERE user_id = NEW.user_id AND status = 'verified'
    ) AND NOT EXISTS (
      SELECT 1 FROM public.verification_documents
      WHERE user_id = NEW.user_id AND status IN ('pending', 'rejected')
    ) THEN 'verified'::public.verification_status
    ELSE 'pending'::public.verification_status
  END
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-update profile verification status
CREATE TRIGGER update_verification_status_trigger
  AFTER INSERT OR UPDATE ON public.verification_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profile_verification_status();
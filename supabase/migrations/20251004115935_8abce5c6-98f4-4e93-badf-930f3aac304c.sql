-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  current_address TEXT NOT NULL,
  
  -- Employment Information
  employment_status TEXT NOT NULL,
  employer_name TEXT,
  job_title TEXT,
  monthly_income NUMERIC,
  employment_duration TEXT,
  
  -- References
  reference_name TEXT,
  reference_phone TEXT,
  reference_relationship TEXT,
  
  -- Additional Information
  move_in_date DATE,
  number_of_occupants INTEGER,
  has_pets BOOLEAN DEFAULT false,
  pet_details TEXT,
  additional_notes TEXT,
  
  -- Application Documents URLs (stored in Supabase Storage)
  id_document_url TEXT,
  income_proof_url TEXT,
  
  -- Background check authorization
  background_check_authorized BOOLEAN DEFAULT false,
  
  -- Review information
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.profiles(id),
  rejection_reason TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  UNIQUE(property_id, tenant_id)
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications

-- Tenants can insert their own applications
CREATE POLICY "Tenants can insert their own applications"
ON public.applications
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = tenant_id AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND user_type = 'tenant'
  )
);

-- Tenants can view their own applications
CREATE POLICY "Tenants can view their own applications"
ON public.applications
FOR SELECT
TO authenticated
USING (auth.uid() = tenant_id);

-- Tenants can update their own pending applications
CREATE POLICY "Tenants can update their own pending applications"
ON public.applications
FOR UPDATE
TO authenticated
USING (auth.uid() = tenant_id AND status = 'pending');

-- Landlords can view applications for their properties
CREATE POLICY "Landlords can view applications for their properties"
ON public.applications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.properties
    WHERE properties.id = applications.property_id
    AND properties.landlord_id = auth.uid()
  )
);

-- Landlords can update applications for their properties
CREATE POLICY "Landlords can update applications for their properties"
ON public.applications
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.properties
    WHERE properties.id = applications.property_id
    AND properties.landlord_id = auth.uid()
  )
);

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('application-documents', 'application-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for application documents

-- Tenants can upload their own application documents
CREATE POLICY "Tenants can upload application documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'application-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Tenants can view their own documents
CREATE POLICY "Tenants can view their own application documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'application-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Landlords can view documents for applications on their properties
CREATE POLICY "Landlords can view tenant application documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'application-documents' AND
  EXISTS (
    SELECT 1 FROM public.applications a
    JOIN public.properties p ON p.id = a.property_id
    WHERE p.landlord_id = auth.uid()
    AND a.tenant_id::text = (storage.foldername(name))[1]
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Add inquiry count increment when application is created
CREATE OR REPLACE FUNCTION public.increment_property_inquiries()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.properties
  SET inquiries_count = inquiries_count + 1
  WHERE id = NEW.property_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER increment_inquiries_on_application
  AFTER INSERT ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_property_inquiries();
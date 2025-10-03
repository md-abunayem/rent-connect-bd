-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  landlord_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('house', 'apartment', 'room', 'shared_space')),
  location_address TEXT NOT NULL,
  location_city TEXT NOT NULL,
  location_state TEXT,
  location_country TEXT NOT NULL DEFAULT 'Bangladesh',
  location_lat NUMERIC(10, 8),
  location_lng NUMERIC(11, 8),
  price_monthly NUMERIC(10, 2) NOT NULL,
  price_currency TEXT NOT NULL DEFAULT 'BDT',
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqft INTEGER,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'rented')),
  available_from DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  views_count INTEGER NOT NULL DEFAULT 0,
  inquiries_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- RLS Policies for properties
CREATE POLICY "Landlords can view their own properties"
  ON public.properties
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = properties.landlord_id
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Landlords can insert their own properties"
  ON public.properties
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'landlord'
      AND profiles.id = properties.landlord_id
    )
  );

CREATE POLICY "Landlords can update their own properties"
  ON public.properties
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = properties.landlord_id
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Landlords can delete their own properties"
  ON public.properties
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = properties.landlord_id
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view active properties"
  ON public.properties
  FOR SELECT
  USING (status = 'active');

-- Create index for performance
CREATE INDEX idx_properties_landlord ON public.properties(landlord_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_location ON public.properties(location_city, location_country);

-- Create trigger for updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
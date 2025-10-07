-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'landlord', 'tenant');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Migrate existing user_type data to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, user_type::text::public.app_role
FROM public.profiles
ON CONFLICT (user_id, role) DO NOTHING;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user role (for backward compatibility)
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policy for user_roles: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policy for user_roles: Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policy for user_roles: Only admins can insert roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policy for user_roles: Only admins can update roles
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policy for user_roles: Only admins can delete roles
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop old properties RLS policies and create new ones using has_role
DROP POLICY IF EXISTS "Landlords can insert their own properties" ON public.properties;
DROP POLICY IF EXISTS "Landlords can update their own properties" ON public.properties;
DROP POLICY IF EXISTS "Landlords can view their own properties" ON public.properties;
DROP POLICY IF EXISTS "Landlords can delete their own properties" ON public.properties;

CREATE POLICY "Landlords can insert their own properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'landlord') 
  AND landlord_id = auth.uid()
);

CREATE POLICY "Landlords can update their own properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (landlord_id = auth.uid() AND public.has_role(auth.uid(), 'landlord'));

CREATE POLICY "Landlords can view their own properties"
ON public.properties
FOR SELECT
TO authenticated
USING (landlord_id = auth.uid() AND public.has_role(auth.uid(), 'landlord'));

CREATE POLICY "Landlords can delete their own properties"
ON public.properties
FOR DELETE
TO authenticated
USING (landlord_id = auth.uid() AND public.has_role(auth.uid(), 'landlord'));

-- Add admin policies for properties
CREATE POLICY "Admins can view all properties"
ON public.properties
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete all properties"
ON public.properties
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update applications RLS policies
DROP POLICY IF EXISTS "Tenants can insert their own applications" ON public.applications;

CREATE POLICY "Tenants can insert their own applications"
ON public.applications
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = tenant_id 
  AND public.has_role(auth.uid(), 'tenant')
);

-- Add admin policies for applications
CREATE POLICY "Admins can view all applications"
ON public.applications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all applications"
ON public.applications
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger to auto-assign role on profile creation
CREATE OR REPLACE FUNCTION public.assign_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert role based on user_type when profile is created
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, NEW.user_type::text::public.app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_profile_created
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.assign_user_role();
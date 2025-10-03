-- Fix search_path for update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Fix search_path for update_profile_verification_status function
CREATE OR REPLACE FUNCTION public.update_profile_verification_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;
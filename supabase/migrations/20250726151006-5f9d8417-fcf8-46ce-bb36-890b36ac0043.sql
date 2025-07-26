-- Update RLS policies to use correct email (remove 's' from exotichauls)
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin can manage faqs" ON public.faqs;
DROP POLICY IF EXISTS "Admin can manage gallery images" ON public.gallery_images;

-- Create new policies with correct email
CREATE POLICY "Admin can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (auth.email() = 'exotichaul@gmail.com');

CREATE POLICY "Admin can manage faqs" 
ON public.faqs 
FOR ALL 
USING (auth.email() = 'exotichaul@gmail.com');

CREATE POLICY "Admin can manage gallery images" 
ON public.gallery_images 
FOR ALL 
USING (auth.email() = 'exotichaul@gmail.com');
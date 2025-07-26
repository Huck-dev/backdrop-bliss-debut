-- Create table for testimonials/reviews
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for FAQs
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for gallery images
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view testimonials" 
ON public.testimonials 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view faqs" 
ON public.faqs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view gallery images" 
ON public.gallery_images 
FOR SELECT 
USING (true);

-- Create policies for admin access (will be restricted to specific email)
CREATE POLICY "Admin can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (auth.email() = 'exotichauls@gmail.com');

CREATE POLICY "Admin can manage faqs" 
ON public.faqs 
FOR ALL 
USING (auth.email() = 'exotichauls@gmail.com');

CREATE POLICY "Admin can manage gallery images" 
ON public.gallery_images 
FOR ALL 
USING (auth.email() = 'exotichauls@gmail.com');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing testimonials
INSERT INTO public.testimonials (name, location, rating, review) VALUES
('Alan Gallant', 'Ontario', 5, 'Ian did an incredible job bringing a 1971 Cuda project car from Winnipeg, to me here in Ontario...with a crate motor as well...great job👍👍'),
('Kevin Wagner', 'Canada', 5, 'Awesome job!! VERY happy with this company .. very professional and extremely careful'),
('Joe Hanna', 'Calgary', 5, 'I''m so thrilled to have 68 Oldsmobile here in Calgary, Ian from Exotic Hauls did a fantastic job getting it here safely and in a very timely manor, he was even able to deliver it a day earlier than what expected, I would definitely recommend his service , drive safe my new friend 🙏🙏');

-- Insert existing FAQs
INSERT INTO public.faqs (question, answer, display_order) VALUES
('What services does Exotic Hauls provide?', 'Transport for exotic high end vehicles in a fully enclosed trailer.', 1),
('What information is required to obtain a quote to ship my vehicle?', 'Pickup location and final destination, Vehicle make and model, Vehicle length, width, height', 2),
('What regions and countries does Exotic Hauls serve?', 'We cover Canada, coast to coast.', 3),
('Does Exotic Hauls offer insurance for vehicles being transported?', 'We are fully insured for $200000 Cargo. Insurance can be increased for more expensive vehicles on request.', 4);

-- Insert existing gallery images
INSERT INTO public.gallery_images (src, alt, title, display_order) VALUES
('/lovable-uploads/33b7de37-764e-4fe0-a795-a35f62436f20.png', 'Classic white Cadillac convertible', 'Luxury Classic Transport', 1),
('/lovable-uploads/1a788d6c-87e0-477a-a9da-0ad87527560a.png', 'Red Ferrari at Exotic Hauls facility', 'Professional Ferrari Service', 2),
('/lovable-uploads/b7edde2c-6c3a-480f-a00d-3643e91db773.png', 'Red Ferrari sports car front view', 'Exotic Car Expertise', 3),
('/lovable-uploads/75cb4a20-57af-422f-8715-c03722bfecb6.png', 'Red Ferrari sports car with Exotic Hauls facility', 'Professional Exotic Car Service', 4),
('/lovable-uploads/24803038-86a9-447e-838b-df46ff328267.png', 'Classic white muscle car with garage and trailer in background', 'Premium Vehicle Transport', 5),
('/lovable-uploads/b6e12579-8844-4452-8c2a-b7048fd6d6fe.png', 'Yellow Camaro with Exotic Hauls trailer', 'Enclosed Transport Service', 6),
('/lovable-uploads/06ac5453-d2af-4fdb-8a8e-c702e845a19b.png', 'Red Chevelle SS on road', 'Classic Car Transport', 7),
('/lovable-uploads/4f4d99da-f728-4d31-998c-556a2aed909c.png', 'Car restoration project in garage', 'Project Vehicle Transport', 8),
('/lovable-uploads/9bc603e1-82eb-4d5a-8035-ef6cb4701266.png', 'Beige classic car with transport trailer', 'Door-to-Door Service', 9),
('/lovable-uploads/627bc006-413c-431f-85d3-62e06439bdd1.png', 'Yellow Chevrolet SSR in driveway', 'Specialty Vehicle Transport', 10),
('/lovable-uploads/a4488eb7-2e97-46ad-9921-ac5e291b8fea.png', 'Gray Nissan GT-R with sport modifications', 'High-Performance Vehicle Transport', 11),
('/lovable-uploads/ad2311cc-3c3a-4ace-a999-ec5a2179ee0c.png', 'Ford Super Duty with Exotic Hauls trailer', 'Professional Transport Equipment', 12),
('/lovable-uploads/16da9ec3-d4bb-4988-ad70-e8bf8fb0e5d1.png', 'Exotic Hauls enclosed trailer', 'State-of-the-Art Enclosed Trailers', 13),
('/lovable-uploads/0ec65096-63ea-46db-afcc-52ca593c270e.png', 'Brown Lincoln Continental Town Car', 'Luxury Vehicle Transport', 14),
('/lovable-uploads/3ff36979-decd-4301-9dbf-90d3384a9dd7.png', 'Classic Cutlass in enclosed trailer with professional tie-downs', 'Secure Classic Car Transport', 15),
('/lovable-uploads/671a0d00-61bc-4adf-b38f-935dfcf7927f.png', 'Classic Lincoln Continental with Exotic Hauls trailer', 'Premium Classic Vehicle Service', 16),
('/lovable-uploads/1428e2d0-b837-46ff-8788-e61f28ae7dfc.png', 'Ford Super Duty with Exotic Hauls trailer and vintage race car', 'Professional Racing Vehicle Transport', 17),
('/lovable-uploads/6d603409-1a90-4f95-bdd8-614bcf277458.png', 'Vintage race car #75 in garage facility', 'Historic Racing Car Transport', 18),
('/lovable-uploads/1aa3cad8-7e05-43e7-a430-292db73cd633.png', 'Blue Dodge Viper with white stripes in enclosed trailer', 'Supercar Transport Service', 19),
('/lovable-uploads/39e4a890-c6e0-4aa2-a23a-e1b9c2e2eff6.png', 'Black classic Chevrolet pickup truck in garage', 'Classic Truck Transport', 20),
('/lovable-uploads/df48a8be-113f-431b-9cf6-9eea3451fe55.png', 'Blue vintage race car #99 Daytona in enclosed trailer', 'Vintage Racing Vehicle Transport', 21),
('/lovable-uploads/6a2e4fb4-34fa-469d-b760-fc70224cb71b.png', 'Blue Dodge Viper GTS with white stripes at dealership', 'Exotic Sports Car Transport', 22);
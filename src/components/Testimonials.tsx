
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to default testimonials if database fails
        setTestimonials([
          {
            id: "1",
            name: "Alan Gallant",
            location: "Ontario",
            rating: 5,
            review: "Ian did an incredible job bringing a 1971 Cuda project car from Winnipeg, to me here in Ontario...with a crate motor as well...great job👍👍"
          },
          {
            id: "2",
            name: "Kevin Wagner", 
            location: "Canada",
            rating: 5,
            review: "Awesome job!! VERY happy with this company .. very professional and extremely careful"
          },
          {
            id: "3",
            name: "Joe Hanna",
            location: "Calgary",
            rating: 5,
            review: "I'm so thrilled to have 68 Oldsmobile here in Calgary, Ian from Exotic Hauls did a fantastic job getting it here safely and in a very timely manor, he was even able to deliver it a day earlier than what expected, I would definitely recommend his service , drive safe my new friend 🙏🙏"
          }
        ]);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500", 
      "bg-teal-500",
      "bg-green-500"
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why our customers love Exotic Hauls
            </h2>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-white">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold">4.9</span>
              {renderStars(5)}
            </div>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-6 flex-grow">
                      {testimonial.review}
                    </p>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(index)}`}>
                        {getInitials(testimonial.name)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-slate-400 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-slate-700/80 border-slate-600 text-white hover:bg-slate-600/80" />
          <CarouselNext className="hidden md:flex -right-4 bg-slate-700/80 border-slate-600 text-white hover:bg-slate-600/80" />
        </Carousel>

        <div className="md:hidden flex items-center justify-center space-x-2 text-white mt-6">
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold">4.9</span>
            {renderStars(5)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

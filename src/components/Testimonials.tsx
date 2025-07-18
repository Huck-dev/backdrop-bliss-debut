
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Calgary to Vancouver",
      rating: 5,
      review: "Could not be happier with Exotic Hauls. The staff was friendly and my Lamborghini arrived on time. I appreciated their attention to detail and how they made sure my car was well-protected during the transport. The pricing was transparent, and there were no hidden fees. Highly recommended!"
    },
    {
      name: "David Chen",
      location: "Toronto to Montreal",
      rating: 5,
      review: "Amazing service! My Ferrari was picked up and delivered right on time. Highly recommend!"
    },
    {
      name: "Emma Wilson",
      location: "Vancouver to Halifax",
      rating: 5,
      review: "The Exotic Hauls team was amazing! Quick pickup, perfect delivery. Thanks!"
    },
    {
      name: "Michael Rodriguez",
      location: "Edmonton to Toronto",
      rating: 5,
      review: "Professional service from start to finish. My McLaren was handled with the utmost care and arrived in pristine condition. The enclosed trailer provided excellent protection during the long journey across Canada."
    }
  ];

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

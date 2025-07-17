
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-32">
      {/* Background Logo with Parallax */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-30"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <img 
          src="/lovable-uploads/db063a9f-c363-4ce9-ba3d-8b0274dc53f5.png" 
          alt="Exotic Hauls Logo" 
          className="w-full max-w-4xl h-auto object-contain"
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Hero Text */}
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Premium Auto Transport
            <span className="block text-2xl md:text-3xl font-light text-slate-300 mt-2">
              Where Luxury Meets Reliability
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            From exotic supercars to classic collectibles, we provide white-glove auto transport services 
            with unmatched care and precision. Your vehicle deserves the extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Get Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3 transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3 transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

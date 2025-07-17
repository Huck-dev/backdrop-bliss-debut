
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
      {/* Background Logo with Parallax and Fade Effect */}
      <div 
        className="absolute top-0 left-0 right-0 h-1/2 flex items-center justify-center"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="relative w-full max-w-4xl h-auto">
          <img 
            src="/lovable-uploads/db063a9f-c363-4ce9-ba3d-8b0274dc53f5.png" 
            alt="Exotic Hauls Logo" 
            className="w-full h-auto object-contain opacity-40"
          />
          {/* Gradient overlay to fade edges into background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
        </div>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content - positioned in lower portion */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Get Quote Button */}
        <div className="animate-fade-in">
          <Button 
            size="lg" 
            className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Get Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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

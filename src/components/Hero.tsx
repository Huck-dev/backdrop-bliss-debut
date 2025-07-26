
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToQuote = () => {
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-96">
      {/* Content with enhanced styling */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-6 leading-tight">
            EXOTIC HAULS
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            Premium automotive transport solutions for luxury and exotic vehicles
          </p>
        </div>
        
        {/* Call to Action Button */}
        <div className="animate-fade-in">
          <Button
            onClick={scrollToQuote}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground px-16 py-8 text-xl font-semibold transition-all duration-500 hover:scale-105 shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-elegant)] border-0 rounded-2xl"
          >
            Request Premium Quote
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

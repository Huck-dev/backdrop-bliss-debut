
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToQuote = () => {
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content - centered */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Premium Auto Transport
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto animate-fade-in">
          Secure, reliable vehicle shipping across Canada with white-glove service for luxury and exotic cars
        </p>
        
        {/* Call to Action Button */}
        <div className="animate-fade-in">
          <Button
            onClick={scrollToQuote}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Request a Quote
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

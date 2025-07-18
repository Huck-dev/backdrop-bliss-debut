
import QuoteForm from "./QuoteForm";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden pb-32">
      {/* Content - positioned in lower portion */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Quote Form */}
        <div className="animate-fade-in">
          <QuoteForm />
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

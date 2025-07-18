
import { useEffect, useState } from "react";

const DynamicBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      // Define section breakpoints with smoother transitions
      const sections = [
        { name: 'hero', start: 0, end: window.innerHeight * 0.8 },
        { name: 'services', start: window.innerHeight * 0.6, end: window.innerHeight * 1.8 },
        { name: 'about', start: window.innerHeight * 1.6, end: window.innerHeight * 2.8 },
        { name: 'contact', start: window.innerHeight * 2.6, end: window.innerHeight * 4 }
      ];

      // Find current section with overlap for smoother transitions
      const current = sections.find(section => 
        scrollPosition >= section.start && scrollPosition < section.end
      );
      
      if (current) {
        setCurrentSection(current.name);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define background gradients for each section with smoother color transitions
  const getBackgroundGradient = () => {
    switch (currentSection) {
      case 'hero':
        return 'from-slate-900 via-slate-800 to-slate-700';
      case 'services':
        return 'from-slate-100 via-slate-50 to-white';
      case 'about':
        return 'from-slate-200 via-slate-100 to-slate-50';
      case 'contact':
        return 'from-slate-800 via-slate-700 to-slate-900';
      default:
        return 'from-slate-900 via-slate-800 to-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Dynamic background gradient with smoother transitions */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br transition-all duration-[2000ms] ease-in-out ${getBackgroundGradient()}`}
      />
      
      {/* Background logo with smoother parallax effect */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-20 transition-opacity duration-1000 ease-out"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="relative w-full max-w-4xl h-auto">
          <img 
            src="/lovable-uploads/db063a9f-c363-4ce9-ba3d-8b0274dc53f5.png" 
            alt="Exotic Hauls Logo" 
            className="w-full h-auto object-contain mx-auto transition-all duration-1000 ease-out"
          />
          {/* Smoother gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 transition-all duration-[2000ms] ease-in-out"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 transition-all duration-[2000ms] ease-in-out"></div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBackground;

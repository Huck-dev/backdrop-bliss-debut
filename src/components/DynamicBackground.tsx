
import { useEffect, useState } from "react";

const DynamicBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      // Define section breakpoints
      const sections = [
        { name: 'hero', start: 0, end: window.innerHeight },
        { name: 'services', start: window.innerHeight, end: window.innerHeight * 2 },
        { name: 'about', start: window.innerHeight * 2, end: window.innerHeight * 3 },
        { name: 'contact', start: window.innerHeight * 3, end: window.innerHeight * 4 }
      ];

      // Find current section
      const current = sections.find(section => 
        scrollPosition >= section.start && scrollPosition < section.end
      );
      
      if (current) {
        setCurrentSection(current.name);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define background gradients for each section
  const getBackgroundGradient = () => {
    switch (currentSection) {
      case 'hero':
        return 'from-slate-900 via-slate-800 to-slate-900';
      case 'services':
        return 'from-slate-50 via-white to-slate-50';
      case 'about':
        return 'from-slate-100 via-slate-50 to-slate-100';
      case 'contact':
        return 'from-slate-900 via-slate-800 to-slate-900';
      default:
        return 'from-slate-900 via-slate-800 to-slate-900';
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Dynamic background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${getBackgroundGradient()}`}
      />
      
      {/* Background logo with parallax effect */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-20"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="relative w-full max-w-4xl h-auto">
          <img 
            src="/lovable-uploads/db063a9f-c363-4ce9-ba3d-8b0274dc53f5.png" 
            alt="Exotic Hauls Logo" 
            className="w-full h-auto object-contain mx-auto"
          />
          {/* Gradient overlay to blend with background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBackground;

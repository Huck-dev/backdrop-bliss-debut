
import { useEffect, useState } from "react";

const DynamicBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Enhanced luxury background */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse" 
           style={{ animationDuration: '8s' }} />
      
      {/* Background logo with enhanced parallax */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-20"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`,
        }}
      >
        <div className="relative w-full max-w-5xl h-auto">
          <img 
            src="/lovable-uploads/db063a9f-c363-4ce9-ba3d-8b0274dc53f5.png" 
            alt="Exotic Hauls Logo" 
            className="w-full h-auto object-contain mx-auto filter drop-shadow-[0_0_50px_rgba(34,197,94,0.3)]"
          />
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse" 
           style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-xl animate-pulse" 
           style={{ animationDuration: '10s', animationDelay: '3s' }} />
    </div>
  );
};

export default DynamicBackground;

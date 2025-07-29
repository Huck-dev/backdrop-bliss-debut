
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
      {/* Base dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
      
      {/* Background logo with parallax effect */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-40"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="relative w-full max-w-4xl h-auto">
          <img 
            src="/lovable-uploads/db063a9f-c363-4ce9-ba3d-8b0274dc53f5.png" 
            alt="Exotic Hauls Logo" 
            className="w-full h-auto object-contain mx-auto"
          />
        </div>
      </div>
      
      {/* Subtle gold and black glow effects */}
      <div className="absolute inset-0">
        {/* Top left gold glow */}
        <div 
          className="absolute top-0 left-0 w-96 h-96 opacity-10"
          style={{
            background: `radial-gradient(circle, hsl(var(--gold) / 0.3) 0%, transparent 50%)`,
            transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.05}px)`,
          }}
        />
        
        {/* Bottom right gold glow */}
        <div 
          className="absolute bottom-0 right-0 w-80 h-80 opacity-15"
          style={{
            background: `radial-gradient(circle, hsl(var(--gold-muted) / 0.4) 0%, transparent 60%)`,
            transform: `translate(${scrollY * 0.08}px, ${scrollY * -0.03}px)`,
          }}
        />
        
        {/* Center deep black accent */}
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 opacity-20 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `radial-gradient(circle, hsl(var(--deep-black) / 0.8) 0%, transparent 40%)`,
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)`,
          }}
        />
        
        {/* Additional subtle gold accent */}
        <div 
          className="absolute top-1/4 right-1/4 w-48 h-48 opacity-8"
          style={{
            background: `radial-gradient(ellipse, hsl(var(--gold) / 0.2) 0%, transparent 70%)`,
            transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.1}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default DynamicBackground;

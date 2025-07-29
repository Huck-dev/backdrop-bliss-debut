
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
      {/* Base background with animated gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%),
            radial-gradient(circle at ${20 + scrollY * 0.01}% ${30 + scrollY * 0.02}%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${80 - scrollY * 0.01}% ${70 - scrollY * 0.02}%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)
          `,
          backgroundSize: '400% 400%, 100% 100%, 100% 100%',
          animation: 'gradientShift 8s ease infinite'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (Math.random() * 0.5 + 0.1)}px)`,
              animation: `float ${Math.random() * 3 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Geometric overlay patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-400/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-yellow-400/40 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-pulse" />
      </div>
      
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
    </div>
  );
};

export default DynamicBackground;

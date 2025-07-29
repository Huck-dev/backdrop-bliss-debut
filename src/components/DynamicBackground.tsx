
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
      
      {/* Classic ornamental elements */}
      <div className="absolute inset-0">
        {/* Corner decorative elements */}
        <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-yellow-400/40 opacity-60" />
        <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-blue-400/40 opacity-60" />
        <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-emerald-400/40 opacity-60" />
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-purple-400/40 opacity-60" />
        
        {/* Elegant diagonal lines */}
        <div className="absolute top-0 left-1/4 w-0.5 h-32 bg-gradient-to-b from-yellow-400/30 to-transparent transform rotate-12" />
        <div className="absolute top-0 right-1/4 w-0.5 h-32 bg-gradient-to-b from-blue-400/30 to-transparent transform -rotate-12" />
        <div className="absolute bottom-0 left-1/3 w-0.5 h-32 bg-gradient-to-t from-emerald-400/30 to-transparent transform -rotate-12" />
        <div className="absolute bottom-0 right-1/3 w-0.5 h-32 bg-gradient-to-t from-purple-400/30 to-transparent transform rotate-12" />
        
        {/* Central ornamental pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 border-2 border-yellow-400/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-8 border border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
            <div className="absolute inset-16 border border-emerald-400/20 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Side accent elements */}
        <div className="absolute top-1/4 left-4 w-1 h-24 bg-gradient-to-b from-transparent via-yellow-400/40 to-transparent animate-pulse" />
        <div className="absolute top-1/2 right-4 w-1 h-24 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-8 w-1 h-24 bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
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

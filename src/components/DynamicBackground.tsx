
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
      {/* Enhanced dynamic background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, hsl(var(--gold) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, hsl(var(--accent) / 0.1) 0%, transparent 50%)
          `,
          animation: 'pulse 4s ease-in-out infinite alternate'
        }}
      />
      
      {/* Floating animated shapes */}
      <div className="absolute inset-0">
        {/* Large floating circle */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-5 border border-white/20"
          style={{
            top: '20%',
            left: '10%',
            transform: `translateY(${scrollY * -0.1}px)`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        
        {/* Medium floating diamond */}
        <div 
          className="absolute w-32 h-32 opacity-8 border border-gold/30 rotate-45"
          style={{
            top: '60%',
            right: '15%',
            transform: `translateY(${scrollY * 0.05}px) rotate(45deg)`,
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        
        {/* Small floating squares */}
        <div 
          className="absolute w-16 h-16 opacity-10 border border-primary/40"
          style={{
            top: '30%',
            right: '30%',
            transform: `translateY(${scrollY * -0.08}px)`,
            animation: 'float 5s ease-in-out infinite'
          }}
        />
        
        {/* Animated lines */}
        <div 
          className="absolute w-48 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20"
          style={{
            top: '40%',
            left: '60%',
            transform: `translateX(${scrollY * 0.1}px)`,
            animation: 'slideRight 10s linear infinite'
          }}
        />
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

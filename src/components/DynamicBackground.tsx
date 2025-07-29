
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
      
      {/* Flowing wave patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            d="M0,200 Q300,100 600,200 T1200,200 L1200,0 L0,0 Z"
            fill="rgba(255, 215, 0, 0.05)"
            style={{
              transform: `translateX(${scrollY * -0.1}px)`,
            }}
          />
          <path
            d="M0,400 Q300,300 600,400 T1200,400 L1200,0 L0,0 Z"
            fill="rgba(59, 130, 246, 0.03)"
            style={{
              transform: `translateX(${scrollY * 0.05}px)`,
            }}
          />
          <path
            d="M0,600 Q300,500 600,600 T1200,600 L1200,800 L0,800 Z"
            fill="rgba(16, 185, 129, 0.04)"
            style={{
              transform: `translateX(${scrollY * -0.08}px)`,
            }}
          />
        </svg>
        
        {/* Abstract color blobs */}
        <div 
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
            transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.03}px) scale(${1 + scrollY * 0.0001})`
          }}
        />
        <div 
          className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full opacity-15 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 69, 19, 0.4) 0%, transparent 60%)',
            transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.02}px) scale(${1 + scrollY * 0.0001})`
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

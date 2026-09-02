import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute smooth scroll parallax scale & opacity
  const parallaxScale = 1 + scrollY * 0.0004;
  const parallaxTranslateY = scrollY * 0.3;
  const contentOpacity = Math.max(0, 1 - scrollY * 0.002);

  // Generate random particles for gold & silver sparkling effect
  const particles = React.useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const isGold = Math.random() > 0.4;
      const isDiamond = Math.random() > 0.5;
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2, // 2px to 6px
        speed: Math.random() * 0.8 + 0.2, // Faster parallax
        delay: Math.random() * 3,
        direction: Math.random() > 0.3 ? -1 : 1, // Mostly float upwards when scrolling down
        colorClass: isGold 
          ? 'bg-[#D4AF37] shadow-[0_0_12px_2px_rgba(212,175,55,0.8)]' 
          : 'bg-[#E2E8F0] shadow-[0_0_12px_2px_rgba(226,232,240,0.8)]',
        shapeClass: isDiamond ? 'rotate-45' : 'rounded-full',
        baseScale: Math.random() * 0.5 + 0.5
      };
    });
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-start px-8 md:px-24"
      style={{ backgroundImage: "url('/images/newlogo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      
      {/* Glittering Gold & Silver Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((p) => {
          // Dynamic scale that oscillates based on scroll to simulate intense "sparkling" while moving
          const dynamicScale = Math.max(0, p.baseScale + Math.sin(scrollY * 0.02 + p.id) * 0.8);
          
          return (
            <div
              key={p.id}
              className={`absolute animate-pulse ${p.colorClass} ${p.shapeClass}`}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${p.delay}s`,
                transform: `translateY(${scrollY * p.speed * p.direction}px) scale(${dynamicScale}) rotate(${scrollY * p.speed * 2}deg)`,
                opacity: Math.max(0, 1 - scrollY * 0.0015),
              }}
            />
          );
        })}
      </div>

      {/* Hero Content on the Left Side */}
      <div
        className="relative z-20 flex flex-col justify-center items-center text-center space-y-6 animate-fade-in w-full md:w-1/2 h-full"
      >
        {/* Logo */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex items-center justify-center">
          <img
            src="/images/black logo.jpeg"
            alt="Zeyvelle Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-gold-gradient font-bold tracking-[0.2em] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] uppercase">
          Zeyvelle
        </h1>
        
        {/* Tagline */}
        <p className="font-sans text-silk/70 text-sm sm:text-base tracking-[0.4em] uppercase font-light">
          Where Elegance Blossoms
        </p>

        <div className="w-36 h-[2px] bg-gold-gradient mt-4 shadow-gold-sm mx-auto" />
      </div>

      {/* Decorative gold Corner Borders */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-gold/60 pointer-events-none hidden sm:block" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-gold/60 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-gold/60 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-gold/60 pointer-events-none hidden sm:block" />
    </section>
  );
};

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

  return (
    <section id="home" className="relative w-full h-screen bg-noir overflow-hidden flex items-center justify-center">
      {/* Full-Screen Edge-to-Edge Photorealistic Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/royal_red_gown.jpg"
          alt="Zeyvelle Haute Couture Full-Screen Hero"
          className="w-full h-full object-cover object-[center_70%] transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${parallaxScale}) translateY(${parallaxTranslateY}px)`,
          }}
        />

        {/* Lighter Gradient Vignette Overlays for Readability without hiding the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content Centered over Full-Screen Image */}
      <div
        className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-6 animate-fade-in"
        style={{ opacity: contentOpacity }}
      >
        {/* Tagline */}
        <h1 className="font-serif italic text-5xl sm:text-7xl lg:text-8xl text-gold-gradient font-bold tracking-wide drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-tight">
          "Where Elegance Blossoms"
        </h1>

        <div className="w-36 h-[2px] bg-gold-gradient mx-auto my-2 shadow-gold-sm" />

        {/* Scroll Indicator */}
        <button
          onClick={() => {
            const categoriesSection = document.getElementById('categories');
            if (categoriesSection) categoriesSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="pt-8 flex flex-col items-center space-y-2 text-gold/80 hover:text-gold transition-colors cursor-pointer group"
        >
          <span className="text-xs uppercase tracking-[0.35em] font-semibold">Explore Collections</span>
          <div className="w-10 h-10 rounded-full border border-gold/40 bg-noir-950/80 backdrop-blur-md flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300 animate-bounce">
            <ArrowDown className="w-4 h-4 text-gold" />
          </div>
        </button>
      </div>

      {/* Decorative gold Corner Borders */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-gold/60 pointer-events-none hidden sm:block" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-gold/60 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-gold/60 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-gold/60 pointer-events-none hidden sm:block" />
    </section>
  );
};

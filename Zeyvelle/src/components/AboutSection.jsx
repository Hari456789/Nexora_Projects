import React from 'react';
import { Sparkles, Gem, ShieldCheck, Heart } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-noir-950 relative border-t border-gold/15 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Brand Imagery Collage */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-gold/30 shadow-gold-sm">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                alt="Zeyvelle Atelier Craftsmanship"
                className="w-full h-full object-cover filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent" />
            </div>

            {/* Overlapping Secondary Card */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 w-64 bg-noir-900 border border-gold/40 p-5 shadow-2xl hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-1">
                Artisanal Excellence
              </p>
              <p className="font-serif italic text-sm text-silk">
                "Every stitch tells a story of refined empowerment."
              </p>
              <p className="text-[9px] uppercase tracking-widest text-silk/40 mt-2">
                — Atelier Director
              </p>
            </div>
          </div>

          {/* Right: Story & Values */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-gold text-xs uppercase tracking-[0.3em] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Atelier Story</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wider text-silk leading-tight">
              Redefining Modern Female Elegance
            </h2>

            <div className="w-20 h-[1.5px] bg-gold-gradient" />

            <p className="text-sm sm:text-base text-silk/75 font-sans leading-relaxed font-light">
              Founded on the belief that fashion should feel like armour and poetry combined, <strong className="text-gold font-semibold">ZEYVELLE</strong> crafts bespoke garments for women who navigate the world with effortless grace and magnetic authority.
            </p>

            <p className="text-xs sm:text-sm text-silk/60 font-sans leading-relaxed">
              From our sculpted tuxedos and liquid silk party gowns to our tailored co-ords and minimalist crop tops, each piece is engineered with haute-couture precision, using sustainably sourced Mulberry silks, Japanese poplins, and Italian virgin wools.
            </p>

            {/* 3 Pillar Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gold/15">
              <div className="space-y-2 p-3 bg-noir-900 border border-gold/10">
                <Gem className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-sm font-bold text-silk">Opulent Fabrics</h3>
                <p className="text-[11px] text-silk/50">100% natural silk, plush velvet, and organic flax.</p>
              </div>

              <div className="space-y-2 p-3 bg-noir-900 border border-gold/10">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-sm font-bold text-silk">Bespoke Fit</h3>
                <p className="text-[11px] text-silk/50">Ergonomic tailoring built to flatter every line.</p>
              </div>

              <div className="space-y-2 p-3 bg-noir-900 border border-gold/10">
                <Heart className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-sm font-bold text-silk">Ethical Atelier</h3>
                <p className="text-[11px] text-silk/50">Fair wages and zero-waste pattern drafting.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

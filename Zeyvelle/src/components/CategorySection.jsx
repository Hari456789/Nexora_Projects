import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategorySection = () => {
  const { setActiveCategory } = useCart();

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-24 bg-noir-900 relative border-t border-gold/15 overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-gold text-xs uppercase tracking-[0.3em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wider text-silk">
            Shop by Category
          </h2>

          <div className="w-24 h-[1.5px] bg-gold-gradient mx-auto my-4" />

          <p className="text-xs sm:text-sm text-silk/60 font-sans tracking-wide">
            Explore bespoke ensembles designed with meticulous attention to detail, cut, and fabric.
          </p>
        </div>

        {/* Categories Grid (Responsive: 1 col mobile, 2 sm, 3 md, 5 desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative h-96 rounded-none overflow-hidden cursor-pointer border border-gold/20 hover:border-gold transition-all duration-500 shadow-lg hover:shadow-gold-lg"
            >
              {/* Full Bleed Image with Zoom */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Dark Gold-Tinted Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-900/60 to-gold/10 group-hover:via-noir-950/80 group-hover:to-gold/20 transition-all duration-500" />

              {/* Card Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-center items-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80 font-medium mb-1 group-hover:text-gold transition-colors">
                  {cat.itemCount}
                </span>

                <h3 className="font-serif text-2xl font-bold text-silk group-hover:text-gold tracking-wide transition-colors duration-300">
                  {cat.name}
                </h3>

                <p className="text-[11px] text-silk/60 font-light mt-1 max-w-[180px] line-clamp-1">
                  {cat.subtitle}
                </p>

                {/* Animated Arrow button */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2 text-gold text-xs uppercase tracking-widest font-semibold">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Subtle Hairline Frame */}
              <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

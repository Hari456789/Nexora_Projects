import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { Sparkles, X, ArrowRight, Search } from 'lucide-react';

export const ProductsSection = () => {
  const { activeCategory, setActiveCategory } = useCart();
  const [isCatalogExpanded, setIsCatalogExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Exact categories requested by user
  const filterTabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'western', label: 'Western' },
    { id: 'party-wear', label: 'Party Wear' },
    { id: 'co-ord-set', label: 'Co-ord Set' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'crop-tops', label: 'Crop Tops' },
  ];

  // Filter products by category and search term
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.categoryId === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured 4 products for default display
  const featured4Products = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section id="shop" className="py-24 bg-noir relative border-t border-gold/15">
      {/* Background Decorative gold Glow */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-gold text-xs uppercase tracking-[0.3em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Lookbook</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wider text-silk">
            Featured Products
          </h2>

          <div className="w-24 h-[1.5px] bg-gold-gradient mx-auto my-4" />

          <p className="text-xs sm:text-sm text-silk/60 font-sans tracking-wide">
            Handcrafted silhouettes engineered with rich Italian silks, French laces, and sculpted tailoring.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-gold text-noir border border-gold font-semibold shadow-gold-sm'
                  : 'bg-noir-900 text-silk/70 border border-white/10 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar when in catalog mode or filtered view */}
        {activeCategory !== 'all' && (
          <div className="max-w-md mx-auto mb-10 relative">
            <input
              type="text"
              placeholder="Search by product name or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-noir-900 border border-gold/30 text-silk text-xs py-3 px-4 pl-10 focus:outline-none focus:border-gold transition-colors"
            />
            <Search className="w-4 h-4 text-gold/60 absolute left-3 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-silk/40 hover:text-gold"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* DEFAULT VIEW: Exactly 4 Featured Product Cards Grid (2 cols mobile, 4 cols desktop) */}
        {!isCatalogExpanded && activeCategory === 'all' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featured4Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* EXPANDED OR FILTERED CATALOG VIEW */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-fade-in">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center space-y-4">
                <p className="font-serif text-2xl text-silk/60">No creations found in this collection.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-noir transition-colors"
                >
                  Reset Category Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Centered "View All" Button / Catalog Toggle */}
        <div className="mt-16 text-center">
          {!isCatalogExpanded && activeCategory === 'all' ? (
            <button
              onClick={() => setIsCatalogExpanded(true)}
              className="group relative inline-flex items-center space-x-3 px-10 py-4 border border-gold text-gold font-sans text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-500 hover:text-noir gold-shimmer-btn"
            >
              <span className="absolute inset-0 bg-gold-gradient transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">View All Products ({PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          ) : (
            isCatalogExpanded && (
              <button
                onClick={() => setIsCatalogExpanded(false)}
                className="inline-flex items-center space-x-2 px-8 py-3 border border-white/20 text-silk/80 text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-colors"
              >
                <span>Collapse Catalog</span>
                <X className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

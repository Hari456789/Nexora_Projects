import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Plus, Minus, Check, ShieldCheck } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, getProductRating } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(null);
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const ratingInfo = getProductRating(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-noir-950/85 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative bg-noir-900 border border-gold/40 w-full max-w-4xl shadow-2xl overflow-hidden z-10 animate-slide-up my-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 text-silk/60 hover:text-gold hover:bg-gold/10 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Product Image */}
          <div className="relative flex flex-col h-full bg-noir-950 p-4">
            <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-noir-950 flex-1 w-full overflow-hidden">
              <img
                src={quickViewProduct.images ? quickViewProduct.images[activeImageIndex] : quickViewProduct.image}
                alt={quickViewProduct.name}
                className="absolute inset-0 w-full h-full object-cover filter brightness-95"
              />
              {quickViewProduct.badge && (
                <div className="absolute top-4 left-4 bg-noir-950/80 backdrop-blur-md border border-gold/40 px-3 py-1 text-xs uppercase tracking-widest text-gold z-10">
                  {quickViewProduct.badge}
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {quickViewProduct.images && quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gold/20">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-28 shrink-0 border transition-all ${
                      activeImageIndex === idx ? 'border-gold scale-105 shadow-gold-sm z-10' : 'border-gold/20 opacity-60 hover:opacity-100 hover:border-gold/50'
                    }`}
                  >
                    <img src={img} alt={`${quickViewProduct.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Ordering */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gold/80">
                <span>{quickViewProduct.category}</span>
                <span>•</span>
                <span>Code: {quickViewProduct.id}</span>
                <span>•</span>
                <div className="flex items-center space-x-1 text-gold">
                  <Star className={`w-3.5 h-3.5 ${ratingInfo.hasReviews ? 'fill-gold text-gold' : 'text-gold/40'}`} />
                  <span>
                    {ratingInfo.hasReviews
                      ? `${ratingInfo.rating} (${ratingInfo.reviewCount} ${ratingInfo.reviewCount === 1 ? 'Review' : 'Reviews'})`
                      : '0.0 (0 Reviews)'}
                  </span>
                </div>
              </div>


              <h2 className="font-serif text-3xl font-bold text-silk">
                {quickViewProduct.name}
              </h2>

              <p className="font-serif italic text-sm text-gold">
                "{quickViewProduct.tagline}"
              </p>

              <div className="font-serif text-3xl font-bold text-gold">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </div>

              <p className="text-xs text-silk/70 leading-relaxed font-sans border-t border-b border-gold/10 py-4">
                {quickViewProduct.description}
              </p>

              {/* Sizes Selection */}
              {quickViewProduct.sizes && (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-silk/60">
                    Select Size:
                  </label>
                  <div className="flex space-x-2">
                    {quickViewProduct.sizes.map((sz) => {
                      const isOutOfStock = quickViewProduct.outOfStockSizes?.includes(sz);
                      return (
                        <button
                          key={sz}
                          disabled={isOutOfStock}
                          onClick={() => {
                            if (!isOutOfStock) setSelectedSize(sz);
                          }}
                          className={`relative flex flex-col items-center justify-center px-2 py-1 min-w-[3rem] border transition-all ${
                            isOutOfStock
                              ? 'border-white/5 text-silk/20 cursor-not-allowed opacity-50 bg-transparent'
                              : selectedSize === sz
                                ? 'border-gold bg-gold text-noir cursor-pointer'
                                : 'border-white/15 text-silk hover:border-gold/50 cursor-pointer bg-transparent'
                          }`}
                        >
                          <span className="text-sm font-bold">{sz}</span>
                          <span className={`text-[8px] uppercase tracking-wider font-bold mt-1 ${isOutOfStock ? 'text-red-700' : selectedSize === sz ? 'text-green-900' : 'text-green-700'}`}>
                            {isOutOfStock ? 'Stock Out' : 'Available'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-silk/60">
                  Select Quantity:
                </label>
                <div className="inline-flex items-center space-x-3 bg-noir-950 border border-gold/30 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-silk/70 hover:text-gold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-serif text-lg font-bold text-gold px-4">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-silk/70 hover:text-gold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 uppercase tracking-[0.2em] font-semibold text-xs transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : !selectedSize 
                      ? 'bg-noir-800 text-silk/50 cursor-not-allowed opacity-50' 
                      : 'bg-gold-gradient text-noir font-bold hover:shadow-gold-lg gold-shimmer-btn'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{!selectedSize ? 'Select Size' : `Add to Bag — ₹${(quickViewProduct.price * quantity).toLocaleString('en-IN')}`}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] uppercase tracking-widest text-silk/40">
                <ShieldCheck className="w-3.5 h-3.5 text-gold/60" />
                <span>Bespoke Artisanal Guarantee & Free Global Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

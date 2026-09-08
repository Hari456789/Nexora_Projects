import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Star, ShoppingBag, Plus, Minus, Check, ShieldCheck, ArrowLeft } from 'lucide-react';
import { ProductReviews } from '../components/ProductReviews';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getProductRating } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id);
  const ratingInfo = product ? getProductRating(product.id) : { rating: '0.0', reviewCount: 0, hasReviews: false };

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product && product.sizes) {
      setSelectedSize(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-silk">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-noir transition-colors uppercase tracking-widest text-xs font-semibold"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center space-x-2 text-silk/60 hover:text-gold transition-colors text-xs uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="bg-noir-900 border border-gold/20 shadow-2xl overflow-hidden animate-fade-in flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Product Image */}
          <div className="relative flex flex-col h-full bg-noir-950 p-4 sm:p-8 border-r border-b lg:border-b-0 border-gold/10">
            <div className="relative aspect-[3/4] md:h-[600px] bg-noir-950 flex-1 w-full overflow-hidden border border-gold/10">
              <img
                src={product.images ? product.images[activeImageIndex] : product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 transition-all duration-500 hover:scale-110 cursor-crosshair"
              />
              {product.badge && (
                <div className="absolute top-6 left-6 bg-noir-950/80 backdrop-blur-md border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-medium text-gold z-10 shadow-lg shadow-gold/20">
                  {product.badge}
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gold/20 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-24 shrink-0 border transition-all duration-300 ${
                      activeImageIndex === idx ? 'border-gold scale-105 shadow-gold-md z-10' : 'border-gold/20 opacity-60 hover:opacity-100 hover:border-gold/50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Ordering */}
          <div className="p-6 lg:p-8 flex flex-col space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gold/20">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-gold/80">
                <span className="bg-gold/10 px-3 py-1 border border-gold/20 rounded-full">{product.category}</span>
                <span className="bg-gold/10 px-3 py-1 border border-gold/20 rounded-full">Code: {product.id}</span>
                <div className="flex items-center space-x-1 text-gold bg-noir-950 px-3 py-1 border border-gold/20 rounded-full shadow-gold-sm">
                  <Star className={`w-3.5 h-3.5 ${ratingInfo.hasReviews ? 'fill-gold text-gold' : 'text-gold/40'}`} />
                  <span>
                    {ratingInfo.hasReviews
                      ? `${ratingInfo.rating} (${ratingInfo.reviewCount} ${ratingInfo.reviewCount === 1 ? 'Review' : 'Reviews'})`
                      : '0.0 (0 Reviews)'}
                  </span>
                </div>
              </div>


              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk leading-tight">
                  {product.name}
                </h2>
                <p className="font-serif italic text-lg text-gold mt-2">
                  "{product.tagline}"
                </p>
              </div>

              <div className="flex items-baseline space-x-4">
                <span className="font-serif text-3xl font-bold text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-silk/40 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-sm text-silk/70 leading-relaxed font-sans border-t border-b border-gold/10 py-4">
                {product.description}
              </p>

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-[0.2em] text-silk/60 font-semibold">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((sz) => {
                      const isOutOfStock = product.outOfStockSizes?.includes(sz);
                      return (
                        <button
                          key={sz}
                          disabled={isOutOfStock}
                          onClick={() => {
                            if (!isOutOfStock) setSelectedSize(sz);
                          }}
                          className={`relative flex flex-col items-center justify-center px-2 py-1.5 min-w-[3.5rem] border transition-all duration-300 ${
                            isOutOfStock
                              ? 'border-white/5 text-silk/20 cursor-not-allowed opacity-50 bg-transparent'
                              : selectedSize === sz
                                ? 'border-gold bg-gold text-noir shadow-gold-md scale-105 cursor-pointer'
                                : 'border-white/15 text-silk hover:border-gold/50 hover:bg-gold/5 cursor-pointer bg-transparent'
                          }`}
                        >
                          <span className="text-base font-bold">{sz}</span>
                          <span className={`text-[9px] uppercase tracking-wider font-bold mt-1 ${isOutOfStock ? 'text-red-700' : selectedSize === sz ? 'text-green-900' : 'text-green-700'}`}>
                            {isOutOfStock ? 'Stock Out' : 'Available'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.2em] text-silk/60 font-semibold">
                  Quantity
                </label>
                <div className="inline-flex items-center space-x-4 bg-noir-950 border border-gold/30 p-1.5 shadow-inner">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-silk/70 hover:text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-serif text-xl font-bold text-gold px-6 w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-silk/70 hover:text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section inside the right column */}
            <div className="pt-4 mt-6 border-t border-gold/10">
              <ProductReviews productId={product.id} />
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-gold/10">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 uppercase tracking-[0.2em] font-semibold text-xs transition-all duration-300 flex items-center justify-center space-x-3 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : !selectedSize
                      ? 'bg-noir-800 text-silk/50 cursor-not-allowed opacity-50'
                      : 'bg-gold-gradient text-noir font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{!selectedSize ? 'Select Size' : `Add to Bag — ₹${(product.price * quantity).toLocaleString('en-IN')}`}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-silk/40 mt-4">
                <ShieldCheck className="w-4 h-4 text-gold/60" />
                <span>Bespoke Artisanal Guarantee & Free Global Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

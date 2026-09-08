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

      <div className="animate-fade-in flex flex-col items-center">
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
          {/* Left Column: Product Image */}
          <div className="relative flex flex-col w-full">
            <div className="relative aspect-[3/4] bg-noir-950 w-full overflow-hidden border border-gold/20 shadow-2xl">
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
          <div className="flex flex-col space-y-5 w-full text-center items-center">
            <div className="space-y-3 w-full">
              <div className="flex items-center justify-center flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-gold/80">
                <span className="bg-gold/10 px-2.5 py-0.5 border border-gold/20 rounded-full">{product.category}</span>
                <span className="bg-gold/10 px-2.5 py-0.5 border border-gold/20 rounded-full">Code: {product.id}</span>
                <div className="flex items-center space-x-1 text-gold bg-noir-950 px-2.5 py-0.5 border border-gold/20 rounded-full shadow-gold-sm">
                  <Star className={`w-3 h-3 ${ratingInfo.hasReviews ? 'fill-gold text-gold' : 'text-gold/40'}`} />
                  <span>
                    {ratingInfo.hasReviews
                      ? `${ratingInfo.rating} (${ratingInfo.reviewCount})`
                      : '0.0 (0)'}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-silk leading-tight">
                  {product.name}
                </h2>
                <p className="font-serif italic text-xs text-gold mt-1.5">
                  "{product.tagline}"
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <span className="font-serif text-xl font-bold text-gold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-silk/40 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-[13px] text-silk/60 leading-relaxed font-sans border-t border-b border-gold/10 py-3 mt-2">
                {product.description}
              </p>

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3 pt-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-silk/60 font-semibold block">
                    Select Size
                  </label>
                  <div className="flex flex-wrap justify-center gap-2">
                    {product.sizes.map((sz) => {
                      const isOutOfStock = product.outOfStockSizes?.includes(sz);
                      return (
                        <button
                          key={sz}
                          disabled={isOutOfStock}
                          onClick={() => {
                            if (!isOutOfStock) setSelectedSize(sz);
                          }}
                          className={`relative flex flex-col items-center justify-center px-1.5 py-1 min-w-[3rem] border transition-all duration-300 ${
                            isOutOfStock
                              ? 'border-white/5 text-silk/20 cursor-not-allowed opacity-50 bg-transparent'
                              : selectedSize === sz
                                ? 'border-gold bg-gold text-noir shadow-gold-sm scale-105 cursor-pointer'
                                : 'border-white/15 text-silk hover:border-gold/50 hover:bg-gold/5 cursor-pointer bg-transparent'
                          }`}
                        >
                          <span className="text-sm font-bold">{sz}</span>
                          <span className={`text-[8px] uppercase tracking-wider font-bold mt-0.5 ${isOutOfStock ? 'text-red-700' : selectedSize === sz ? 'text-green-900' : 'text-green-700'}`}>
                            {isOutOfStock ? 'Out' : 'Avail'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-silk/60 font-semibold block">
                  Quantity
                </label>
                <div className="inline-flex items-center space-x-3 bg-noir-950 border border-gold/30 p-1 shadow-inner">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-silk/70 hover:text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-serif text-lg font-bold text-gold px-4 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 text-silk/70 hover:text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions & Reviews Side-by-Side */}
            <div className="flex flex-row items-start gap-4 w-full pt-4 border-t border-gold/10 mt-4 text-left">
              {/* Left Side: Actions */}
              <div className="w-1/2 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`w-full py-3 px-2 uppercase tracking-[0.1em] font-semibold text-[10px] transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : !selectedSize
                        ? 'bg-noir-800 text-silk/50 cursor-not-allowed opacity-50'
                        : 'bg-gold-gradient text-noir font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{!selectedSize ? 'Select Size' : `Add — ₹${(product.price * quantity).toLocaleString('en-IN')}`}</span>
                    </>
                  )}
                </button>

                <div className="flex flex-col items-center justify-center text-center space-y-1 text-[8px] uppercase tracking-widest text-silk/40 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold/60" />
                  <span>Bespoke Guarantee<br/>Free Returns</span>
                </div>
              </div>

              {/* Right Side: Reviews Section */}
              <div className="w-1/2">
                <ProductReviews productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

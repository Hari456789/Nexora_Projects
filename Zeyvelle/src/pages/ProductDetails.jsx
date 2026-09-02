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
      setSelectedSize(product.sizes[0]);
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
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center space-x-2 text-silk/60 hover:text-gold transition-colors text-xs uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="bg-noir-900 border border-gold/20 shadow-2xl overflow-hidden animate-fade-in grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Product Image */}
        <div className="relative flex flex-col h-full bg-noir-950 p-4 sm:p-8 border-r border-gold/10">
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
                  className={`relative w-24 h-32 shrink-0 border transition-all duration-300 ${
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
        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-gold/80">
              <span className="bg-gold/10 px-3 py-1 border border-gold/20 rounded-full">{product.category}</span>
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
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-silk leading-tight">
                {product.name}
              </h2>
              <p className="font-serif italic text-lg text-gold mt-2">
                "{product.tagline}"
              </p>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="font-serif text-4xl font-bold text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-silk/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-sm text-silk/70 leading-loose font-sans border-t border-b border-gold/10 py-6">
              {product.description}
            </p>

            {/* Sizes Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.2em] text-silk/60 font-semibold">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-12 h-12 text-sm font-semibold border transition-all duration-300 ${
                        selectedSize === sz
                          ? 'border-gold bg-gold text-noir shadow-gold-md scale-105'
                          : 'border-white/15 text-silk hover:border-gold/50 hover:bg-gold/5'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
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
                  className="p-3 text-silk/70 hover:text-gold hover:bg-gold/10 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-serif text-xl font-bold text-gold px-6 w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-silk/70 hover:text-gold hover:bg-gold/10 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-6 border-t border-gold/10">
            <button
              onClick={handleAddToCart}
              className={`w-full py-5 uppercase tracking-[0.2em] font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-3 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
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
                  <span>Add to Bag — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
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

      {/* Reviews Section */}
      <ProductReviews productId={product.id} />
    </div>
  );
};

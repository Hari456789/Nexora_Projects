import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity, setQuickViewProduct } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');

  // Find if this product (with selected size) is already in the cart
  const cartItem = cartItems.find(
    (item) => item.product.id === product.id && item.selectedSize === selectedSize
  );
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleInitialAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedSize);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, 1, selectedSize);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, -1, selectedSize);
  };

  return (
    <div className="group relative bg-noir-900 border border-gold/20 hover:border-gold rounded-none overflow-hidden transition-all duration-500 hover:shadow-gold-lg flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-noir-950 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-noir-950/80 backdrop-blur-md border border-gold/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-gold">
            {product.badge}
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-noir-950/80 backdrop-blur-md border border-gold/30 text-silk hover:text-gold hover:border-gold transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Bottom Tint Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-noir-900 via-noir-900/40 to-transparent pointer-events-none" />
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-gold/70 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center space-x-1 text-gold">
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-lg font-bold text-silk group-hover:text-gold transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-[12px] text-silk/50 font-light mt-1 line-clamp-1">
            {product.tagline}
          </p>

          {/* Price Tag */}
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="font-serif text-xl font-bold text-gold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-silk/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Size Selector Pill Bar */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3 flex items-center space-x-1.5">
              <span className="text-[10px] uppercase text-silk/40 tracking-widest mr-1">Size:</span>
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] font-semibold w-6 h-6 rounded-none flex items-center justify-center border transition-colors ${
                    selectedSize === size
                      ? 'border-gold bg-gold text-noir'
                      : 'border-white/10 text-silk/60 hover:border-gold/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add to Cart / Active Quantity Stepper */}
        <div className="pt-2 border-t border-gold/10">
          {currentQuantity > 0 ? (
            /* Quantity Stepper (Shown ONLY after clicking Add to Cart / when item is in cart) */
            <div className="w-full h-11 border border-gold bg-gold/10 flex items-center justify-between px-2 transition-all duration-300">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center border border-gold/40 bg-noir-950 text-gold hover:bg-gold hover:text-noir transition-colors"
                title="Decrease quantity"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center space-x-1.5 font-serif text-xs font-bold text-gold uppercase tracking-widest select-none">
                <span className="text-sm font-bold text-gold">{currentQuantity}</span>
                <span className="text-[10px] text-silk/70 font-sans font-medium">in Bag</span>
              </div>

              <button
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center border border-gold/40 bg-noir-950 text-gold hover:bg-gold hover:text-noir transition-colors"
                title="Increase quantity"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Initial Add to Cart Button */
            <button
              onClick={handleInitialAdd}
              className="w-full h-11 border border-gold text-gold hover:bg-gold hover:text-noir gold-shimmer-btn flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

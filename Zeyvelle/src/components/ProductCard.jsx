import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={goToDetails}
      className="group relative bg-noir-900 border border-gold/20 hover:border-gold rounded-none overflow-hidden transition-all duration-500 hover:shadow-gold-lg flex flex-col cursor-pointer h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-noir-950">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-all duration-700 ease-out ${product.images && product.images.length > 1 ? 'group-hover:opacity-0' : ''}`}
        />
        {product.images && product.images.length > 1 && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 contrast-105 scale-110 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
          />
        )}

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-noir-950/80 backdrop-blur-md border border-gold/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-gold">
            {product.badge}
          </div>
        )}

        {/* Bottom Tint Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-noir-900 via-noir-900/40 to-transparent pointer-events-none" />
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-center items-center text-center space-y-2 bg-noir-900">
        <h3 className="font-serif text-lg font-bold text-silk group-hover:text-gold transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Product Description */}
        {product.description && (
          <p className="text-[11px] text-silk/50 line-clamp-2 px-1 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Price Tag */}
        <div className="flex items-center space-x-2 flex-wrap justify-center mt-1">
          <span className="font-serif text-xl font-bold text-gold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {(() => {
            const hasRealDiscount = !!product.originalPrice;
            const discountPercentages = [85, 87, 90, 86, 88, 89];
            const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const discount = hasRealDiscount 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : discountPercentages[hash % discountPercentages.length];
            const originalPrice = hasRealDiscount 
              ? product.originalPrice 
              : Math.round(product.price / (1 - (discount / 100)));
            
            return (
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-silk/40 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded-sm flex items-center">
                  {discount}% <span className="ml-0.5 text-[8px]">▼</span>
                </span>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

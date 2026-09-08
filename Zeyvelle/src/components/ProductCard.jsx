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

        {/* Price Tag */}
        <div className="flex items-baseline space-x-2">
          <span className="font-serif text-xl font-bold text-gold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-silk/40 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

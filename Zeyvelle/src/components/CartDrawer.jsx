import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItemsCount,
  } = useCart();

  if (!isCartOpen) return null;

  // Generate WhatsApp Mesgold with product details and image links for store owner
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsText = cartItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}*\n   • Size: ${item.selectedSize}\n   • Quantity: ${item.quantity}\n   • Item Price: ₹${item.product.price.toLocaleString('en-IN')} (Subtotal: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')})\n   • Image Link: ${item.product.image}`
      )
      .join('\n\n');

    const mesgold = `*✨ NEW ZEYVELLE HAUTE COUTURE ORDER ✨*\n\nHello Zeyvelle Atelier! I would like to place an order:\n\n${itemsText}\n\n------------------------------------\n*ORDER SUBTOTAL:* ₹${subtotal.toLocaleString('en-IN')}\n*COMPLIMENTARY SHIPPING:* Applied\n------------------------------------\n\nPlease confirm availability and payment instructions. Thank you!`;

    const whatsappUrl = `https://wa.me/918921206533?text=${encodeURIComponent(mesgold)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-noir-950/80 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-noir-950 border-l border-gold/30 shadow-2xl flex flex-col justify-between transform transition-transform duration-500 ease-in-out animate-slide-left">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gold/20 flex items-center justify-between bg-noir-900">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full border border-gold/40 bg-gold/10">
                <ShoppingBag className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold tracking-wider text-silk">
                  YOUR SHOPPING BAG
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-gold/70">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Creation' : 'Creations'} Selected
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-silk/60 hover:text-gold hover:bg-gold/10 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-gold/10">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="pt-6 first:pt-0 flex space-x-4 items-start group"
                >
                  {/* Item Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover border border-gold/20 flex-shrink-0 bg-noir-900"
                  />

                  {/* Item Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-base font-bold text-silk group-hover:text-gold transition-colors line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-silk/40 hover:text-red-400 p-1 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gold/80 font-medium">
                      Category: {item.product.category}
                    </p>

                    <div className="text-[11px] text-silk/50 flex space-x-3">
                      <span>Size: <strong className="text-silk">{item.selectedSize}</strong></span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      {/* Quantity Stepper (Increase/Decrease from Cart) */}
                      <div className="flex items-center space-x-1 border border-gold/30 bg-noir-900 px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-silk/70 hover:text-gold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-serif text-sm font-bold text-gold px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-silk/70 hover:text-gold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="font-serif text-base font-bold text-gold">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mx-auto text-gold">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif text-xl text-silk font-medium">Your shopping bag is empty.</p>
                <p className="text-xs text-silk/50 max-w-xs mx-auto">
                  Explore our haute couture collections and add your favorite creations.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-noir transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer / Subtotal & WhatsApp Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-noir-900 border-t border-gold/20 space-y-4">
              {/* Shipping Perks */}
              <div className="flex items-center space-x-2 text-[11px] text-gold/80 bg-gold/5 border border-gold/20 p-2.5">
                <Truck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Complimentary Express Shipping Applied</span>
              </div>

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-silk/60">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm font-bold text-silk">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-silk/60">
                  <span>Bespoke Packaging & Insured Shipping</span>
                  <span className="text-gold uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="w-full h-[1px] bg-gold/15 my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span className="font-serif text-silk">Total</span>
                  <span className="font-serif text-2xl text-gold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center space-x-2 rounded-none"
              >
                <Send className="w-4 h-4" />
                <span>Checkout via WhatsApp (+91 8921206533)</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-silk/40 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold/60" />
                <span>Direct Concierge Order with Image Preview</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

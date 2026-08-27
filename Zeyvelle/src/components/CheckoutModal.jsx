import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle, ShieldCheck, CreditCard, Lock, Sparkles } from 'lucide-react';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping & Payment, 2: Confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'India',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '988',
  });

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setStep(2);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-noir-950/90 backdrop-blur-md animate-fade-in"
      />

      <div className="relative bg-noir-900 border border-gold/40 w-full max-w-2xl shadow-2xl p-6 sm:p-8 z-10 animate-slide-up my-auto">
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 text-silk/60 hover:text-gold"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 1 ? (
          <div>
            <div className="text-center mb-6 space-y-2">
              <div className="inline-flex items-center space-x-2 text-gold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Secure Checkout</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-silk">
                Maison Zeyvelle Concierge
              </h2>
              <p className="text-xs text-silk/60">
                Complete your bespoke order below
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Lady Eleanor Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@luxury.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Shipping Address</label>
                <input
                  type="text"
                  required
                  placeholder="740 Park Avenue, Penthouse B"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gold/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-gold">
                  <span className="uppercase tracking-widest font-semibold flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Encrypted Payment Card
                  </span>
                  <Lock className="w-3.5 h-3.5 text-gold/60" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.expDate}
                      onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                      className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gold/20 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase text-silk/50">Total Amount Due</p>
                  <p className="font-serif text-2xl font-bold text-gold">₹{subtotal.toLocaleString('en-IN')}</p>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gold-gradient text-noir font-bold text-xs uppercase tracking-[0.2em] hover:shadow-gold-lg transition-all gold-shimmer-btn"
                >
                  Place Order Now
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Step */
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center mx-auto text-gold animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-4xl font-bold text-silk">Order Confirmed</h2>
              <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                Order Reference #ZYV-98421
              </p>
            </div>

            <p className="text-xs text-silk/70 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-silk">{formData.fullName || 'Valued Client'}</strong>. Your bespoke garments are being hand-packaged in our signature black and gold gift box with insured concierge delivery.
            </p>

            <div className="p-4 bg-noir-950 border border-gold/20 max-w-sm mx-auto text-xs text-silk/60 space-y-1">
              <p>Confirmation sent to: <span className="text-gold">{formData.email || 'concierge@zeyvelle.com'}</span></p>
              <p>Estimated Express Delivery: <span className="text-silk font-semibold">2-3 Business Days</span></p>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="px-10 py-3 bg-gold-gradient text-noir text-xs font-bold uppercase tracking-[0.25em] transition-all gold-shimmer-btn"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

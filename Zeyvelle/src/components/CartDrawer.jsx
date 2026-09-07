import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { getLocationFromPincode, getDeliveryCharge } from '../utils/deliveryTariffs';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItemsCount,
    totalWeight,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    area: ''
  });

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isAreaEditable, setIsAreaEditable] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      const pin = customerDetails.pincode.replace(/\D/g, '');
      if (pin.length === 6) {
        setIsLoadingLocation(true);
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
          const data = await res.json();
          if (data && data[0] && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            const newArea = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`;
            setCustomerDetails(prev => ({ ...prev, area: newArea }));
            setIsAreaEditable(false);
          } else {
            setIsAreaEditable(true);
            setCustomerDetails(prev => ({ ...prev, area: '' }));
          }
        } catch (err) {
          setIsAreaEditable(true);
        } finally {
          setIsLoadingLocation(false);
        }
      } else {
         setIsAreaEditable(true);
      }
    };
    
    fetchLocation();
  }, [customerDetails.pincode]);

  const locationType = getLocationFromPincode(customerDetails.pincode);
  const deliveryCharge = getDeliveryCharge(totalWeight, locationType);
  const totalAmount = subtotal + deliveryCharge;

  if (!isCartOpen) return null;

  // Generate WhatsApp Mesgold with product details and image links for store owner
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    if (!isCheckingOut) {
      setIsCheckingOut(true);
      return;
    }

    if (!customerDetails.name || !customerDetails.phone || !customerDetails.email || !customerDetails.address) {
      alert("Please fill in all compulsory fields (Name, Phone Number, Email, and Address) to proceed.");
      return;
    }

    const digitsOnly = customerDetails.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!customerDetails.email.toLowerCase().includes('@gmail.com')) {
      alert("Email address must contain @gmail.com to proceed.");
      return;
    }

    let itemsText = cartItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}*\n   • Size: ${item.selectedSize}\n   • Quantity: ${item.quantity}\n   • Item Price: ₹${item.product.price.toLocaleString('en-IN')} (Subtotal: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')})\n   • Product Link: ${encodeURI(window.location.origin + '/product/' + item.product.id)}`
      )
      .join('\n\n');

    const locationLabel = locationType === 'local' ? 'Local Area' : locationType === 'within_state' ? 'Within State' : locationType === 'other_states' ? 'Outside State' : 'International';
    const customerInfo = `*Customer Details:*\nName: ${customerDetails.name}\nPhone: ${customerDetails.phone}\nEmail: ${customerDetails.email || 'N/A'}\nAddress: ${customerDetails.address}\nPincode: ${customerDetails.pincode}\nArea: ${customerDetails.area}\nDelivery Zone: ${locationLabel}\n\n`;

    const mesgold = `*✨ ZEYVELLE CLOTHING ✨*\n\nHello Zeyvelle Atelier! I would like to place an order:\n\n${customerInfo}*Order Items:*\n${itemsText}\n\n------------------------------------\n*ORDER SUBTOTAL:* ₹${subtotal.toLocaleString('en-IN')}\n*DELIVERY CHARGE:* ₹${deliveryCharge.toLocaleString('en-IN')}\n*TOTAL AMOUNT:* ₹${totalAmount.toLocaleString('en-IN')}\n------------------------------------\n\nPlease confirm availability and payment instructions. Thank you!`;

    const whatsappUrl = `https://wa.me/918921206533?text=${encodeURIComponent(mesgold)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleClose = () => {
    setIsCheckingOut(false);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-noir-950/80 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-noir-950 border-l border-gold/30 shadow-2xl flex flex-col justify-between transform transition-transform duration-500 ease-in-out animate-slide-left">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gold/20 flex items-center justify-between bg-noir-900">
            <div className="flex items-center space-x-3">
              {isCheckingOut ? (
                <button 
                  onClick={() => setIsCheckingOut(false)}
                  className="p-2 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <div className="p-2 rounded-full border border-gold/40 bg-gold/10">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                </div>
              )}
              <div>
                <h2 className="font-serif text-xl font-bold tracking-wider text-silk">
                  {isCheckingOut ? 'CUSTOMER DETAILS' : 'YOUR SHOPPING BAG'}
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-gold/70">
                  {isCheckingOut ? 'Secure Checkout' : `${totalItemsCount} ${totalItemsCount === 1 ? 'Creation' : 'Creations'} Selected`}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 text-silk/60 hover:text-gold hover:bg-gold/10 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${!isCheckingOut && 'divide-y divide-gold/10'}`}>
            {isCheckingOut ? (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-silk/70 mb-4">Please provide your details for delivery. We will prepare your bespoke order and confirm via WhatsApp.</p>
                
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold mt-1 transition-colors"
                    placeholder="E.g. Jane Doe"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold mt-1 transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold mt-1 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Complete Home Address *</label>
                  <textarea
                    required
                    rows="4"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold mt-1 resize-none transition-colors"
                    placeholder="House No, Street, City, Pincode"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Pincode / Zipcode *</label>
                  <input
                    type="text"
                    required
                    value={customerDetails.pincode}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value })}
                    className="w-full bg-noir-950 border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold mt-1 transition-colors appearance-none"
                    placeholder="E.g. 686001"
                  />
                  {customerDetails.pincode.length >= 6 && !isLoadingLocation && (
                     <p className="text-[10px] text-emerald-400/80 mt-1 uppercase tracking-widest">
                       Delivery Zone: {locationType.replace('_', ' ')}
                     </p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold font-medium">Area / Location *</label>
                  <input
                    type="text"
                    required
                    disabled={!isAreaEditable && !isLoadingLocation}
                    value={isLoadingLocation ? 'Detecting location...' : customerDetails.area}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, area: e.target.value })}
                    className={`w-full border border-gold/30 text-silk text-xs py-2.5 px-3 focus:outline-none focus:border-gold mt-1 transition-colors ${!isAreaEditable && !isLoadingLocation ? 'opacity-70 bg-noir-900 cursor-not-allowed' : 'bg-noir-950'}`}
                    placeholder="Enter City, State, Country"
                  />
                </div>
              </div>
            ) : cartItems.length > 0 ? (
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
                  onClick={handleClose}
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
                <span>Delivery Charge Applied: ₹{deliveryCharge.toLocaleString('en-IN')}</span>
              </div>

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-silk/60">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm font-bold text-silk">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-silk/60">
                  <span>Bespoke Packaging & Insured Shipping</span>
                  <span className="font-serif text-sm font-bold text-silk">₹{deliveryCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-[1px] bg-gold/15 my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span className="font-serif text-silk">Total</span>
                  <span className="font-serif text-2xl text-gold">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center space-x-2 rounded-none"
              >
                <Send className="w-4 h-4" />
                <span>{isCheckingOut ? 'Send Order via WhatsApp' : 'Proceed to Checkout'}</span>
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

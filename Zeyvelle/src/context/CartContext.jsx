import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('zeyvelle_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMesgold, setToastMesgold] = useState(null);

  // Live product reviews state initialized from localStorage
  const [reviewsData, setReviewsData] = useState(() => {
    try {
      const loaded = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('reviews_')) {
          const productId = key.replace('reviews_', '');
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            // Remove all legacy default mock reviews (e.g. Anonymous Shopper)
            const cleaned = Array.isArray(parsed)
              ? parsed.filter((r) => r.name !== 'Anonymous Shopper')
              : [];
            if (cleaned.length > 0) {
              loaded[productId] = cleaned;
            }
          }
        }
      }
      return loaded;
    } catch (e) {
      console.error('Could not load reviews from localStorage', e);
      return {};
    }
  });

  const getReviews = (productId) => {
    return reviewsData[productId] || [];
  };

  const getProductRating = (productId) => {
    const reviews = getReviews(productId);
    if (!reviews || reviews.length === 0) {
      return { rating: '0.0', reviewCount: 0, hasReviews: false };
    }
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    const avg = (sum / reviews.length).toFixed(1);
    return { rating: avg, reviewCount: reviews.length, hasReviews: true };
  };

  const addReview = (productId, { name, text, rating }) => {
    const newReview = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      rating: Number(rating) || 5,
      date: new Date().toLocaleDateString(),
    };

    setReviewsData((prev) => {
      const currentReviews = prev[productId] || [];
      const updated = [newReview, ...currentReviews];
      try {
        localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Could not save review to localStorage', e);
      }
      return {
        ...prev,
        [productId]: updated,
      };
    });

    showToast(`Thank you! Your review for product has been posted.`);
  };

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zeyvelle_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMesgold(msg);
    setTimeout(() => {
      setToastMesgold((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const addToCart = (product, quantity = 1, size = 'M', color = '') => {
    const qty = Math.max(1, Number(quantity) || 1);
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            product,
            quantity: qty,
            selectedSize: size || product.sizes?.[0] || 'Standard',
            selectedColor: color || product.colors?.[0] || 'Default',
          },
        ];
      }
    });

    showToast(`Added ${qty} × "${product.name}" to cart`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta, size = null) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          const isMatch = size
            ? item.product.id === productId && item.selectedSize === size
            : item.product.id === productId;
          if (isMatch) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        totalItemsCount,
        subtotal,
        quickViewProduct,
        setQuickViewProduct,
        activeCategory,
        setActiveCategory,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toastMesgold,
        showToast,
        reviewsData,
        getReviews,
        getProductRating,
        addReview,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useReviews = useCart;


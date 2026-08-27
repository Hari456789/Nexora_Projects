import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductsSection } from './components/ProductsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Sparkles } from 'lucide-react';

const ToastNotification = () => {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-noir-900 border border-gold text-silk px-5 py-3 shadow-gold-lg flex items-center space-x-3 animate-slide-up">
      <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
      <span className="text-xs uppercase tracking-wider font-medium">{toastMessage}</span>
    </div>
  );
};

function MainLayout() {
  return (
    <div className="min-h-screen bg-noir text-silk relative font-sans selection:bg-gold selection:text-noir">
      <Navbar />
      <main>
        <Hero />
        <CategorySection />
        <ProductsSection />
      </main>
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}

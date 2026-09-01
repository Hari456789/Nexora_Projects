import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { totalItemsCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Collections', href: '/#categories' },
    { name: 'Shop', href: '/#shop' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-noir-950/95 backdrop-blur-md border-b border-gold/20 py-2.5 shadow-gold-sm'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Official Brand Logo Image */}
        <a href="/#home" className="flex items-center space-x-3 group cursor-pointer">
          <div className="bg-noir-950/80 border border-gold/40 p-1.5 rounded-lg group-hover:border-gold transition-colors">
            <img
              src="/logo.png"
              alt="Zeyvelle Clothing Logo"
              className="h-9 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
            />
          </div>
          <span className="font-serif text-xl tracking-[0.2em] text-silk font-bold group-hover:text-gold transition-colors hidden sm:inline-block">
            ZEYVELLE
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-silk/80 hover:text-gold transition-all duration-300 relative py-1 font-medium group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-gradient transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Cart Icon & Action Buttons */}
        <div className="flex items-center space-x-5">
          <a
            href="/#shop"
            className="text-silk/70 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-gold/10 hidden sm:block cursor-pointer"
            title="Search Catalog"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center p-2 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-300 text-silk group"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-silk group-hover:text-gold transition-colors" />
            
            {/* gold Badge */}
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold-gradient text-noir font-bold text-[11px] flex items-center justify-center shadow-gold-sm animate-pulse-glow">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-silk hover:text-gold p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-noir-950/95 border-b border-gold/20 backdrop-blur-xl px-6 py-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-silk/90 hover:text-gold py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <Sparkles className="w-3.5 h-3.5 text-gold/40" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

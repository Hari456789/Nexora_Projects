import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer id="contact" className="bg-noir-950 text-silk pt-20 pb-8 border-t border-gold/30 relative overflow-hidden">
      {/* Hairline gold Glow Top Accent */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gold-gradient shadow-gold-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pb-16 border-b border-gold/15">
          
          {/* Column 1: Official Brand Logo & Blurb */}
          <div className="space-y-4">
            <a href="#home" className="inline-block group">
              <div className="bg-noir-900 border border-gold/30 p-2 rounded-xl inline-block group-hover:border-gold transition-colors">
                <img
                  src="/logo.png"
                  alt="Zeyvelle Clothing Official Logo"
                  className="h-16 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                />
              </div>
            </a>

            <p className="text-xs text-silk/60 font-sans leading-relaxed">
              Redefining modern women's couture with timeless elegance, sculpted tailoring, and opulent natural fabrics. Where Elegance Blossoms.
            </p>

            {/* Social Icons in gold Outlines */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 hover:border-gold flex items-center justify-center text-silk/70 hover:text-gold hover:bg-gold/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/918921206533"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 hover:border-gold flex items-center justify-center text-silk/70 hover:text-gold hover:bg-gold/10 transition-all duration-300"
                aria-label="WhatsApp Order Line"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href="mailto:zeyvelleclothing@gmail.com"
                className="w-9 h-9 rounded-full border border-gold/40 hover:border-gold flex items-center justify-center text-silk/70 hover:text-gold hover:bg-gold/10 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold tracking-wider">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs uppercase tracking-widest text-silk/70 font-medium">
              <li>
                <a href="#home" className="hover:text-gold transition-colors flex items-center space-x-2">
                  <span className="text-gold/40">•</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-gold transition-colors flex items-center space-x-2">
                  <span className="text-gold/40">•</span>
                  <span>Collections</span>
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-gold transition-colors flex items-center space-x-2">
                  <span className="text-gold/40">•</span>
                  <span>Shop Catalog</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold transition-colors flex items-center space-x-2">
                  <span className="text-gold/40">•</span>
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold tracking-wider">
              Concierge Contact
            </h3>
            <div className="space-y-3 text-xs text-silk/75 font-sans">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase text-silk/40 tracking-wider">General & Styling Enquiries</p>
                  <a href="mailto:zeyvelleclothing@gmail.com" className="hover:text-gold transition-colors font-medium">
                    zeyvelleclothing@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase text-silk/40 tracking-wider">Contact Number</p>
                  <a href="tel:+918136954887" className="hover:text-gold transition-colors font-medium">
                    +91 81369 54887
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Send className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase text-silk/40 tracking-wider">WhatsApp Checkout</p>
                  <a href="https://wa.me/918921206533" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors font-medium text-emerald-400">
                    +91 89212 06533
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-silk/40 space-y-4 sm:space-y-0">
          <p>© 2026 ZEYVELLE Clothing. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px] uppercase tracking-wider">
            <a href="#home" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#home" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

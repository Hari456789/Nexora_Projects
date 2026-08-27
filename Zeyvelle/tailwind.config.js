/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          dark: '#C9A227',
          bronze: '#AA771C',
          glow: 'rgba(212, 175, 55, 0.25)',
        },
        noir: {
          950: '#050505',
          DEFAULT: '#0A0A0A',
          900: '#121212',
          800: '#1A1A1A',
          700: '#262626',
          600: '#333333',
        },
        silk: '#F5F5F0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA771C 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)',
        'hero-vignette': 'linear-gradient(90deg, #0A0A0A 0%, rgba(10, 10, 10, 0.8) 20%, transparent 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 30px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

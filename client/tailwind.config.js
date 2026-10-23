/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Strict 3 Primary Colors + Neutral System
        // Primary 1: Deep Forest Emerald (Luxury, Heritage, Nature, Editorial)
        primary: {
          50: '#F2F8F5',
          100: '#E2EFE9',
          200: '#C5DDD3',
          300: '#9BC2B3',
          400: '#5F9E87',
          500: '#2E7A60',
          600: '#0F382C', // Core Brand Deep Forest Emerald
          700: '#0B2E24',
          800: '#08241D',
          900: '#051A14',
          950: '#020D0A',
        },
        // Primary 2: Muted Champagne Gold (Restrained Luxury Accent)
        accent: {
          50: '#FBF9F2',
          100: '#F5F0E1',
          200: '#EADEBE',
          300: '#DCC997',
          400: '#C5A869', // Core Brand Muted Gold
          500: '#B3934B',
          600: '#9E8038',
          700: '#7E6329',
          800: '#5F491E',
          900: '#403013',
          950: '#261C0A',
        },
        // Primary 3: Terracotta / Earth Coral (Subtle Warm Highlight)
        earth: {
          50: '#FBF6F3',
          100: '#F6EAE3',
          200: '#ECD3C5',
          300: '#DEB59F',
          400: '#CA8B6D',
          500: '#B56847', // Warm Terracotta Earth
          600: '#974E32',
          700: '#7B3B24',
          800: '#602B19',
          900: '#481F12',
          950: '#2C1008',
        },
        // Neutral System: Warm Sand / Ivory Light Surface + Charcoal / Deep Forest Dark Surface
        sand: {
          50: '#FDFBF7',  // Primary Warm Ivory Surface
          100: '#F7F4EE', // Secondary Soft Sand
          200: '#EFECE6', // Subtle Border Light
          300: '#DDD8CE',
          400: '#B8B2A5',
          500: '#8E8779',
          600: '#6A6356',
          700: '#4B453A',
          800: '#2A261F',
          900: '#1A1813',
          950: '#0F0E0B',
        },
        darkSurface: {
          50: '#F3F5F4',
          100: '#E4E7E6',
          200: '#C5CCC9',
          300: '#9EABA7',
          400: '#5F736E',
          500: '#344943',
          600: '#22322E',
          700: '#1C2622',
          800: '#141C19', // Card / Raised Dark Surface
          900: '#0C1210', // Deep Charcoal Forest Dark Base
          950: '#060908',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.05em',
        'loose-luxury': '0.15em',
      },
      borderRadius: {
        'lg': '0.625rem',
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'editorial': '0 8px 30px rgba(15, 56, 44, 0.06)',
        'editorial-hover': '0 16px 40px rgba(15, 56, 44, 0.12)',
        'editorial-dark': '0 8px 30px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}

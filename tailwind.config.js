/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors from logo
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6', // Main teal from logo
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        // Gold accents (keeping some luxury elements)
        gold: {
          50: '#FFFEF7',
          100: '#FFFAEB',
          200: '#FFF2CC',
          300: '#FFE9A3',
          400: '#FFD766',
          500: '#D4AF37',
          600: '#B8941F',
          700: '#9C7B15',
          800: '#7A5F11',
          900: '#5C470D',
        },
        beige: {
          50: '#FEFCF8',
          100: '#F5E6D3',
          200: '#EDD5B7',
          300: '#E4C49B',
          400: '#DCB37F',
          500: '#D3A263',
          600: '#B8904F',
          700: '#9D7E3B',
          800: '#826C27',
          900: '#675A13',
        },
        dark: {
          50: '#1A1A1A',
          100: '#0F0F0F',
          200: '#0A0A0A',
          300: '#050505',
          400: '#000000',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
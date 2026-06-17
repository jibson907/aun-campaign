/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.75rem',
        lg: '2.25rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        /* Primary Brand Navy \u2014 #1A365D at 700 */
        aun: {
          50: '#EAF0F7',
          100: '#CBD8E8',
          200: '#9DB4CE',
          300: '#1A365D',
          400: '#1A365D',
          500: '#1A365D',
          600: '#1A365D',
          700: '#1A365D',
          800: '#1A365D',
          900: '#1A365D',
        },
        /* Primary CTA Red \u2014 #C53030 at 500.
           NOTE: legacy `gold-*` class names are repurposed as the new red palette
           so every existing utility (bg-gold-400, text-gold-500, etc.) re-themes
           automatically. */
        gold: {
          50: '#F3F4F6',
          100: '#F3F4F6',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#C53030',
          500: '#C53030',
          600: '#9E2626',
        },
        /* Secondary Action Green \u2014 #00B55D at 500 */
        success: {
          50: '#E5F8EF',
          100: '#B7ECD2',
          200: '#7FDDB1',
          300: '#46CE90',
          400: '#1FC476',
          500: '#00B55D',
          600: '#00904A',
          700: '#006D38',
        },
        ink: {
          900: '#000000',
          800: '#000000',
          700: '#000000',
          600: '#1A365D',
          500: '#1A365D',
          400: '#9DB4CE',
          300: '#CBD8E8',
          200: '#EAF0F7',
          100: '#F7FAFC',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F7FAFC',
          muted: '#EAF0F7',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0, 0, 0, 0.12)',
        elevated: '0 30px 60px -20px rgba(0, 0, 0, 0.18)',
        ring: '0 0 0 6px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'hero-radial': 'none',
        'gold-sweep': 'linear-gradient(90deg, #C53030 0%, #C53030 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};

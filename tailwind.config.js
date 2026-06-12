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
          50: '#eaf0f7',
          100: '#cbd8e8',
          200: '#9db4ce',
          300: '#6f90b4',
          400: '#4a6e97',
          500: '#2d5079',
          600: '#1f3e64',
          700: '#1A365D',
          800: '#142a48',
          900: '#0e1f36',
        },
        /* Primary CTA Red \u2014 #C53030 at 500.
           NOTE: legacy `gold-*` class names are repurposed as the new red palette
           so every existing utility (bg-gold-400, text-gold-500, etc.) re-themes
           automatically. */
        gold: {
          50: '#fdecec',
          100: '#fad0d0',
          200: '#f5a8a8',
          300: '#ee7c7c',
          400: '#dc4f4f',
          500: '#C53030',
          600: '#a11f1f',
        },
        /* Secondary Action Green \u2014 #00B55D at 500 */
        success: {
          50: '#e6faf1',
          100: '#b8f2d6',
          200: '#7fe6b5',
          300: '#46d693',
          400: '#1fc476',
          500: '#00B55D',
          600: '#009249',
          700: '#006d36',
        },
        ink: {
          900: '#0b1320',
          800: '#1a2540',
          700: '#2D3748',
          600: '#465272',
          500: '#64708e',
          400: '#8e98b3',
          300: '#b8c0d3',
          200: '#dde2ed',
          100: '#eef1f7',
        },
        surface: {
          DEFAULT: '#ffffff',
          alt: '#F7FAFC',
          muted: '#eef4fb',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(26, 54, 93, 0.18)',
        elevated: '0 30px 60px -20px rgba(26, 54, 93, 0.28)',
        ring: '0 0 0 6px rgba(197, 48, 48, 0.20)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse at top right, rgba(197,48,48,0.10), transparent 55%), radial-gradient(ellipse at bottom left, rgba(26,54,93,0.12), transparent 55%)',
        'gold-sweep':
          'linear-gradient(90deg, #C53030 0%, #dc4f4f 50%, #C53030 100%)',
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

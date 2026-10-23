/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#241713',
          dark: '#180F0C',
          deep: '#100705',
          soft: '#2E1F1A',
          surface: '#33231E',
        },
        cocoa: {
          DEFAULT: '#704735',
          light: '#8C5B44',
          dark: '#583627',
        },
        oat: {
          DEFAULT: '#F5EFE5',
          light: '#FAF6EE',
          pure: '#FFFDF9',
          warm: '#EADBCC',
          border: '#E2D5C3',
          muted: '#C8BAA6',
        },
        caramel: {
          DEFAULT: '#C6A47D',
          rich: '#B28F66',
          light: '#E2D0B9',
          glow: '#D8B892',
        },
        sage: {
          DEFAULT: '#9BA28A',
          dark: '#7A8268',
          light: '#CCD1C2',
          soft: '#EDF0E8',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'super-wide': '0.35em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        cremaWave: {
          '0%': { transform: 'scale(0.98) rotate(0deg)' },
          '50%': { transform: 'scale(1.02) rotate(1deg)' },
          '100%': { transform: 'scale(0.98) rotate(0deg)' },
        }
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'crema-wave': 'cremaWave 12s ease-in-out infinite',
      },
      boxShadow: {
        'coffee': '0 20px 40px -15px rgba(36, 23, 19, 0.25)',
        'coffee-lg': '0 30px 60px -20px rgba(36, 23, 19, 0.35)',
        'caramel-glow': '0 0 40px rgba(198, 164, 125, 0.3)',
      }
    },
  },
  plugins: [],
}

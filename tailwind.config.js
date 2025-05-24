/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
        },
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        ripple: {
          '0%': { width: '0px', height: '0px', opacity: 0.5 },
          '100%': { width: '500px', height: '500px', opacity: 0 },
        }
      }
    },
  },
  plugins: [],
};
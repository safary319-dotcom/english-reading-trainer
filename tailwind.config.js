/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        literacy: ['Andika', 'Nunito', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bce2ff',
          300: '#8ecfff',
          400: '#55b3fb',
          500: '#2f94ec',
          600: '#1d76cc',
          700: '#1b5ea3',
          800: '#1d4f85',
          900: '#1e4270',
        },
        sun: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        mint: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        coral: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          400: '#94a3b8',
          500: '#64748b',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shake: 'shake 0.45s ease-in-out',
        'pop-in': 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'bounce-soft': 'bounceSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

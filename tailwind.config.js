/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#475569',
          600: '#1e293b',
          700: '#0f172a',
          800: '#020617',
          900: '#0f172a',
        },
        accent: {
          teal: '#0d9488',
          emerald: '#059669',
        },
        page: '#EDE8F5', // light lavender site background
      },
    },
  },
  plugins: [],
}

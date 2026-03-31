/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bordeaux: '#4C0027',
        parchment: '#E6D6BF',
        'navbar-brown': '#2F1B0F',
        'footer-wood': '#362213',
        'warm-overlay': '#683623',
        'glass-base': '#3E2317',
        'deep-dark': '#2A1A0F',
      },
      fontFamily: {
        zapfino: ['Zapfino', 'cursive'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}


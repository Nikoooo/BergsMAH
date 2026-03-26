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
      },
      fontFamily: {
        zapfino: ['Zapfino', 'cursive'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#2A5A5A',
        'blue-shapes': '#EFF7FA',
        'text-color-dark': '#FFFFFF',
        'text-color-light': '#10182F',
        'grey-shapes': '#E7E8EA',
        'error': '#C50000',
      },
    },
  },
  plugins: [],
}
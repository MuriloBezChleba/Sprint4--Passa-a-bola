/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#E84F7F',
        'primary-purple': '#8A2BE2',
        'primary-green': '#4CAF50',
        'dark-bg': '#1A202C',
        'semi-dark-bg': '#2D3748',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#007ac0', 
        'primary-600': '#0055cc', 
        'sky-500': '#0ea5e9', 
      }
    },
  },
  plugins: [],
}


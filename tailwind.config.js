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
      },
      boxShadow: {
        'custom': '5px 0px 5px -5px rgba(34, 60, 80, 0.43)',
        'trello-card': '0px 1px 1px #091e4240, 0px 0px 1px #091e424f'
      },
      height: {
        'custom': 'calc(100vh - 86px)',
      },
    },
  },
  plugins: [],
}


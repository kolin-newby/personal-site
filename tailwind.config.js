/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx}",
    "./src/components/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-2deg)'},
          '50%': {transform: 'rotate(2deg)'},
        }
      },
      scale: {
        '98': '0.98',
        '99': '0.99'
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      },
      colors: {
        'theme-light-1': '#f5154e',
        'theme-light-2': '#4e0dbd',
        'theme-light-3': '#3daf94',
        'theme-dark-1': '#f5154e',
        'theme-dark-2': '#420b9f',
        'theme-dark-3': '#3daf94',
        'bg-dark': 'rgb(3,1,24)',
        // 'bg-dark-accent': 'rgb(8,3,65)',
        'bg-light': '#eeeeee',
      }
    },
  },
  plugins: [],
}

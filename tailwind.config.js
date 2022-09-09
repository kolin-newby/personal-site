/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx}",
    "./src/components/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'smallest': '770px',
        'small': '930px',
        'largest': '1600px'
      },
      animation: {
        'pulse-slow': 'pulse 5s linear infinite',
      },
      colors: {
        'theme-light-1': '#f5154e',
        'theme-light-2': '#4e0dbd',
        'theme-light-3': '#3daf94',
        'theme-dark-1': '#f5154e',
        'theme-dark-2': '#420b9f',
        'theme-dark-3': '#3daf94',
        'bg-dark': 'rgb(3,1,24)',
        'bg-light': '#eeeeee',
      }
    },
  },
  plugins: [],
}

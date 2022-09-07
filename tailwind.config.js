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
        'smallest': '860px',
        'largest': '1750px'
      },
      animation: {
        'pulse-slow': 'pulse 5s linear infinite',
      },
      colors: {
        'theme-light-1': '#dc2626',
        'theme-light-2': '#f59e0b',
        'theme-dark-1': '#1f66ff',
        'theme-dark-2': '#5affd8',
        'bg-dark': 'rgb(4,4,30)',
        'bg-light': '#ffffff',
      }
    },
  },
  plugins: [],
}

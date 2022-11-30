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
        // 221 h
        'theme-light-1': 'rgb(37 99 235)',
        // 189 h
        'theme-light-2': 'rgb(6 182 212)',
        // 161 h
        'theme-light-3': 'rgb(5 150 105)',
        'theme-dark-1': 'rgb(37 99 235)',
        'theme-dark-2': 'rgb(6 182 212)',
        'theme-dark-3': 'rgb(5 150 105)',
        'bg-dark': 'rgb(1,3,20)',
        'dark-accent': 'rgb(21,21,49)',
        'bg-light': '#eeeeee',
      }
    },
  },
  plugins: [],
}

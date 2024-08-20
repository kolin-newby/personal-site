/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx}",
    "./src/components/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-bg-image': "url(/public/img/bg.svg)"
      },
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
        // 41 h
        'theme-light-1': '#fd1d1d',
        // 9 h
        'theme-light-2': '#ff5a95',
        // 341 h
        'theme-light-3': '#ffa600',

        'theme-dark-1': '#26513f',
        'theme-dark-2': '#513f26',
        'theme-dark-3': 'rgb(5 150 105)',

        'bg-light': '#efefef',
        'light-accent': '#95c2c6',

        'bg-dark': '#383632',
        'dark-accent': '#19593a',
      }
    },
  },
  plugins: [],
}

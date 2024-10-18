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
        'light-bg-image': "url('/public/img/bg.svg')",
        'photo-1': "url('https://s1.darkroom.com/xrldcnuprphtrdvppvs6frqjpgok')",
        'photo-2': "url('https://s2.darkroom.com/6fbpp12cfffsuaq8brn5mvk5dct3')",
        'photo-3': "url('https://s2.darkroom.com/j62muwmn0qscmt0vrdlizmtod0nc')",
        'photo-4': "url('https://s0.darkroom.com/rb69qelblbux7vzc6z96tx8zqq5n')",
        'photo-5': "url('https://s1.darkroom.com/vya81fp2tnfae5mg7tjm6ed1t87w')",
        'photo-6': "url('https://s3.darkroom.com/syt12jq96c9jxcw7etw93xplnpr6')",
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

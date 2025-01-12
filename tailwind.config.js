/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '450px',
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      backgroundImage: {
        'light-bg-image': "url('/public/img/bg.svg')",
        'portfolio-gray-1': "url('/public/photos/gray_api_sec_1.png')",
        'portfolio-gray-2': "url('/public/photos/gray_api_sec_2.png')",
        'portfolio-gray-3': "url('/public/photos/gray_api_sec_3.png')",
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
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}

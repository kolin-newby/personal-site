/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      scale: {
        98: "0.98",
        99: "0.99",
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
      },
    },
  },
  plugins: [],
};

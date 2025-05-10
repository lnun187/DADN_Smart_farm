/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards', 

      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' }, 
          '100%': { opacity: '1', transform: 'translateY(0)' }, 
        },
      }

    },
  },
  plugins: [],
});
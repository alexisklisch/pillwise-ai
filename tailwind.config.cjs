/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: 'Montserrat, Arial, sans-serif'
    },
    extend: {
      colors: {
        dark: {
          DEFAULT: '#222222'
        },
        grey: {
          100: '#F8F8F8',
          200: '#f1f1f1',
          500: '#808080'
        },
        brand: {
          orange: '#FF6006',
          purple: '#AE169F',
          violet: '#D748C8'
        }
      }
    }
  },
  plugins: []
}

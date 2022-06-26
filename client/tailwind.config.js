/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B568C',
        'secondary': '#6377A1',
        'tertiary': '#8AA6DA'
      }
    },
  },
  plugins: [],
}

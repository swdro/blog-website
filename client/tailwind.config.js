/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1756a9',
        // 'primary': '#3B568C',
        'secondary': '#6377A1',
        'tertiary': '#8AA6DA',
        'lightprimary': '#D0D9EB'
      },
      fontFamily: {
        "exo": ["Exo", "serif"],
        "inconsolata": ["Inconsolata", "monospace"],
        "oswald": ["Oswald"]
      }
    },
  },
  plugins: [],
}

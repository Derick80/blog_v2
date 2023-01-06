/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./app/**/*.{js,ts,jsx,tsx}",
],
darkMode:   'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        body:['Oswald', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
// change back to class before prod
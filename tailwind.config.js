/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./app/**/*.{js,ts,jsx,tsx}",
],
darkMode:   'media', // or 'media' or 'class'
  theme: {
    colors:{
      'crimson1': '#1d1418',
      'crimson2': '#27141c',
      'crimson3': '#3c1827',
      'crimson4': '#481a2d',
      'crimson5': '#541b33',
      'crimson6': '#641d3b',
      'crimson7': '#801d45',
      'crimson8': '#ae1955',
      'crimson9': '#e93d82',
      'crimson10': '#f04f88',
      'crimson11': '#f76190',
      'crimson12': '#feecf4',
      'slate1': '#fbfcfd',
    'slate2': '#f8f9fa',
    'slate3': '#f1f3f5',
    'slate4': '#eceef0',
    'slate5': '#e6e8eb',
    'slate6': '#dfe3e6',
    'slate7': '#d7dbdf',
    'slate8': '#c1c8cd',
    'slate9': '#889096',
    'slate10': '#7e868c',
    'slate11': '#687076',
    'slate12': '#11181c',
    'mauve1': '#161618',
    'mauve2': '#1c1c1f',
    'mauve3': '#232326',
    'mauve4': '#28282c',
    'mauve5': '#2e2e32',
    'mauve6': '#34343a',
    'mauve7': '#3e3e44',
    'mauve8': '#504f57',
    'mauve9': '#706f78',
    'mauve10': '#7e7d86',
    'mauve11': '#a09fa6',
    'mauve12': '#ededef',
    },
    extend: {
      fontFamily:{
        body:['Oswald', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
}

// change back to class before prod
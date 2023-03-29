/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./app/**/*.{js,ts,jsx,tsx}",
],  theme: {

    extend: {
      fontFamily:{
        sans:['Raleway', 'sans-serif'],
      },
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
  "indigo1": '#131620',
  "indigo2": '#15192d',
  "indigo3": '#192140',
  "indigo4": '#1c274f',
  "indigo5": '#1f2c5c',
  "indigo6": '#22346e',
  "indigo7": '#273e89',
  "indigo8": '#2f4eb2',
  "indigo9": '#3e63dd',
  "indigo10": '#5373e7',
  "indigo11": '#849dff',
  "indigo12": '#eef1fd',
  "amberA1": '#c08205',
  "amberA2": '#ffab02',
  "amberA3": '#ffbb01',
  "amberA4": '#ffb700',
  "amberA5": '#ffb300',
  "amberA6": '#ffa201',
  "amberA7": '#ec8d00',
  "amberA8": '#ea8900',
  "amberA9": '#ffa600',
  "amberA10": '#ff9500',
  "amberA11": '#ab5300',
  "amberA12": '#481800',
  "blue1": '#0f1720',
  "blue2": '#0f1b2d',
  "blue3": '#10243e',
  "blue4": '#102a4c',
  "blue5": '#0f3058',
  "blue6": '#0d3868',
  "blue7": '#0a4481',
  "blue8": '#0954a5',
  "blue9": '#0091ff',
  "blue10": '#369eff',
  "blue11": '#52a9ff',
  "blue12": '#eaf6ff',
  "blueA1": '#0582ff',
  "blueA2": '#0582ff',
  "blueA3": '#0280ff',
  "blueA4": '#0180ff',
  "blueA5": '#0180ef',
  "blueA6": '#0177e6',
  "blueA7": '#0077df',
  "blueA8": '#0082e6',
  "blueA9": '#0091ff',
  "blueA10": '#0080f1',
  "blueA11": '#0066db',
  "blueA12": '#002149',

      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),


  ],
}

// change back to class before prod
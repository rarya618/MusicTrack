/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'red': '#ff0000',
      'grey': '#ccc',
      'light-grey': '#f5f5f5',
      'black': '#000000',
      'deep-orange': '#D04848',
      'light-orange': '#F3B95F',
      'yellow': '#FDE767',
      'blue': '#6895D2',
    },
    extend: {},
  },
  plugins: [],
}


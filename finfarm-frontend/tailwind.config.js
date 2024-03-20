/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{css,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SDSamliphopangche_Basic', ...defaultTheme.fontFamily.sans],
        hopang: ['SDSamliphopangche_Outline'],
        nanum: ['NanumSquareRound'],
      },
    },
  },
  plugins: [require('daisyui')],
};

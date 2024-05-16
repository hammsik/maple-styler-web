/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#2b3b55',
          secondary: '#E3DDDC',
          tertiary: '#C3C3C3',


        }
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
};

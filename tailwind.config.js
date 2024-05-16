/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				custom: {
					primary: '#2b3b55',
					secondary: '#E3DDDC',
					tertiary: '#C2BFBF',
          selected: '#B56767',
				}
			}
		}
	},
	plugins: [require('daisyui'), require('tailwind-scrollbar-hide')]
};

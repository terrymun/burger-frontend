const plugin = require('tailwindcss/plugin');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			scale: ['active'],
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
	],
};

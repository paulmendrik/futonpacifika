
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js',],
	theme: {
	screens: {
	xs: { max: '575px' },
	sm: { min: '576px', max: '897px' },
	md: { min: '898px', max: '1199px' },
	lg: { min: '1200px' },
	xl: { min: '1259px' }
	},
	extend: {
	fontFamily: {'barlow': ["Barlow", "sans-serif"], 'karma': ["Karma", "serif"] }
	},
	plugins: [
	require('flowbite/plugin'),
	],

}

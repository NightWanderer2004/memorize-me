/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         colors: {
            primary: '#4C4E4B',
            secondary: '#181F14',
            accent: '#4682B6',
         },
         boxShadow: {
            minimal: '0 0.6px 2.4px rgba(0, 0, 0, 0.15)',
            photo: '0 1.4px 5.6px -0.7px rgba(0, 0, 0, 0.20)',
         },
      },
   },
   plugins: [],
}

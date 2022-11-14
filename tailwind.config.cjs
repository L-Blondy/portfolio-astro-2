/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
   theme: {
      extend: {
         screens: {
            xs: '480px',
         },
      },
      container: {
         center: true,
         padding: {
            DEFAULT: '1.5rem',
            xs: '3rem',
            md: '3rem',
            lg: '6rem',
            xl: '9rem',
            '2xl': '18rem',
         },
      },
      fontFamily: {
         sans: [
            'Inter',
            'Heebo',
            'Cabin',
            'Ubuntu',
            'Rubik',
            'Roboto',
            'system-ui',
         ],
         mono: [
            '"Red Hat Mono"',
            '"IBM Plex Mono"',
            '"Fira Mono"',
            '"JetBrains Mono"',
            '"Ubuntu Mono"',
            'Ubuntu',
            'Rubik',
            'Roboto',
            'system-ui',
         ],
      },
   },

   daisyui: {
      themes: ['light', 'dark'],
   },
   plugins: [require('daisyui')],
};

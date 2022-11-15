const plugin = require('tailwindcss/plugin');

// this function handles the opacity of color
function withOpacityValue(variable) {
   return ({ opacityValue }) => {
      if (opacityValue === undefined) {
         return `hsl(var(${variable}))`;
      }
      return `hsl(var(${variable}) / ${opacityValue})`;
   };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
   theme: {
      extend: {
         screens: {
            xs: '480px',
         },
         colors: {
            'base-content-focus': withOpacityValue('--base-content-focus'),
         },
         animation: {
            'slide-in-bottom': 'slide-in-bottom 500ms forwards',
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
      themes: [
         {
            light: {
               ...require('daisyui/src/colors/themes')['[data-theme=light]'],
               '--base-content-focus': '207 16% 15%',
               '--bc': '207 12% 35%',
               primary: 'steelblue',
               // primary: 'lightseagreen',
               // primary: 'mediumturquoise',
               // primary: 'teal',
            },
         },
         {
            halloween: {
               ...require('daisyui/src/colors/themes')[
                  '[data-theme=halloween]'
               ],
               '--base-content-focus': '0 100% 100%',
               primary: 'paleturquoise',
               // primary: 'orange',
               // primary: 'lawngreen',
               // primary: 'turquoise',
               // primary: 'yellow',
            },
         },
      ],
   },
   plugins: [
      require('daisyui'),
      plugin(({ addUtilities,addBase }) => {
         addBase({
            "@keyframes slide-in-bottom": {
               from: {
                  opacity: 0,
                  transform: 'translateY(50px)',
               }
               to: {
                  opacity: 1,
                  transform: 'translateY(0)';
               }
            }
         })
         addUtilities({
            '.animation-duration-75': { animationDuration: '75ms' },
            '.animation-duration-100': { animationDuration: '100ms' },
            '.animation-duration-150': { animationDuration: '150ms' },
            '.animation-duration-200': { animationDuration: '200ms' },
            '.animation-duration-300': { animationDuration: '300ms' },
            '.animation-duration-500': { animationDuration: '500ms' },
            '.animation-duration-700': { animationDuration: '700ms' },
            '.animation-duration-1000': { animationDuration: '1000ms' },
         });
         addUtilities({
            '.animation-delay-75': { animationDelay: '75ms' },
            '.animation-delay-100': { animationDelay: '100ms' },
            '.animation-delay-150': { animationDelay: '150ms' },
            '.animation-delay-200': { animationDelay: '200ms' },
            '.animation-delay-300': { animationDelay: '300ms' },
            '.animation-delay-500': { animationDelay: '500ms' },
            '.animation-delay-700': { animationDelay: '700ms' },
            '.animation-delay-1000': { animationDelay: '1000ms' },
         });
      }),
   ],
};

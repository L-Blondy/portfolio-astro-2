/* cSpell:disable */
const colorTheme = require('./src/lib/colorTheme.cjs');
const plugin = require('tailwindcss/plugin');

function pixelToNumber(pixelValue) {
   return +pixelValue.replace('px', '');
}

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
   theme: {
      extend: {
         screens: {
            xs: '480px',
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
   plugins: [
      /**
       * COLOR THEME
       */
      colorTheme({
         light: {
            primary: 'steelblue',
            'base-100': 'white',
            'base-content': 'hsl(207 12% 35%)',
            'base-content-focus': 'hsl(207 16% 15%)',
         },
         darkGold: {
            primary: 'gold',
            'base-100': 'hsl(182 100% 17%)',
            'base-content': '#c2cdd0',
            'base-content-focus': 'hsl(174 100% 98%)',
         },
         darkTurquoise: {
            primary: 'hsl(174 75% 65%)',
            'base-100': '#001515',
            'base-content': '#c2cdd0',
            'base-content-focus': 'hsl(174 100% 98%)',
         },
      }),

      /**
       * BTN COMPONENTS
       */
      plugin(({ addComponents, theme }) => {
         const buttonBase = {
            borderRadius: theme('borderRadius.DEFAULT'),
            padding: `${theme('spacing[2.5]')} ${theme('spacing[5]')}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 100ms',
            fontWeight: 500,
            paddingLeft: '1.5125rem',
            paddingRight: '1.5125rem',
            height: '3.25rem',
            fontSize: '0.875rem',
            '&:active': {
               transform: 'scale(0.975)',
               transformOrigin: 'center',
            },
         };

         const buttonContained = {
            ...buttonBase,
            padding: `calc(2px + ${theme('spacing[2.5]')}) calc(2px + ${theme(
               'spacing[5]',
            )})`,
            backgroundColor: theme('colors.primary'),
            color: 'white',
            '&:hover': {
               opacity: '0.75',
            },
         };

         const buttonOutlined = {
            ...buttonBase,
            color: theme('colors.primary'),
            border: '1px solid currentColor',
            backgroundColor: '#88888800',
            '&:hover': {
               backgroundColor: '#88888820',
            },
         };

         addComponents({
            '.btn': buttonBase,
            '.btn-contained': buttonContained,
            '.btn-outlined': buttonOutlined,
         });
      }),

      /**
       * CONTAINER SM FIX
       */
      plugin(({ addComponents, theme }) => {
         addComponents({
            [`@media (min-width: ${theme('screens.xs')}) and (max-width: ${
               pixelToNumber(theme('screens.sm')) - 0.1
            }px)`]: {
               '.container': {
                  maxWidth: '100% !important',
               },
            },
         });
      }),

      /**
       * ANIMATIONS
       */
      plugin(({ addUtilities, addBase }) => {
         addBase({
            '@keyframes slide-in-bottom': {
               from: {
                  opacity: 0,
                  transform: 'translateY(50px)',
               },
               to: {
                  opacity: 1,
                  transform: 'translateY(0)',
               },
            },
         });

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

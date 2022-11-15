const Color = require('color');
const { reduce, forEach } = require('lodash');
const plugin = require('tailwindcss/plugin');
/**
 * @example
 * colorTheme({
 * 	light: {
 * 		primary: 'gold'
 * 		secondary: 'tomato'
 * 	},
 * 	dark: {
 * 		primary: 'lightblue'
 * 		secondary: 'lime'
 * 	},
 * 	forest: {
 * 		primary: 'green'
 * 		secondary: 'brown'
 * 	},
 * })
 * ...
 * <html data-theme='light'>
 * ...
 * <button class='bg-primary text-secondary hover:bg-opacity-75'>
 *    Click me!
 * </button>
 * ...
 * @param {Record<string, Record<string,string>>} config
 * @returns {void}
 */
module.exports = function colorTheme(config = {}) {
   const themeConfig = reduce(
      config,
      (themeConfig, values, themeName) => {
         const selector = `[data-theme=${themeName}]:root`;
         // initialize the "@layer base" selector
         if (!themeConfig.base[selector]) {
            themeConfig.base[selector] = {};
         }
         forEach(values, (rawColor, name) => {
            const variableName = `--ct-${name}`;
            const [h, s, l] = Color(rawColor).hsl().array();
            // set the css variable in "@layer base"
            themeConfig.base[selector][variableName] = `${h} ${s}% ${l}%`;
            // map it the the theme colors
            themeConfig.colors[name] = computeColorValue(variableName);
         });

         return themeConfig;
      },
      { base: {}, colors: {} },
   );

   return plugin(
      // add the css variables to "@layer base"
      ({ addBase }) => {
         addBase(themeConfig.base);
      },
      // extend the colors config
      { theme: { colors: themeConfig.colors } },
   );
};

function computeColorValue(variableName) {
   return ({ opacityVariable, opacityValue }) => {
      if (typeof opacityValue !== 'undefined') {
         return `hsl(var(${variableName}) / ${opacityValue})`;
      }
      if (typeof opacityVariable !== 'undefined') {
         return `hsl(var(${variableName}) / var(${opacityVariable}, 1))`;
      }
      return `hsl(var(${variableName}))`;
   };
}

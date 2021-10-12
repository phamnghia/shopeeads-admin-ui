const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fill: theme => ({
        'red': theme('colors.red.500'),
        'green': theme('colors.green.500'),
        'blue': theme('colors.blue.500'),
        'primary': '#FF5A0A'
      }),
      width: {
        '500': '500px',
        '450': '450px',
        '400': '400px',
        '350': '350px',
        '300': '300px',
        '250': '250px',
        '200': '200px',
        '150': '150px',
        '100': '100px',
        '50': '50px',
        '80': '80px',
        'full': "100%"
      },
      height: {
        '500': '500px',
        '450': '450px',
        '400': '400px',
        '350': '350px',
        '300': '300px',
        '250': '250px',
        '200': '200px',
        '150': '150px',
        '100': '100px',
        '50': '50px',
        '80': '80px',
        'full': "100%"
      },
    },
    spacing: {
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px 3px rgba(0, 0, 0, 0.1), 0 4px 6px 2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px 5px rgba(0, 0, 0, 0.1), 0 10px 10px 5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
     '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    colors: {
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      purple: colors.violet,
      indigo: colors.indigo,
      green: colors.green,
      orange: '#FF5A0A',
      system: {
        primary: '#FF5A0A',
        secondary: '#FFF9F6'
      }
    },
    screens: {
      'all': {'max': '4096px'},
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

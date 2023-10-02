import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        emerald: colors.emerald,
        yellow: colors.yellow,
        sky: colors.sky,
        slate: colors.slate,
        lime: colors.lime,
        red: colors.red,
        blue: colors.blue,
        gray: colors.gray
    },
    safelist: [
      {
          pattern: /bg-(red|green|blue)-(100|200|300|400|500|600|700|800|900)/,
        },
    	],
    },
  },

  plugins: [],
}
export default config

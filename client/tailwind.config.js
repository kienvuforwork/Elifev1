/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      borderWidth: ['focus'], // Enable focus variant for borderWidth utilities
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        elife: {
          400: '#f5f8fa',
          500: '#e1e8ed',
          600: '#aab8c2',
          700: '#14171a',
        },
        blue:{
          400: '#e0f7ff',
          500: '#a1e0ff',
          600:'#64c9ff',
          700: '#1da1f2'
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}


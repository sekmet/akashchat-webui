/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'scrollbar-thumb': 'rgb(209 213 219)',
        'scrollbar-thumb-dark': 'rgb(75 85 99)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

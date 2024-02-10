/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customPurple: '#5F00CE',
        customDarkBlue: '#262F4B',
        customLight: '#f3f6ff'
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}

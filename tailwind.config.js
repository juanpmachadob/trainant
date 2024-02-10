/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customLightPurple: '#d1aff9',
        customPurple: '#5F00CE',
        customRed: '#ef596f',
        customDarkBlue: '#262F4B',
        customLight: '#f3f6ff'
      },
      boxShadow: {
        customClassic: '0 6px 10px rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        blob: 'blob 7s infinite'
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)'
          },
          '100%': {
            transform: 'tranlate(0px, 0px) scale(1)'
          }
        }
      }
    }
  },
  plugins: []
}

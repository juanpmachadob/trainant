import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Trainant',
    short_name: 'Trainant',
    description: 'Web application for detailed control and creation of exercise routines, weight and repetition tracking, exercise visualization.',
    icons: [{
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
      purpose: 'apple touch icon'
    },
    {
      src: '/maskable_icon.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    }
    ],
    theme_color: '#262F4B',
    background_color: '#f3f6ff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
})

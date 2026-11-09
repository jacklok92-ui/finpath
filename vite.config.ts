import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'FinPath Financial Planning Workspace',
        short_name: 'FinPath',
        description: 'A professional financial planning workspace.',
        theme_color: '#f7f7f5',
        background_color: '#f7f7f5',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        icons: []
      }
    })
  ]
})
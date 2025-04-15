import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/time-zone-converter/',
  server: {
    host: true,
    allowedHosts: [
      '.ngrok-free.app'  // This will allow all ngrok-free.app subdomains
    ]
  }
}) 
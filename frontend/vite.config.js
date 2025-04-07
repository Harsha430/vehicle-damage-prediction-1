import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_BASE_URL = '/api'  // This will be proxied to Flask

// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    }
  }
}

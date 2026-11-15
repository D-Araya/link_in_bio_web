import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'development-csp',
      apply: 'serve',
      // Vite HMR requires inline refresh code and a local WebSocket in dev.
      transformIndexHtml: {
        order: 'pre',
        handler: (html) => html.replace(/\s*<meta http-equiv="Content-Security-Policy"[^>]*>/, ''),
      },
    },
  ],
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    sourcemap: false,
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom']
          }
        }
      }
    },
    server: {
      port: 5173,
      host: true
    }
  }

  // Configuración específica para GitHub Pages
  if (mode === 'production') {
    // El base path será el nombre del repositorio
    // Cambiar 'link-in-bio-website' por el nombre real del repositorio
    config.base = '/link-in-bio-website/'
  }

  return config
})
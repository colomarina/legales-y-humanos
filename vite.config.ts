import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// El sitio se publica en GitHub Pages bajo /legales-y-humanos/.
// Con dominio propio, cambiar a '/'.
export default defineConfig({
  base: '/legales-y-humanos/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
})

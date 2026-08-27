import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Absolute base so SPA routes like /module-1/previous-year-questions refresh correctly.
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  preview: {
    // Ensure deep links work under `vite preview`.
    port: 4173,
  },
})

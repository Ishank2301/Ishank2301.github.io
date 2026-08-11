import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // The portfolio is served from the root of Ishank2301.github.io.
  // Set VITE_BASE if this is ever deployed from a project repository instead.
  base: process.env.VITE_BASE || '/',
  plugins: [react()]
})

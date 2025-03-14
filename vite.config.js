import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/uploads": "http://localhost:3000",
      "/api": "http://localhost:3000", // Forwards all requests at localhost:5173/api/*
      "/auth": "http://localhost:3000"
    }
  }
})

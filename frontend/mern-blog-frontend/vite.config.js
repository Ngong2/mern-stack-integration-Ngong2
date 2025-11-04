import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://mern-stack-integration-ngong2.onrender.com", // ✅ use HTTP not HTTPS
        changeOrigin: true,
        secure: false, // ✅ ignore self-signed HTTPS certs
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'; // Import Node.js file system module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'), // Path to your private key
      cert: fs.readFileSync('./localhost.pem'),   // Path to your certificate
    },
  },
})

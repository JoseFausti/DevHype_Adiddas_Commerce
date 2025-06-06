import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    watch: {
      usePolling: true
    },
    https: {
      key: './key.pem',
      cert: './cert.pem'
    },
    host: true,
    strictPort: true,
    port: 5173
  }
})

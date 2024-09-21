// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/expenses': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    },
  },
});
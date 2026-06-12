import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/aun-campaign/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2018',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          forms: ['react-hook-form'],
        },
      },
    },
  },
});

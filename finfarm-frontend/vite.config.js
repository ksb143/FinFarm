import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  default: {
    host: '14.46.141.193',
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

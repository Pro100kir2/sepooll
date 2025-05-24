import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 🔥 ВАЖНО для Vercel!
  plugins: [react()],
  optimizeDeps: {
    exclude: ['dist'],
  },
});
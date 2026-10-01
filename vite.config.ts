import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // The development product config is the single source of truth; the app reads it via src/config.
      '@product-config': fileURLToPath(new URL('./.impeccable/config/product.config.ts', import.meta.url)),
    },
  },
  server: { port: 5173 },
});

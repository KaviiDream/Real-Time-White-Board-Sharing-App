import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration drives both the dev server and the production build.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
});

import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});

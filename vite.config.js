/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  base: './',
  plugins: [
    react(),
    legacy({
      targets: pkg.browserslist,
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
        silenceDeprecations: ['import'],
      },
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
});

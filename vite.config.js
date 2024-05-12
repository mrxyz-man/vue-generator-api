import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'ApiGenerator',
      fileName: 'api-generator',
    },
    copyPublicDir: false,
  },
  plugins: [
    vue(),
  ],
});

import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'VueGeneratorApi',
      fileName: 'vue-generator-api',
    },
    copyPublicDir: false,
  },
  plugins: [
    vue(),
  ],
});

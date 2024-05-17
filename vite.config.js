import { resolve } from 'path';
import { defineConfig } from 'vite';
import { babel } from '@rollup/plugin-babel';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'VueGeneratorApi',
      fileName: 'vue-generator-api',
    },
    copyPublicDir: false,
  },
  plugins: [
    vue(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', 'ts'],
    }),
  ],
});

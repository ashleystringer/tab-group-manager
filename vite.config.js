import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html'
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      pages: [
        {
          entry: resolve(__dirname, 'src/popup/popup.js'),
          filename: 'popup.html',
          template: "public/popup.html",
          injectOptions: {
            data: {
              title: 'Popup Page'
            }
          }
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/popup.js'), //"public/popup.html"
      },
      output: {
        // Customize the output directory structure
        entryFileNames: 'scripts/[name].js',
        chunkFileNames: 'scripts/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        dir: 'dist',
      },
    },
  },
});
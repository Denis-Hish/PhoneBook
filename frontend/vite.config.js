import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // В dev используем base '/', в prod билдим с '/phonebook/'
  base: command === 'build' ? '/phonebook/' : '/',
  plugins: [react()],
  css: {
    devSourcemap: true, // Включить source maps для CSS/SCSS в dev режиме
  },
  resolve: {
    alias: {
      events: 'events/',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // На случай если base в dev окажется '/phonebook/'
      '/phonebook/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/phonebook/, ''),
      },
    },
  },
}));

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // Дозволяє доступ з інших пристроїв
    port: 5173,      //  Порт 
    strictPort: true, // Якщо порт зайнятий, не буде використовувати інший
    open: true       // Автоматично відкриває браузер на моєму комп'ютері
  }
})

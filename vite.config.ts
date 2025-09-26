import { fileURLToPath, URL } from 'node:url'

import Uni from '@uni-helper/plugin-uni'
import UniPages from 'vite-plugin-uni-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // https://uni-helper.js.org/plugin-uni
    Uni(),
    UniPages(),
  ],
})

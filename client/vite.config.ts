import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss' // <-- 1. IMPORTE O TAILWIND

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss], // <-- 2. ADICIONE O TAILWIND AQUI
    },
  },
})
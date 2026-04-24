import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://shopfiesta.vercel.app',
      dynamicRoutes: [
        '/',
        '/products',
        '/about',
        '/support',
        '/shipping-returns',
        // You can fetch and map dynamic product IDs here later
      ]
    })
  ],
})

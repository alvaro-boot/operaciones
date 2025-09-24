import { defineConfig } from 'vite'

// Configuración para el micro frontend de operaciones
export default defineConfig({
  // Configuración del servidor de desarrollo
  server: {
    port: 8080,
    host: true,
    open: true,
    cors: true
  },
  
  // Configuración de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  
  // Configuración de preview
  preview: {
    port: 8080,
    host: true,
    open: true
  },
  
  // Configuración de plugins
  plugins: [],
  
  // Configuración de optimización
  optimizeDeps: {
    include: []
  },
  
  // Configuración de CSS
  css: {
    devSourcemap: true
  },
  
  // Configuración de assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.ico'],
  
  // Configuración de base
  base: './',
  
  // Configuración de define para variables globales
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})

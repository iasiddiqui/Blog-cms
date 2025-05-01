import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/your-project-name/' : '/', // Use your actual project name if deployed in a subfolder
  define: {
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL,
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,  // Set this according to your app size
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separate vendor libraries into their own chunk
          }
        },
      },
    },
  },
});

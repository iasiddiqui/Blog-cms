import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development or production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: mode === 'production' ? '/blog-cms/' : '/',
    define: {
      'process.env': {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});

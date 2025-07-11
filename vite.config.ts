import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/parseFinancials': {
          target: env.VITE_PARSE_URL,
          changeOrigin: true,
        },
      },
    },
  }
})

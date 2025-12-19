import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Check if SSL certificates exist
const keyPath = path.resolve(__dirname, 'localhost-key.pem')
const certPath = path.resolve(__dirname, 'localhost.pem')

const sslConfig = {}
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  sslConfig.https = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  }
}

// Use dynamic import for MDX to avoid ESM/CJS compatibility issues
export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup')
  
  return {
    plugins: [
      react(),
      mdx.default({
        providerImportSource: '@mdx-js/react'
      })
    ],
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    server: {
      host: 'localhost',
      port: 5173,
      ...sslConfig
    }
  }
})
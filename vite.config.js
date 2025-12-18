import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
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

export default defineConfig({
  plugins: [
    react(),
    mdx({
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
})
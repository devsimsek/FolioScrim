import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Load deployment config
let deploymentConfig = { basePath: '/' }
try {
  const configPath = path.resolve('config.json')
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    deploymentConfig = config.deployment || { basePath: '/' }
  }
} catch (error) {
  console.warn('Could not load deployment config, using defaults:', error.message)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: deploymentConfig.basePath || '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  },
  define: {
    __DEPLOYMENT_CONFIG__: JSON.stringify(deploymentConfig)
  }
})

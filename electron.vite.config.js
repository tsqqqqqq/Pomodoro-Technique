import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main'
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      outDir: 'dist/preload'
    },
    plugins: [externalizeDepsPlugin()]
  },
  rollupInputOptions: {
    output: {
      format: 'esm'
    }
  },
  renderer: {
    build: {
      outDir: 'dist/renderer'
    },
    resolve: {
      alias: {
        '@resources': resolve('src/resources'),
        '@renderer': resolve('src/renderer/src'),
        '@main': require('path').resolve(__dirname, 'src/main'),
      }
    },
    plugins: [vue()]
  }
})

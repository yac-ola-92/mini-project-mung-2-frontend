import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {

      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',  // Spring Boot의 static 폴더로 설정
  },
  server: {
    historyApiFallback: true,  // Vue Router History 모드 지원
    proxy: {
      '/api': {
        target: 'http://localhost:8088', // Spring Boot 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 제거
        secure: false,  // HTTPS 사용하지 않으면 false 설정
      },
      '/assets': {
        target: 'http://localhost:8088', // Spring Boot 서버에서 assets 경로를 처리
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, '/static/assets'), // assets 경로를 static으로 변경
        secure: false,  // HTTPS 사용하지 않으면 false 설정
      },
    },
  }

})

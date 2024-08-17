import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const Timestamp = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/viewport.scss";'
      }
    }
  },
  server: {
    host: "localhost",
    port: "3000",
    proxy: {
      '^/api': {
        target: 'http://192.168.12.161:8088', //替换的服务器地址
        changeOrigin: true,//开启代理，允许跨域
        // 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: path => path.replace(/^\/api/, "")
      },
      '/ws': {
        ws: true,
        target: 'http://192.168.12.161:8088',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/ws/, "")
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    //origin: 'http://localhost:3000',//本地跨域的源,from origin
    //origin: 'http://192.168.12.161:8088' //线上图片跨域，可用80试试。
  },
})

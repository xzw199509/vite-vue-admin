// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config';
import{ resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  test:{
    setupFiles:"./vitest.setup.ts"
  },
  plugins: [vue()],
  server: {
    host: '127.0.0.1',//这里是服务器ip
    port: 3090,  // 支行端口
    // open: true, // 自动运行在浏览器中
    proxy: { //跨域代理 api 还有rewrite里面的api 改成自己项目里面的
        '/api': {
            target: 'http://localhost:9988',  // 跨域地址
            ws: true,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
        },
    },
  },
  resolve:{
    alias:[
      {
        find:'@',
        replacement:resolve(__dirname,'src')
      }
    ]
  }
})

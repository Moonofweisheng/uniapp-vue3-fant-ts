/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2023-08-10 14:44:21
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\vite.config.ts
 * 记得注释
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  base: './',
  plugins: [
    uni(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          from: 'uni-mini-router',
          imports: ['createRouter', 'useRouter', 'useRoute']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/store'],
      eslintrc: {
        enabled: true,
        globalsPropValue: true
      }
    })
  ],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => {
    //       return path.replace(/^\/api/, '/api')
    //     }
    //   }
    // }
  }
})

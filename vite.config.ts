/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2023-04-17 22:53:05
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\vite.config.ts
 * 记得注释
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import TransformPages from 'uni-read-pages-vite'
export default defineConfig({
  base: './',
  plugins: [uni()],
  define: {
    ROUTES: new TransformPages().routes
  }
})

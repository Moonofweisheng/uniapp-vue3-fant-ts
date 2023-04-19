/*
 * @Author: weisheng
 * @Date: 2023-04-18 21:48:30
 * @LastEditTime: 2023-04-19 11:03:21
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\store\persist.ts
 * 记得注释
 */
import { CommonUtil } from '@/uni_modules/fant-mini-plus'
import { PiniaPluginContext } from 'pinia'

export function persist({ store }: PiniaPluginContext) {
  let initState = CommonUtil.deepClone(store.$state)
  // 从缓存中读取
  const storageState = uni.getStorageSync(store.$id)
  if (storageState) {
    initState = storageState
  }
  store.$state = initState
  store.$subscribe(() => {
    // 在存储变化的时候将store缓存
    uni.setStorageSync(store.$id, JSON.parse(JSON.stringify(store.$state)))
  })
}

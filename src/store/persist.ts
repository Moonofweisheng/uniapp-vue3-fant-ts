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
    // 在存储变化的时候执行
    uni.setStorageSync(store.$id, JSON.parse(JSON.stringify(store.$state)))
  })
}

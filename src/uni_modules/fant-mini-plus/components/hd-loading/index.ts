/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-03-22 14:58:48
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-loading\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import { CommonUtil } from '../../index'
import type { Loading, LoadingOptions } from './types'

/**
 * 默认参数
 */
export const defaultLoadingOptions: LoadingOptions = {
  background: true,
  title: '',
  delayTime: 0,
  type: 'flower'
}

export function useLoading(selector: string = 'hd-loading'): Loading {
  const { proxy } = getCurrentInstance() as any

  const showLoading = (option: LoadingOptions) => {
    const loading = getLoading(proxy, selector)
    option = CommonUtil.deepMerge(defaultLoadingOptions, option) as LoadingOptions
    if (loading) {
      loading.reset(option)
      loading.show()
    } else {
      console.error('未找到 hd-loading 节点，请确认 selector 是否正确')
    }
  }

  const hideLoading = () => {
    const loading = getLoading(proxy, selector)
    if (loading) {
      loading.reset(defaultLoadingOptions)
      loading.hide()
    } else {
      console.error('未找到 hd-loading 节点，请确认 selector 是否正确')
    }
  }
  return {
    showLoading,
    hideLoading
  }
}

function getLoading(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

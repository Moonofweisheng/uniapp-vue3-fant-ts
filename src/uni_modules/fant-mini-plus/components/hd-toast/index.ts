/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-03-23 13:16:12
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-toast\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import { CommonUtil } from '../../index'
import type { Toast, ToastOptions } from './types'

/**
 * 默认参数
 */
export const defaultToastOptions: ToastOptions = {
  type: 'black',
  title: '',
  icon: 'none',
  image: '',
  duration: 1500,
  zIndex: 1000
}

export function useToast(selector: string = 'toast'): Toast {
  const { proxy } = getCurrentInstance() as any
  const showToast = (option: ToastOptions | string) => {
    const toast = getToast(proxy, selector)
    option = CommonUtil.deepMerge(defaultToastOptions, typeof option === 'string' ? { title: option } : option) as ToastOptions
    if (toast) {
      toast.reset(option)
      toast.show()
    } else {
      console.error('未找到 hd-toast 节点，请确认 selector 是否正确')
    }
  }

  const hideToast = () => {
    const toast = getToast(proxy, selector)
    if (toast) {
      toast.reset(defaultToastOptions)
      toast.hide()
    } else {
      console.error('未找到 hd-toast 节点，请确认 selector 是否正确')
    }
  }
  return {
    showToast,
    hideToast
  }
}

function getToast(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

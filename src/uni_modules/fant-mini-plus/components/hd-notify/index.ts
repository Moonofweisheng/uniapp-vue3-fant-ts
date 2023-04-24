/*
 * @Author: weisheng
 * @Date: 2022-02-23 11:11:53
 * @LastEditTime: 2023-03-23 13:20:08
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-notify\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import { CommonUtil } from '../../index'
import type { Notify, NotifyOptions } from './types'

/**
 * 默认参数
 */
export const defaultNotifyOptions: NotifyOptions = {
  selector: '#hd-notify',
  type: 'error',
  message: '',
  background: '',
  duration: 3000,
  zIndex: 110,
  top: 0,
  color: '#FFFFFF',
  safeAreaInsetTop: false,
  onClick: () => {},
  onOpened: () => {},
  onClose: () => {}
}

export function useNotify(selector: string = 'hd-notify'): Notify {
  const { proxy } = getCurrentInstance() as any
  const showNotify = (option: NotifyOptions | string) => {
    const notify = getNotify(proxy, selector)
    option = CommonUtil.deepMerge(defaultNotifyOptions, typeof option === 'string' ? { message: option } : option) as NotifyOptions
    if (notify) {
      notify.reset(option)
      notify.show()
    } else {
      console.error('未找到 hd-notify 节点，请确认 selector 是否正确')
    }
  }

  return {
    showNotify
  }
}

function getNotify(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

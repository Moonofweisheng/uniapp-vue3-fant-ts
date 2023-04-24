/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-03-21 21:55:28
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-popup\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import { Popup } from './types'

export function usePopup(selector: string = 'popup'): Popup {
  const { proxy } = getCurrentInstance() as any
  const showPopup = () => {
    const popup = getPopup(proxy, selector)
    if (popup) {
      popup.open()
    } else {
      console.error('未找到 hd-popup 节点，请确认 selector 是否正确')
    }
  }

  const closePopup = () => {
    const popup = getPopup(proxy, selector)
    if (popup) {
      popup.close()
    } else {
      console.error('未找到 hd-popup 节点，请确认 selector 是否正确')
    }
  }
  return {
    showPopup,
    closePopup
  }
}

function getPopup(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

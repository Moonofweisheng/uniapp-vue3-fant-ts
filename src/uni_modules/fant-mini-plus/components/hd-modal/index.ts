/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-03-23 13:19:22
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-modal\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import { CommonUtil } from '../../index'
import type { Modal, ModalOptions } from './types'

/**
 * 默认参数
 */
export const defaultModalOptions: ModalOptions = {
  title: '提示',
  content: '',
  showCancel: true,
  cancelText: '取消',
  cancelColor: '#282C34',
  confirmText: '确定',
  confirmColor: '#1C64FD'
}

export function useModal(selector: string = 'hd-modal'): Modal {
  const { proxy } = getCurrentInstance() as any

  const showModal = (option: ModalOptions) => {
    const modal = getModal(proxy, selector)
    option = CommonUtil.deepMerge(defaultModalOptions, option) as ModalOptions
    if (modal) {
      modal.reset(option)
      modal.show()
    } else {
      console.error('未找到 hd-modal 节点，请确认 selector 是否正确')
    }
  }

  return {
    showModal
  }
}

function getModal(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-03-21 21:35:50
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-area\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import { Area } from './types'

export function useArea(selector: string = 'area'): Area {
  const { proxy } = getCurrentInstance() as any
  const showArea = () => {
    const area = getArea(proxy, selector)
    if (area) {
      area.open()
    } else {
      console.error('未找到 hd-area 节点，请确认 selector 是否正确')
    }
  }

  const closeArea = () => {
    const area = getArea(proxy, selector)
    if (area) {
      area.close()
    } else {
      console.error('未找到 hd-area 节点，请确认 selector 是否正确')
    }
  }
  return {
    showArea,
    closeArea
  }
}

function getArea(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-03-21 21:41:00
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-calendar\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import type { Calendar } from './types'

export function useCalendar(selector: string = 'calendar'): Calendar {
  const { proxy } = getCurrentInstance() as any
  const showCalendar = () => {
    const calendar = getCalendar(proxy, selector)
    if (calendar) {
      calendar.open()
    } else {
      console.error('未找到 hd-calendar 节点，请确认 selector 是否正确')
    }
  }

  const closeCalendar = () => {
    const calendar = getCalendar(proxy, selector)
    if (calendar) {
      calendar.close()
    } else {
      console.error('未找到 hd-calendar 节点，请确认 selector 是否正确')
    }
  }

  return {
    showCalendar,
    closeCalendar
  }
}

function getCalendar(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

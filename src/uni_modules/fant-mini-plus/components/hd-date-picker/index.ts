/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-03-21 21:45:00
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-date-picker\index.ts
 * 记得注释
 */
import { getCurrentInstance } from 'vue'
import { CommonUtil } from '../../index'
import type { DatePicker, DatePickerOptions } from './types'

export function useDatePicker(selector: string = 'date-picker'): DatePicker {
  const { proxy } = getCurrentInstance() as any
  const showDatePicker = (option: DatePickerOptions) => {
    const currentYear = new Date().getFullYear() // 当前年份
    const defaultOptions: DatePickerOptions = {
      currentDate: new Date().getTime(), // 初始选择的日期时间，默认当前时间。
      startDate: new Date(currentYear - 10, 0, 1).getTime(), // 最小日期时间。默认:十年前
      endDate: new Date(currentYear + 10, 11, 31).getTime(), // 最大日期时间。默认:十年后
      maxHour: 23, // 可选的最大小时，针对 time 类型
      maxMinute: 59, // 可选的最大分钟，针对 time 类型
      maxSecond: 59, // 可选的最大秒，针对 time 类型
      minHour: 0, // 可选的最小小时，针对 time 类型
      minMinute: 0, // 可选的最小分，针对 time 类型
      minSecond: 0, // 可选的最小秒，针对 time 类型
      type: 'date', // 类型，默认为date
      themeColor: '#6ba1ff' // 主题颜色
    }
    option = CommonUtil.deepMerge(defaultOptions, option) as DatePickerOptions
    if (option.type === 'time') {
      const { maxHour, maxMinute, maxSecond, minHour, minMinute, minSecond } = option
      option.maxHour = Math.max(maxHour!, minHour!)
      option.maxMinute = Math.max(maxMinute!, minMinute!)
      option.maxSecond = Math.max(maxSecond!, minSecond!)
      option.minHour = Math.min(maxHour!, minHour!)
      option.minMinute = Math.min(maxMinute!, minMinute!)
      option.minSecond = Math.min(maxSecond!, minSecond!)
    } else {
      const start = new Date(option.startDate!).getTime()
      const end = new Date(option.endDate!).getTime()
      const now = new Date(option.currentDate!).getTime()
      option.startDate = Math.min(start, end)
      option.endDate = Math.max(start, end)
      option.currentDate = Math.min(Math.max(start, now), end)
    }
    const datePicker = getDatePicker(proxy, selector)
    if (datePicker) {
      datePicker.reset(option)
      datePicker.show()
    } else {
      console.error('未找到 hd-datePicker 节点，请确认 selector 是否正确')
    }
  }

  return {
    showDatePicker
  }
}

function getDatePicker(proxy, selector: string) {
  if (proxy && proxy.$refs && proxy.$refs[selector]) {
    return proxy.$refs[selector]
  } else {
    return null
  }
}

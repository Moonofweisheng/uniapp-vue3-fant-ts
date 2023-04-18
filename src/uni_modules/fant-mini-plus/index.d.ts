import type { App } from 'vue'
export * from './components/hd-toast/index'
export * from './components/hd-notify/index'
export * from './components/hd-loading/index'
export * from './components/hd-modal/index'
export * from './components/hd-date-picker/index'
export * from './components/hd-calendar/index'
export * from './components/hd-popup/index'
export * from './libs/functions/colorExchanghe'
export * from './libs/functions/debounce'
export * from './libs/functions/throttle'
export * from './libs/functions/reg'
export * from './libs/utils/CommonUtil'
declare const _default: {
  install: (Vue: App<any>) => void
}
export default _default

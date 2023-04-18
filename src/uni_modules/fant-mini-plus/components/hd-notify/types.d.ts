export type NotifyType = 'primary' | 'success' | 'error' | 'warning'
export type NotifyOptions = {
  /**
   * 底色类型
   */
  type?: NotifyType
  /**
   * 文字颜色
   */
  color?: string
  /**
   * 层级
   */
  zIndex?: number
  /**
   * 距离顶部长度
   */
  top?: number
  /**
   * 提示的内容
   */
  message: string
  /**
   * 选择器的选择范围，可以传入自定义组件的 this 作为上下文
   */
  context?: any
  /**
   * 展示时长(ms)，值为 0 时，notify 不会消失，默认值3000
   */
  duration?: number
  /**
   * 选择器
   */
  selector?: string
  /**
   * 自定义背景色
   */
  background?: string
  /**
   * 是否留出顶部安全距离（状态栏高度）
   */
  safeAreaInsetTop?: boolean
  /**
   * 点击时的回调函数
   */
  onClick?: () => void
  /**
   * 完全展示后的回调函数
   */
  onOpened?: () => void
  /**
   * 关闭时的回调函数
   */
  onClose?: () => void
}
export interface Notify {
  showNotify(notifyOptions: NotifyOptions | string): void
}

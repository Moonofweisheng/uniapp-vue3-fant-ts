<!--
 * @Author: 刘湘
 * @Date: 2021-05-25 16:34:27
 * @LastEditTime: 2023-03-24 10:36:42
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-toast\hd-toast.vue
 * 记得注释
-->
<template>
  <hd-transition :show="innerData.visible" :customStyle="`z-index:${innerData.zIndex};position:fixed;`" @after-leave="afterLeave">
    <view @click="click" :class="['hd-toast', `hd-toast-${innerData.type}`, `hd-toast--${size}`]" :style="rootStyle">
      <image class="img" v-if="innerData.image" :src="innerData.image"></image>
      <view :class="['icon', `icon-${innerData.icon}`]" v-else-if="iconName">
        <hd-icon :size="size === 'normal' ? '76rpx' : '44rpx'" color="#FFFFFF" :name="iconName"></hd-icon>
      </view>
      <view class="title">
        <mp-html :content="innerData.title" />
      </view>
    </view>
  </hd-transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CommonUtil, defaultToastOptions, RegUtil } from '../../index'
import { ToastOptions } from './types'
interface Props {
  // toast是否展示
  visible?: boolean
  /**
   * toast展示时长(ms)，值为 0 时，toast 不会消失，默认值1500
   */
  duration?: number

  /**
   * toast提示的内容
   */
  title?: string
  /**
   * toast底色类型
   */
  type?: 'white' | 'black'
  /**
   * toast图标
   * - success: 显示成功图标
   * - warning: 显示警告图标
   * - error: 显示错误图标
   * - none: 不显示图标
   */
  icon?: 'success' | 'warning' | 'error' | 'none'
  // toast自定义图片
  image?: string
  // 自定义层级，默认值 1000
  zIndex?: number
}

let props = withDefaults(defineProps<Props>(), {
  visible: false,
  duration: 1500,
  title: '',
  type: 'black',
  icon: 'none',
  image: '',
  zIndex: 1000
})

let innerData = ref<Props>({
  visible: false,
  duration: 1500,
  title: '',
  type: 'black',
  icon: 'none',
  image: '',
  zIndex: 1000
})

const emit = defineEmits(['update:visible', 'click'])

// 监听是否展示
watch(
  () => props.visible,
  (newVal: boolean) => {
    if (newVal) {
      show()
    } else {
      hide()
    }
  }
)

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    padding: innerData.value.image || iconName.value ? `${uni.upx2px(52)}px  ${uni.upx2px(24)}px ` : `${uni.upx2px(32)}px  ${uni.upx2px(24)}px `,
    'z-index': props.zIndex
  }
  return CommonUtil.style(style)
})

/**
 * toast大小
 */
let size = computed(() => {
  if (innerData.value.title && innerData.value.title.length > 8) {
    return 'large'
  } else {
    return 'normal'
  }
})

// 图标名称
let iconName = computed(() => {
  if (innerData.value.icon === 'success') {
    return size.value && size.value === 'large' ? 'ic_toastcheck_fill' : 'ic_tosatcheck_line'
  } else if (innerData.value.icon === 'warning') {
    return size.value && size.value === 'large' ? 'ic_toastwarn_fill' : 'ic_tosatwarn_line'
  } else if (innerData.value.icon === 'error') {
    return size.value && size.value === 'large' ? 'ic_toasterror_fill' : 'ic_tosaterror_line'
  }
  return null
})

// 定时器
let timer = ref<any>(null)

// 打开
function show() {
  timer.value && clearTimeout(timer.value)
  innerData.value.visible = true
  /**
   * 消息展示状态变更时触发
   * @arg value:Boolean 消息展示状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式
   */
  emit('update:visible', true)
  if (innerData.value.duration && innerData.value.duration !== Infinity) {
    timer.value = setTimeout(() => {
      clearTimeout(timer.value)
      hide()
    }, innerData.value.duration)
  }
}

// 关闭
function hide() {
  innerData.value.visible = false
  timer.value && clearTimeout(timer.value)
  emit('update:visible', false)
}

/**
 * 重置toast选项值
 * @param option toast选项值
 */
function reset(option: ToastOptions) {
  if (option) {
    innerData.value = {
      visible: false,
      duration: RegUtil.isDef(option.duration) ? option.duration! : props.duration,
      title: RegUtil.isDef(option.title) ? option.title! : props.title,
      type: RegUtil.isDef(option.type) ? option.type! : props.type,
      icon: RegUtil.isDef(option.icon) ? option.icon! : props.icon,
      image: RegUtil.isDef(option.image) ? option.image! : props.image,
      zIndex: RegUtil.isDef(option.zIndex) ? option.zIndex! : props.zIndex
    }
  }
}

//  被点击
function click() {
  emit('click')
}

// 动画结束
function afterLeave() {
  reset(defaultToastOptions)
}

/**
 * 打开toast选项
 * @param option 选项
 */
function showToast(option: ToastOptions | string) {
  option = CommonUtil.deepMerge(defaultToastOptions, typeof option === 'string' ? { title: option } : option) as ToastOptions
  reset(option)
  show()
}

/**
 * 关闭toast
 */
function hideToast() {
  reset(defaultToastOptions)
  hide()
}

defineExpose({
  reset,
  hide,
  show,
  hideToast,
  showToast
})
</script>

<style lang="scss" scoped>
$types: success, warning, error;

.hd-toast {
  position: fixed;
  z-index: 10001;
  display: inline-block;
  width: 240rpx;
  box-sizing: border-box;
  padding: 52rpx 24rpx;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  border-radius: 16rpx;
  .icon,
  .img {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    height: 76rpx;
    width: 76rpx;
    margin-bottom: 24rpx;
  }
  .title {
    line-height: 36rpx;
    text-align: center;
    font-size: 26rpx;
    max-height: 70vh;
    overflow: auto;
  }

  &--large {
    padding: 40rpx 24rpx;
    width: 420rpx;
    // min-height: 192rpx;
    .icon,
    .img,
    image {
      height: 44rpx;
      width: 44rpx;
      margin-bottom: 32rpx;
    }
  }
  &-black {
    color: $color-white;
    background-color: $color-text-primary;
  }
  &-white {
    color: $color-text-secondary;
    background-color: $color-white;
    border: 1rpx solid #e5e5e5;

    @each $type in $types {
      .icon-#{$type} {
        ::v-deep text {
          color: map-get($var-map, $type) !important;
        }
      }
    }
  }
}
</style>

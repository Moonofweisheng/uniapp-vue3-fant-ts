<!--
 * @Author: weisheng
 * @Date: 2023-04-05 21:32:56
 * @LastEditTime: 2023-04-07 17:33:29
 * @LastEditors: weisheng
 * @Description: 水印
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-water-mark\hd-water-mark.vue
 * 记得注释
-->
<template>
  <view :class="rootClass" :style="rootStyle">
    <canvas
      v-if="!canvasOffScreenable && showCanvas"
      type="2d"
      :style="{ height: canvasHeight + 'px', width: canvasWidth + 'px', visibility: 'hidden' }"
      :canvas-id="canvasId"
      :id="canvasId"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { CommonUtil } from '../..'
/**
 * WaterMark 水印
 */
interface Props {
  // 显示内容
  content: string
  // X轴间距，单位px
  gutterX?: number
  // Y轴间距，单位px
  gutterY?: number
  // canvas画布宽度，单位px
  width?: number
  // canvas画布高度，单位px
  height?: number
  // 是否为全屏水印
  fullScreen?: boolean
  // 水印字体颜色
  color?: string
  // 水印字体大小，单位px
  size?: number
  // 水印字体样式（仅微信和h5支持），可能的值：normal、italic、oblique
  fontStyle: string
  // 水印字体的粗细（仅微信和h5支持）
  fontWeight: number | string
  // 水印字体系列（仅微信和h5支持）
  fontFamily: string
  // 水印旋转角度
  rotate?: number
  // 自定义层级
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  // 显示内容
  content: '我们来测一下测试信息测试内容',
  // X轴间距
  gutterX: 24,
  // Y轴间距
  gutterY: 48,
  // canvas画布宽度，单位px
  width: 120,
  // canvas画布高度，单位px
  height: 64,
  // 是否为全屏水印
  fullScreen: true,
  // 水印字体颜色
  color: '#1a1a1a',
  // 水印字体大小
  size: 14,
  // 水印字体样式，可能的值：normal、italic、oblique
  fontStyle: 'normal',
  // 水印字体的粗细
  fontWeight: 'normal',
  // 水印字体系列
  fontFamily: 'PingFang SC',
  // 水印旋转角度
  rotate: -25,
  // 自定义层级
  zIndex: 1100
})

const canvasId = ref<string>(`water${CommonUtil.s4()}`) // canvas 组件的唯一标识符
const waterMarkUrl = ref<string>('') // canvas生成base64水印
const canvasOffScreenable = ref<boolean>(uni.canIUse('createOffscreenCanvas') && Boolean(uni.createOffscreenCanvas)) // 是否可以使用离屏canvas
const pixelRatio = ref<number>(uni.getSystemInfoSync().pixelRatio) // 像素比
const canvasHeight = ref<number>((props.height + props.gutterY) * pixelRatio.value) // canvas画布高度
const canvasWidth = ref<number>((props.width + props.gutterX) * pixelRatio.value) // canvas画布宽度
const showCanvas = ref<boolean>(true) // 是否展示canvas

/**
 * 水印css类
 */
const rootClass = computed(() => {
  let classess: string = 'hd-water-mark'
  if (props.fullScreen) {
    classess = `${classess} hd-water-mark-full-screen`
  }
  return classess
})

/**
 * 水印样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string> = {
    backgroundImage: `url('${waterMarkUrl.value}')`,
    backgroundSize: CommonUtil.addUnit(props.width + props.gutterX, 'px')
  }
  return CommonUtil.style(style)
})

onMounted(() => {
  // #ifdef H5
  // h5使用document.createElement创建canvas，不用展示canvas标签
  showCanvas.value = false
  // #endif
  const { width, height, color, size, fontStyle, fontWeight, fontFamily, content, rotate, gutterX, gutterY } = props
  // 创建水印
  createWaterMark(width, height, color, size, fontStyle, fontWeight, fontFamily, content, rotate, gutterX, gutterY)
})

/**
 * 创建水印图片
 * @param width canvas宽度
 * @param height canvas高度
 * @param color canvas字体颜色
 * @param size canvas字体大小
 * @param fontStyle canvas字体样式
 * @param fontWeight canvas字体字重
 * @param fontFamily canvas字体系列
 * @param content canvas内容
 * @param rotate 倾斜角度
 * @param gutterX X轴间距
 * @param gutterY Y轴间距
 */
function createWaterMark(
  width: number,
  height: number,
  color: string,
  size: number,
  fontStyle: string,
  fontWeight: number | string,
  fontFamily: string,
  content: string,
  rotate: number,
  gutterX: number,
  gutterY: number
) {
  const pixelRatio = uni.getSystemInfoSync().pixelRatio
  const canvasHeight = (height + gutterY) * pixelRatio
  const canvasWidth = (width + gutterX) * pixelRatio
  const contentWidth = width * pixelRatio
  const contentHeight = height * pixelRatio
  const fontSize = size * pixelRatio
  // #ifndef H5
  if (canvasOffScreenable.value) {
    createOffscreenCanvas(canvasHeight, canvasWidth, contentWidth, contentHeight, rotate, fontSize, fontFamily, fontStyle, fontWeight, color, content)
  } else {
    createCanvas(contentWidth, rotate, fontSize, color, content)
  }
  // #endif
  // #ifdef H5
  createCanvasH5(canvasHeight, canvasWidth, contentWidth, contentHeight, rotate, fontSize, fontFamily, fontStyle, fontWeight, color, content)
  // #endif
}

/**
 * 创建离屏canvas
 * @param canvasHeight canvas高度
 * @param canvasWidth canvas宽度
 * @param contentWidth 内容宽度
 * @param contentHeight 内容高度
 * @param rotate 内容倾斜角度
 * @param fontSize 字体大小
 * @param fontFamily 字体系列
 * @param fontStyle 字体样式
 * @param fontWeight 字体字重
 * @param color 字体颜色
 * @param content 内容
 */
function createOffscreenCanvas(
  canvasHeight: number,
  canvasWidth: number,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  content: string
) {
  // 创建离屏canvas
  const canvas: any = uni.createOffscreenCanvas({ height: canvasHeight, width: canvasWidth, type: '2d' })
  const ctx: any = canvas.getContext('2d')
  if (ctx) {
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.translate(contentWidth / 2, contentWidth / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))
    ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${contentHeight}px ${fontFamily}`
    ctx.fillStyle = color
    ctx.fillText(content, 0, 0)
    ctx.restore()
    waterMarkUrl.value = canvas.toDataURL()
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

/**
 * 非H5创建canvas
 * 不支持创建离屏canvas时调用
 * @param contentWidth 内容宽度
 * @param rotate 内容倾斜角度
 * @param fontSize 字体大小
 * @param fontFamily 字体系列
 * @param fontStyle 字体样式
 * @param fontWeight 字体字重
 * @param color 字体颜色
 * @param content 内容
 */
function createCanvas(contentWidth: number, rotate: number, fontSize: number, color: string, content: string) {
  const ctx = uni.createCanvasContext(canvasId.value)
  if (ctx) {
    ctx.setTextBaseline('middle')
    ctx.setTextAlign('center')
    ctx.translate(contentWidth / 2, contentWidth / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))
    ctx.setFillStyle(color)
    ctx.setFontSize(fontSize)
    ctx.fillText(content, 0, 0)
    ctx.restore()
    ctx.draw()
    // #ifdef MP-DINGTALK
    ;(ctx as any).toTempFilePath({
      success(res) {
        showCanvas.value = false
        waterMarkUrl.value = res.filePath
      }
    })
    // #endif
    // #ifndef MP-DINGTALK
    uni.canvasToTempFilePath({
      canvasId: canvasId.value,
      success: (res) => {
        showCanvas.value = false
        waterMarkUrl.value = res.tempFilePath
      }
    })
    // #endif
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

/**
 * h5创建canvas
 * @param canvasHeight canvas高度
 * @param canvasWidth canvas宽度
 * @param contentWidth 内容宽度
 * @param contentHeight 内容高度
 * @param rotate 内容倾斜角度
 * @param fontSize 字体大小
 * @param fontFamily 字体系列
 * @param fontStyle 字体样式
 * @param fontWeight 字体字重
 * @param color 字体颜色
 * @param content 内容
 */
function createCanvasH5(
  canvasHeight: number,
  canvasWidth: number,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  content: string
) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.setAttribute('width', `${canvasWidth}px`)
  canvas.setAttribute('height', `${canvasHeight}px`)
  if (ctx) {
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.translate(contentWidth / 2, contentWidth / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))
    ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${contentHeight}px ${fontFamily}`
    ctx.fillStyle = color
    ctx.fillText(content, 0, 0)
    ctx.restore()
    waterMarkUrl.value = canvas.toDataURL()
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}
</script>

<style lang="scss" scoped>
.hd-water-mark {
  position: absolute;
  opacity: 0.1;
  z-index: 1010;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background-repeat: repeat;
  &-full-screen {
    position: fixed;
  }
}
</style>

<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-04-18 21:00:50
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \uniapp-vue3-fant-ts\src\pages\home\Home.vue
 * 记得注释
-->
<template>
  <hd-loading ref="loading"></hd-loading>
  <hd-toast ref="toast"></hd-toast>
  <view class="home">
    <hd-toast ref="toast"></hd-toast>
    <view class="header">
      <hd-swiper :swiperList="swiperList" card :vertical="false" previousMargin="50rpx" nextMargin="50rpx"></hd-swiper>
    </view>
    <view class="main">
      <hd-grid :column-num="4">
        <hd-grid-item use-slot v-for="(value, index) in chanel" :key="index">
          <image class="main-img" :src="value.image" />
          <text class="main-txt">{{ value.txt }}</text>
        </hd-grid-item>
      </hd-grid>
    </view>
  </view>
</template>

<script lang="ts" setup>
import DemoApi from '@/api/DemoApi'
import Chanel from '@/model/Chanel'
import { Loading } from '@/uni_modules/fant-mini-plus/components/hd-loading/types'
import { Toast } from '@/uni_modules/fant-mini-plus/components/hd-toast/types'
import { onMounted, ref } from 'vue'
const loading = ref<Loading>() // loading ref
const toast = ref<Toast>() // toast ref
const swiperList = ref([
  {
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  }
])

const chanel = ref<Chanel[]>([])
const rate = ref<number>(20)

onMounted(() => {
  loading.value?.showLoading({})
  DemoApi.init()
    .then((resp) => {
      loading.value?.hideLoading()
      chanel.value = resp.data || []
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
  padding: 0 24rpx 24rpx;
  .header {
    margin-bottom: 24rpx;
  }
  .main {
    &-img {
      width: 64rpx;
      height: 64rpx;
      margin-bottom: 24rpx;
    }
    &-txt {
      font-size: 20rpx;
      color: #646566;
    }
  }
}
</style>

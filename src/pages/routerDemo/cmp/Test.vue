<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-04-27 15:50:09
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \uniapp-vue3-fant-ts\src\pages\routerDemo\cmp\Test.vue
 * 记得注释
-->
<template>
  <view>当前路由信息</view>
  <view>{{ route }}</view>
</template>

<script lang="ts" setup>
import { useRoute } from 'uni-mini-router'
const route = useRoute()
</script>

<style lang="scss" scoped></style>

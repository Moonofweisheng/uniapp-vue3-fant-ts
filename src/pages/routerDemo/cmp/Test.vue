<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-05-10 09:52:41
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
const route = useRoute()
</script>

<style lang="scss" scoped></style>

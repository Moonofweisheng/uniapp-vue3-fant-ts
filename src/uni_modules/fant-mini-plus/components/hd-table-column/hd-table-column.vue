<!--
 * @Author: 徐庆凯
 * @Date: 2020-10-31 11:27:05
 * @LastEditTime: 2023-03-24 11:12:07
 * @LastEditors: 徐庆凯
 * @Description: 表格列
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-table-column\hd-table-column.vue
 * @symbol_custom_string_obkoro1: 记得注释
-->
<template>
  <block class="hd-table-column"></block>
</template>

<script lang="ts" setup>
import { inject, nextTick, onMounted } from 'vue'

interface Props {
  // 列对应字段
  prop: string
  // 列对应字段标题
  label: string
  // 列宽度
  width: string
  // 列是否固定，固定左或者右 取值  true, left, right
  fixed?: string | boolean
  // 是否开启列排序
  sortable?: boolean
  // 是否高亮
  lightHigh?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fixed: false, // 列是否固定，固定左或者右 取值  true, left, right
  sortable: false, // 是否开启列排序
  lightHigh: false // 是否高亮
})

// eslint-disable-next-line @typescript-eslint/ban-types
let setColumns: Function = inject('setColumns') as Function

onMounted(() => {
  setColumns(
    {
      prop: props.prop,
      label: props.label,
      width: props.width,
      fixed: props.fixed,
      sortable: props.sortable,
      sortDirection: '',
      lightHigh: props.lightHigh
    } // sortDirection代表排序的方向
  )
})
</script>

<style lang="scss" scoped></style>

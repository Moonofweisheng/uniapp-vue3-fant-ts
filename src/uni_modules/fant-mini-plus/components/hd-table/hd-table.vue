<template>
  <view class="hd-table" :style="{ height: height }">
    <slot></slot>
    <scroll-view class="hd-table-header" :scroll-left="left" @scroll="scroll" scroll-x="true" :key="mainKey">
      <view
        class="header-column"
        :style="{ width: column.width || '220rpx' }"
        :class="[column.fixed ? 'fixed-column' : 'relative-column']"
        v-for="(column, index) in columns"
        :key="index"
        @click="column.sortable && doSort(column, index)"
      >
        <view class="header-row" :style="{ width: column.width || '220rpx' }">
          <text>{{ column.label }}</text>
          <view class="sort" v-if="column.sortable">
            <view :class="{ 'sort-up': true, 'sort--active': column.sortDirection === 'asc' }"></view>
            <view :class="{ 'sort-down': true, 'sort--active': column.sortDirection === 'desc' }"></view>
          </view>
        </view>
      </view>
    </scroll-view>
    <scroll-view
      :key="mainKey"
      :class="{ 'hd-table-body': true, 'hd-table-body--stripe': stripe }"
      :scroll-left="left"
      scroll-x="true"
      enable-flex="true"
      @scroll="scroll"
    >
      <!-- #ifndef MP-ALIPAY -->
      <view style="display: flex">
        <!-- #endif -->
        <view
          v-for="(data, i) in table"
          :key="i"
          :class="[data.fixed ? 'fixed-column' : 'relative-column', 'body-column']"
          :style="{ width: data.width || '220rpx' }"
        >
          <view class="body-row" v-for="(row, j) in data.rows" :key="j" :style="{ width: data.width || '220rpx' }">
            <text>{{ row }}</text>
          </view>
        </view>
        <!-- #ifndef MP-ALIPAY -->
      </view>
      <!-- #endif -->
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { CommonUtil, debounce } from '../..'

/**
 * Table 表格
 */

interface Props {
  // table数据源
  dataSource: Array<any>
  // table行是否为斑马纹
  stripe: boolean
  // table高度
  height: string
}

const props = withDefaults(defineProps<Props>(), {
  // table数据源
  dataSource: () => [],
  // table行是否为斑马纹
  stripe: false,
  // table高度
  height: '80vh'
})

/**
 * 根节点样式
 */
// const rootStyle = computed(() => {
//   const style: Record<string, string | number> = {
//     top: CommonUtil.addUnit(CommonUtil.getPx(props.stickyTop), 'px')
//   }
//   return CommonUtil.style(style)
// })

// 表格数据
const table = computed(() => {
  const table: Record<string, any>[] = []
  for (let i = 0; i < columns.value.length; i++) {
    const rows: string[] = []
    for (let j = 0; j < props.dataSource.length; j++) {
      // eslint-disable-next-line no-prototype-builtins
      if (props.dataSource[j].hasOwnProperty(columns.value[i].prop)) {
        rows.push(props.dataSource[j][columns.value[i].prop])
      } else {
        rows.push('--')
      }
    }
    table.push({ ...columns.value[i], rows: rows })
  }
  return table
})

const left = ref<number>(0)
const columns = ref<Array<Record<string, any>>>([]) // 数据列
provide('$columns', columns)
const scroll = debounce(doScroll, 100, false) // 滚动事件

const headerKey = ref<string>(CommonUtil.s4())
const mainKey = ref<string>(CommonUtil.s4())

const emit = defineEmits(['click', 'sort-method'])

/**
 * 设置列
 * @param column 列
 */
function setColumns(column: Record<string, any>) {
  columns.value = CommonUtil.deepClone([...columns.value, column])
  headerKey.value = CommonUtil.s4()
  mainKey.value = CommonUtil.s4()
}

provide('setColumns', setColumns)

/**
 * 排序事件
 */
function doSort(column, index) {
  if (column.sortDirection === 'asc') {
    columns.value[index].sortDirection = 'desc'
  } else if (columns.value[index].sortDirection === 'desc') {
    columns.value[index].sortDirection = 'asc'
  } else {
    columns.value[index].sortDirection = 'asc'
  }
  emit('sort-method', columns.value[index])
}
/**
 * 滚动事件
 */
function doScroll(event) {
  left.value = event.detail.scrollLeft
}

/**
 *行点击事件
 */
function doSelected(i) {
  emit('click', i)
}
</script>
<style lang="scss" scoped>
@import '../../libs/css/index.scss';
.hd-table {
  width: 100%;
  height: 80vh;
  overflow: auto;
  background: #ffffff;
  &-header {
    position: sticky;
    z-index: 6;
    top: 0;
    width: 750rpx;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    .header-column {
      display: inline-block;
    }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80rpx;
      width: 220rpx;
      font-size: 24rpx;
      line-height: 26rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: $color-text-fourth;
      background: #f1f5ff;
      text {
        padding: 0 12rpx;
      }
    }
    .sort {
      position: relative;
      margin-left: 4rpx;
      height: 100%;
      width: 8rpx;
      transform: scale(0.7);
      .sort-up {
        position: absolute;
        left: 0;
        bottom: 50%;
        width: 0px;
        height: 0px;
        border-width: 10rpx 10rpx 12rpx;
        border-style: solid;
        border-color: transparent transparent #8c8fa5;
        border-image: initial;
        transform: translateY(-2rpx);
      }
      .sort-down {
        position: absolute;
        top: 50%;
        left: 0;
        width: 0px;
        height: 0px;
        border-width: 10rpx 10rpx 12rpx;
        border-style: solid;
        border-color: transparent transparent #8c8fa5;
        border-image: initial;
        transform: rotate(180deg) translateY(-2rpx);
      }
      .sort--active {
        border-color: transparent transparent $color-primary;
      }
    }
  }

  &-body {
    // #ifndef MP-WEIXIN
    display: flex;
    // #endif
    overflow-x: auto;
    white-space: nowrap !important;
    width: 100%;
    .body-column {
      display: inline-block;
    }
    .body-row {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100rpx;
      width: 220rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      background: #ffffff;
      color: $color-text-fourth;
      text {
        width: 100%;
        padding: 0 12rpx;
        text-align: center;
        @include ellipsis(2);
      }
    }
  }
  &-body--stripe {
    .body-row:nth-child(2n + 2) {
      background: #f5f9ff;
    }
  }

  .relative-column {
    position: relative;
    z-index: 1;
  }

  .fixed-column {
    // #ifndef MP-WEIXIN
    position: sticky;
    z-index: 3;
    left: 0;
    &::after {
      content: ' ';
      position: absolute;
      height: 100%;
      right: -30rpx;
      top: 0;
      width: 30rpx;
      height: 100%;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.04) 100%);
    }
    // #endif
  }
}

scroll-view::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  border-radius: 0;
  background-color: transparent;
  color: transparent;
}
</style>

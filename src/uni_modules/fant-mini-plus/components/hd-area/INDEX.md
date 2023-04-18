## 代码演示

### 基础用法

下面演示了省市区选择组件的用法，省市区选择完成后会触发 `confirm` 事件,返回值为省市区三项的数组。

首先安装vant提供的省市区数据源  
```yarn add @vant/area-data```

```html
  <hd-area ref="area" :area-data="areaData" :area="areaSelect" @confirm="doConfirm"></hd-area>
```

```ts
<script lang="ts" setup>
import { Area } from '@/uni_modules/fant-mini-plus/components/hd-area/types'
import { areaList } from '@vant/area-data'
import { ref } from 'vue'

const areaData = ref(areaList) // 位置信息数据
const areaSelect = ref<Ucn[]>([]) // 已选省市区
const area = ref<Area>() // ref


function onClick() {
  area.value?.showArea()
}

/**
 * 省市区选择成功
 * @param select 选择的省市区
 */
function doConfirm(select: Ucn[]) {
  areaSelect.value = select
}
</script>

```

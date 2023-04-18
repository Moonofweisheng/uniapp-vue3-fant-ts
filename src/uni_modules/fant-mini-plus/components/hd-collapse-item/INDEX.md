
## 代码演示

### 基础用法

通过`v-model`控制展开的面板列表，`activeNames`为数组格式。

```html
<hd-collapse v-model="activeNames">
  <hd-collapse-item title="标题1" name="1" index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" name="2" index="2">内容</hd-collapse-item>
  <hd-collapse-item title="标题3" name="3" index="3">内容</hd-collapse-item>
</hd-collapse>
```

```ts
const activeNames = ref<string | string[]>([])
```

### 手风琴
通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式。

```html
<hd-collapse accordion v-model="activeNames">
  <hd-collapse-item title="标题1" name="1" index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" name="2" index="2">内容</hd-collapse-item>
  <hd-collapse-item title="标题3" name="3" index="3">内容</hd-collapse-item>
</hd-collapse>

```

```ts
const activeNames = ref<string | string[]>('1')
```

### 禁用状态

通过 `disabled` 属性来禁用单个面板。

```html
<hd-collapse accordion>
  <hd-collapse-item title="标题1" index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" index="2" disabled>内容</hd-collapse-item>
  <hd-collapse-item title="标题3" index="3" disabled>内容</hd-collapse-item>
</hd-collapse>
```



## 代码演示

### 基础用法

通过`dataSource`设置表格数据。

```html
<hd-table :dataSource="dataList">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```

```ts
const dataList = ref<Record<string,string>> ([
        {
          name: '赵云',
          school: '武汉市阳逻妇幼保健学院',
          major: '计算机科学与技术专业'
        },
        {
          name: '孔明',
          school: '武汉市阳逻卧龙学院',
          major: '计算机科学与技术专业'
        }
        {
          name: '刘备',
          school: '武汉市阳逻编织学院',
          major: '计算机科学与技术专业'
        }
      ])
```

### 斑马纹

通过`stripe`设置表格是否展示斑马纹，默认`false`(不展示)。

```html
<hd-table :dataSource="dataList" :stripe="true">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```


### 表格高度

通过`height`设置表格高度，默认为`80vh`。

```html
<hd-table :dataSource="dataList" height="90vh">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```

### 排序事件

当存在列参与排序时，点击会触发`sort-method`排序事件。

```html
<hd-table :dataSource="dataList" @sort-method="doSort">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所" :sortable="true"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```

```ts
function doSort(e) {
  console.log('这里是排序事件')
}
```


## 代码演示

### 手风琴基础用法

需要配合[CollapseItem](hd-collapse-item.html)使用，通过 `accordion` 可以设置为手风琴模式，最多展开一个面板, 默认为`true`。

```html
<hd-collapse accordion>
  <hd-collapse-item title="标题1" name="1" index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" name="2" index="2">内容</hd-collapse-item>
  <hd-collapse-item title="标题3" name="3" index="3">内容</hd-collapse-item>
</hd-collapse>
``


```js
export default {
  data() {
    return {
      activeNames: ['1'],
    };
  },
};
```

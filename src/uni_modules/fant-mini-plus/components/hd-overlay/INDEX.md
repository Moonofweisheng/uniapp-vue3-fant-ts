
## 代码演示

### 基础用法

```HTML
<hd-button type="primary" @click="onClickShow">显示遮罩层</hd-button>
<hd-overlay :show="show" @click="onClickHide" />
```

```ts

const show = ref<boolean>(false)

function onClickShow() {
  show.value = true
}
function onClickHide() {
  show.value = false
}
```

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容。

```html
<hd-button type="primary" @click="onClickShow">嵌入内容</hd-button>
<hd-overlay :show="show" @click="onClickHide">
  <view class="wrapper">
    <div class="block" />
  </view>
</hd-overlay>
```

```ts

const show = ref<boolean>(false)

function onClickShow() {
  show.value = true
}
function onClickHide() {
  show.value = false
}
```

```css
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
```

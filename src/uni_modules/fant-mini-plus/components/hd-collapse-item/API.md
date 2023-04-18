# hd-collapse-item

CollapseItem 折叠面板子项

## Props

<!-- @vuese:hd-collapse-item:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|标题栏左侧内容|`String`|`false`|-|
|value|标题栏右侧内容|`String`|`false`|-|
|label|标题栏描述信息|`String`|`false`|-|
|border|是否显示内边框|`Boolean`|`false`|默认值是：`false`|
|isLink|是否展示标题栏右侧箭头并开启点击反馈|`Boolean`|`false`|默认值是：`false`|
|clickable|是否开启点击反馈|`Boolean`|`false`|默认值是：`false`|
|disabled|是否禁用面板|`Boolean`|`false`|默认值是：`false`|
|icon|标题栏左侧图标名称或图片链接，可选值见 Icon 组件|`String`|`false`|-|
|name|唯一标识符|`Number` /  `String`|`false`|-|
|index|标识当前为第几个|`String` /  `Number`|`false`|-|

<!-- @vuese:hd-collapse-item:props:end -->



## Slots

<!-- @vuese:hd-collapse-item:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|面板展开时显示的内容|-|

<!-- @vuese:hd-collapse-item:slots:end -->

# Selection (选择器)

## Basic Usage (基本使用)
<demo src="../examples/selection/basic.vue"/>

## Use Slots (使用插槽)
<demo src="../examples/selection/slots.vue"/>

## Selection Props (参数)
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model-value | `any` | `undefined` | 绑定值 |
| active-event | `ActiveEvent` | `click` | 触发选中的事件 |
| item-class | `ClassType` | "" | 元素的类名 |
| active-class | `ClassType` | "" | 被选中元素的类名 |
| unactive-class | `ClassType` | "" | 未被选中元素的类名 |
| disabled-class | `ClassType` | "" | 被禁用元素的类名 |
| multiple | `boolean` | `false` | 是否多选 |
| clearable | `boolean` | `false` | 是否可以不选择任何元素 |

## Selection Events (事件)

| Name | Description |
| --- | --- |
| update:model-value | 绑定值变化时触发 |
| change | 选中的元素发生变化时触发 |


## Item Props (参数)
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `any` | `undefined` | 元素对应的值 |
| active-event | `ActiveEvent` | `click` | 触发选中的事件 |
| disabled | `boolean` | `false` | 是否禁用 |



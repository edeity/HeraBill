# Todo

包含ToDo常规操作的组件

- 已完成
  - 移动：拖拽、上移、下移、置顶
  - 操作：增加、插入、清空、删除
  - 存储：本地存储（powered by ：[localforage](https://github.com/localForage/localForage)）
- 待完成
  - 其他：标记

## 属性一览

| 属性           | 说明                                       | 默认值   | 类型      |
| ------------ | ---------------------------------------- | ----- | ------- |
| isDrag       | 是否允许拖拽，只有两个Todo均为true时，才可以从一个Todo从拖拽到另一个Todo中 | false | boolean |
| isStore      | 是否启用本地存储                                 | false | boolean |
| storeKey     | 存储的标示符                                     | null  | string  |
| defaultValue | 初始值                                      | []    | array   |



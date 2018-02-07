# MDDoc

渲染Markdown的组件；

## Powered By

 - [highlight.js](https://github.com/isagalaev/highlight.js)
 - [marked](https://github.com/chjj/marked)
 - [github.css](https://github.com/sindresorhus/github-markdown-css)


## 例子

本身即是例子！

```jsx
<MDDoc isToc docUrl="/md/MDDoc.md"/>
```

## 属性一览

| 属性     | 说明                             | 默认值   | 类型      |
| ------ | ------------------------------ | ----- | ------- |
| isToc  | 是否显示侧边栏                        | false | boolean |
| docUrl | md文件url路径，MDDoc会在请求后，渲染返回结果    | null  | string  |
| docStr | 假如不需要请求Md文件，则直接将需要渲染的字符串作为参数传入 | null  | string  |
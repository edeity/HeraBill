# 简介

通过基本的**竖式计算**，以代替Js浮点型缺陷的工具类

```javascript
let a1 = new BigNumber("0.1");
let b1 = new BigNumber("0.2");
a1.add(b1).toString(); // "0.3"

// other use

// ((0.1 + 0.2 - 0.2) * 0.2) / 0.2
a1.add(b1).minus(b1).multiply(b1).divide(b1).toString(); // 0.1
```
# BigNumber

通过基本的**竖式计算**，以代替Js浮点型缺陷的工具类

```javascript
let a1 = new BigNumber("0.1");
let b1 = new BigNumber("0.2");
a1.add(b1).toString(); // "0.3"

// other use

// ((0.1 + 0.2 - 0.2) * 0.2) / 0.2
a1.add(b1).minus(b1).multiply(b1).divide(b1).toString(); // 0.1
```

## 基本API

- add : 加
- minus : 减
- multiply : 乘
- divide : 除
- toString : 输出结果

## 其他API

- getValue, setValue : 值
- getIntValue, setIntValue : 整数值
- getFloatValue, setFloatValue : 浮点值
- isPositive, setPositive : 是否正数
- times : 扩大
- isBigger : 比较大小
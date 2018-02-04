# BigTable

代替一般`table`渲染（用以解决渲染数据量过多而导致前端卡顿的情况）

假如需要复杂的交互，推荐使用[handsontable.js](https://handsontable.com)

```javascript
function getTestData(row, col) {
    let data = [];
    let dataRow= row; //
    let dataCol= col; // 列
    for(let i=0; i<dataRow; i++) {
        let tempArray = [];
        data.push(tempArray);
        for(let j=0; j<dataCol; j++) {
            let tempData = { data: i + ',' + j};
            tempArray.push(tempData);
        }
    }
    return data;
};

// ...

<BigTable data={getTestData(100, 100)}/>
```
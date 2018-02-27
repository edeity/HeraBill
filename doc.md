## 什么是单据模板

单据：基本形式为表单，用于描述一般业务凭证的结构。基本单据由列表态和卡片态组成，一般单据包含以下功能：表头及多表体关联的CRDU、查询模板、以及其他通用功能：打印模板，上下游单据数据关联等。

单据模板：通过`模板模式`设计模式，基于`描述字段`，快速生成单据的方法。

故`HeraBill`旨在构造通过描述字段，快速生成通用单据的React组件。

## 基本用法

参见`Post.js`（即`职位`页签内容），该代码实现了一个字段的增删改查

```javascript
const PK = 'pk';
// 实例:用户单据
const Post = () => {

    // 单据标志
    const tableId = "post";
    // 基本描述
    const headMeta = {
        name: { type: 'str', desc: '职位名称'}
    };

    function onQuery(queryCondition, callback) {
        Consistence.query(tableId, queryCondition).then((res) => { callback(res);});
    };

    function onSave(data, callback) {
        Consistence.onSave(tableId, data).then((res) => { callback(res);});
    }

    function onDelete(data, callback) {
        var delPks = [];
        data.forEach((eachRow) => {  delPks.push(eachRow[PK]);});
        Consistence.onDelete(tableId, delPks).then((res) => { callback(res);});
    }

    return (
        <Bill tableId={tableId}
              headMeta={headMeta}
              onQuery={onQuery}
              onDelete={onDelete}
              onSave={onSave}/>
    )
};

export default Post;
```

核心概念是：

- Bill：集成组件，用以渲染`Meta`描述信息
- Meta：用于描述`Bill`中每个字段的类型和行为

## API

### Bill

| 参数               | 说明                        | 类型                                 | 默认值   |
| ---------------- | ------------------------- | ---------------------------------- | ----- |
| tableId          | 对应的表名                     | string                             | null  |
| headMeta         | 表头meta集合                  | object                             | null  |
| bodyMeta         | 表体meta集合                  | object                             | null  |
| onQuery          | componentDidMount或点击查询时触发 | Function(queryCondition, callback) |       |
| onDelete         | 点击删除时触发                   | Function(data, callback)           |       |
| onSave           | 点击保存时触发                   | Function(data, callback)           |       |
| isQueryWhenMount | 是否在加载时理科进行查询              | boolean                            | false |
| isMatchWhenBlur  | 是否离开任意meta时校验该meta        | boolean                            | false |

### Meta

Meta是用来描述一个字段的详细信息，描述一个基本字段，一般将包括

- 基本
  - 值（含类型）
- 其他属性
  - 可编辑性
  - 合法性和相关提示
- 高级属性
  - 各种公式：显示公式/编辑公式等

#### 基本信息

| 基本字段     | 说明    | 字段类型    | 默认值  |
| -------- | ----- | ------- | ---- |
| type     | 基本类型  | String  | str  |
| desc     | 显示名称  | String  | ''   |
| editable | 是否可编辑 | Boolean | true |

#### 预置种类（type）

组件预置了一些常用的字段描述

| 预置种类 | 说明   |
| ---- | ---- |
| date | 日期   |
| time | 钟点   |
| num  | 数字   |
| mail | 邮件   |
| str  | 字符   |
| ref  | 参照   |

#### 自定义

此处应有接口

#### 其他描述

| 组        | 组员              | 说明           | 字段类型                 | 默认值   |
| -------- | --------------- | ------------ | -------------------- | ----- |
| validate |                 | 校验组          |                      |       |
|          | minLength       | 最小长度         | int                  | 0     |
|          | maxLength       | 最大长度         | int                  | 50    |
|          | required        | 是否必输         | boolean              | true  |
|          | matchReg        | 匹配正则规则       | RegExp               | null  |
|          | matchFun        | 离开焦点或保存时执行校验 | Function(fieldValue) | null  |
|          | matchTips       | 不匹配的提示       | string               | null  |
|          | isMatchWhenBlur | 是否离开焦点后立即校验  | boolean              | false |

### 参照

参照作为增强型`<Select>`组件，在企业级基本应用，关联档案中发挥着重要的作用；

其目的是让用户快速选择档案或其他单据的内容，保证各单据的引用值唯一，避免录入误操作等

参照相对于其他meta而言，是复杂的组件，应提供更详细的生命周期，在此单独说明

__正在开发中，该API仅依据之前项目需求，未来可能变动频繁....__

#### 基本属性

| 组     | 属性                   | 说明         | 字段类型   | 默认值     | 可选值                            |
| ----- | -------------------- | ---------- | ------ | ------- | ------------------------------ |
| 基本属性  |                      |            |        |         |                                |
|       | type                 | 参照渲染的类型    | string | 'table' | ['table', 'tree', 'treeTable'] |
|       | tableId              | 指向的tableId |        |         |                                |
|       | url                  | 额外的请求网址    |        |         |                                |
|       | postData             | 请求时提交的数据   |        |         |                                |
| event |                      |            |        |         |                                |
|       | beforeClick          | 点击详情按钮前    |        |         |                                |
|       | afterClick           | 点击详情按钮后    |        |         |                                |
|       | afterAjax            | 请求数据完毕后    |        |         |                                |
|       | beforeSelect         | 选择前        |        |         |                                |
|       | beforeMultiTransform |            |        |         |                                |
|       | afterSelect          | 选择后        |        |         |                                |
|       | ensure               | 点击确定       |        |         |                                |
|       | cancel               | 点击取消       |        |         |                                |
| view  |                      |            |        |         |                                |
|       | isShowLineNumber     | 是否显示行号     |        |         |                                |
|       | isCascade            | 是否级联       |        |         |                                |
|       | isCheckAllNodes      | 是否全选       |        |         |       | |

## 例子

参见`User.js`（即`个人信息`内容），该代码实现了关于用户的基本信息的增删改查：

```javascript
import React from 'react';
import Bill from '../Bill/Bill';

import Consistence from '../Tools/Consistence';
import CommonRegex from '../Tools/CommonRegex';
import CommonFun from '../Tools/CommonFun';

const PK = 'pk';
// 实例:用户单据
const User = () => {

    // 单据标志
    const tableId = "user";
    // 基本描述
    const headMeta = {
        name: {
            type: 'str',
            desc: '姓名',
            validate: {
                matchReg: '',
                matchFun: '',
                matchTips: '',
                minLen: 10,
                maxLen: 20,
                required: true,
            },
        },
        phone: {
            type: 'str',
            desc: '联系电话',
            validate: {
                matchReg: CommonRegex.phone,
                required: true
            }
        },
        mail: {type: 'mail', desc: '邮箱地址',
            validate: {
                matchReg: CommonRegex.mail,
                required: true
        }},
        age: {type: 'num', desc: '年龄',
            validate: {
                matchFun: CommonFun.isPositive,
                matchTips: '年龄必须大于0'
            } },
        syncAge: { type: 'num', desc: '年龄 - 6', editable: false, validate: {required: false}}
    };
    // 表体描述
    const bodyMeta = {
        post: {type: 'refer', desc: '职位', refer: {
            tableId: 'post',
            field: 'pk',
            renderField: 'name'
        }},
        date: {type: 'date', desc: '担任时间'},
        point: {type: 'num', desc: '分数'},
        syncPoint: {type: 'num', desc: '同步分数', editable: false, validate: {required: false}}
    };


    function onQuery(queryCondition, callback) {
        Consistence.query(tableId, queryCondition)
            .then((res) => {
            callback(res);
        });
    }

    function onSave(data, callback) {
        Consistence.onSave(tableId, data)
            .then((res) => {
                callback(res);
            });
    }

    function onDelete(data, callback) {
        var delPks = [];
        data.forEach((eachRow) => {
           delPks.push(eachRow[PK]);
        });
        Consistence.onDelete(tableId, delPks).then((res) => {
            callback(res);
        });
    }

    function onHeadFieldChanged(key, val, table) {
        if(key === 'age') {
            table.setHeadValue('syncAge', val - 6);
        }
    }

    function onBodyFieldChanged(key, val, index, table) {
        if(key === 'point') {
            table.setBodyValue('syncPoint', val, index);
        }
    }

    return (
        <Bill
            tableId={tableId}
            headMeta={headMeta}
            bodyMeta={bodyMeta}
            isQuery={true}
            onQuery={onQuery}
            onDelete={onDelete}
            onSave={onSave}
            onHeadFieldChanged={onHeadFieldChanged}
            onBodyFieldChanged={onBodyFieldChanged}
        />
    )
};

export default User;
```


## 类Kero Api

原kero框架中，对于`结构化数据`，提供统一的操作api，方便对行数据进行行或表级的创建，删除，复制等操作，极大地方便了个行内，表间的操作；因此，我尝试了构造这样的api，以方便表单的操作。

其结构为`DataTable`、`DataRow`、`MetaValue`：

| 结构      | api            | 参数         | 解析         |
| --------- | -------------- | ------------ | ------------------------------------------------------------ |
| DataTable | setValue       | filed, value | 设置当前行某个字段（field）的值（value），同DataTable.getCurrentRow().setValue() |
|           | getValue       | field        | 获取当前行某个字段的值，同DataRow.getCurrentRow().getValue() |
|           | setSimpleData  | data         | 设置dataTable的值                                            |
|           | getSimpleData  | 空           | 获取dataTable的值                                            |
|           | getAllRows     | 空           | 返回dataTable包含的所有DataRow                               |
|           | removeAllRows  | 空           | 删除所有DataRow                                              |
|           | getCurrentRow  | 空           | 获取当前显示的DataRow                                        |
|           | createEmptyRow | 空           | 创建空的DataRow                                              |
|           | getRowByIndex  | 空           | 通过index获取DataRow                                         |
| DataRow   |                |                                                                            |
|           | setValue       | filed, value | 设置本行的某个字段（field）的值（value）                     |
|           | getValue       | field        | 获取本行的某个字段的值                                       |
|           | setSimpleData  | data         | 设置本行的值                                                 |
|           | getSimpleData  | 空           | 获取本行的值                                                 |

其api的讲解可参考Kero的[api](http://docs.tinper.org/moy/kero-api.html)（后续将在单据中提供的类似于kero的api简称为`ki`），其用法可参考`NewUser.js`（即`【新】个人信息`）中的写法，例子：

- 清空`查询模板`的数据：`queryTable.removeAllRows()`。
- 设置`列表态`的数据：`listTable.setSimpleData([{name: '小明', age: 18}, {name: '小刚', age: 24}])`
- 获得`列表态`当前行的数据：`listTable.getCurrentRow().getSimpleData(); // {name: '小明', age: 18}`
- 将`列表态`当前行的数据复制给`卡片态`的表头：`cardTable.setSimpleData(listTable.getCurrentRow().getSimpleData())`

## Redux？

redux的应用，推荐将整个页面的组件归类为展示组件和容器组件，并强制将状态归一为store状态树，通过调用已声明的action（纯函数）来改变状态。

与Kero的api相比，存在以下不同：

|         | Redux                             | Kero                                     |
| ------- | --------------------------------- | ---------------------------------------- |
| 状态    | 一个应用有且只有单一的store状态树 | 一个应用有多个dataTable                  |
| 变更    | 调用事先声明的纯函数action        | 调用kero表级或行级api                    |
| 优点    | 适用性强，状态变更可预测、可追踪  | 切合结构化数据，适合不同容器间的数据流动 |
| React化 | 通过redux-react，完美融入         | 未发现相关的api库，组件需要作一定的适配  |

我将写一个基于redux的单据模板，在此之前，不再就两者的差异进入更深层的对比；
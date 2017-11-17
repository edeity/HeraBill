通过描述字段快速生成通用高级单据的React组件，也可认为是快速生成通用单据的一种解决方案

## 基本用法

参见`Post.js`，该代码实现了一个字段的增删改查

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

Meta是用来描述一个字段的详细信息

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
|       | isCheckAllNodes      | 是否全选       |        |         |                                |



## 例子

参见`User.js`，该代码实现了关于用户的基本信息的增删改查：

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
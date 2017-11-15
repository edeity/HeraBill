通过描述字段快速生成通用高级单据的React组件，也可认为是快速生成通用单据的一种解决方案

## 基本用法

```javascript
import Bill from 'HeraBill';

class XXX extends Component {
	constructor(props) {
		this.headMeta = { name: {type: 'str', desc: '姓名'}}
		this.bodyMeta = { post: {type: 'str', desc: '职位'}}
    }
  
	onQuery = (data, callback) => {...}
	onSave = (data, callback) => {...}
	onDelete = (data, callback) => {...}
    
    render() {
        <Bill 
            tableId='test'
            headMeta={this.headMeta}
            bodyMeta={this.bodyMeta}
            onQuery={this.onQuery}
            onDelete={this.onDelete}
            onSave={this.onSave}
		/>
    }
}
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
import React, {Component} from 'react';

import Bill from '../Bill/Bill';
import Consistence from '../Tools/Consistence';

const PK = 'pk';
// 实例:用户单据
class User extends Component {
    constructor() {
        super();
        // 单据标志
        this.tableId = "user";
        // 基本描述
        this.headMeta = {
            name: {
                type: 'str',
                desc: '姓名',
                editable: true,
                validate: {
                    matchReg: '',
                    matchTips: '',
                    minLen: 10,
                    maxLen: 20,
                    required: true,
                },
            },
            phone: {type: 'str', desc: '联系电话'},
            age: {type: 'num', desc: '年龄'},
            mail: {type: 'mail', desc: '邮箱地址'}
        };
        // 表体描述
        this.bodyMeta = {
            post: {type: 'refer', desc: '职位'},
            date: {type: 'date', desc: '担任时间'},
            point: {type: 'num', desc: '分数'}
        };
    };

    onQuery = (queryCondition, callback) => {
        Consistence.query(this.tableId)
            .then((res) => {
            callback(res);
        });
    };

    onSave = (data, callback) => {
        Consistence.onSave(this.tableId, data)
            .then((res) => {
                callback(res);
            });
    };

    onDelete = (data, callback) => {
        var delPks = [];
        data.forEach((eachRow) => {
           delPks.push(eachRow[PK]);
        });
        Consistence.onDelete(this.tableId, delPks)
          .then((res) => {
            callback(res);
        });
    };

    render() {
        return (
            <Bill tableId={this.tableId}
                  headMeta={this.headMeta}
                  bodyMeta={this.bodyMeta}
                  isQuery={true}
                  onQuery={this.onQuery}
                  onDelete={this.onDelete}
                  onSave={this.onSave}/>
        )
    }
}

export default User;
```
/**
 * Created by edeity on 11/10/2017.
 */

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
                    matchFun: '',
                    matchTips: '',
                    minLen: 10,
                    maxLen: 20,
                    required: true,
                },
            },
            phone: {type: 'str', desc: '联系电话'},
            age: {type: 'num', desc: '年龄'},
            mail: {type: 'mail', desc: '邮箱地址'},
        };
        // 表体描述
        this.bodyMeta = {
            post: {type: 'refer', desc: '职位', refer: {
                tableId: 'post',
                field: 'pk',
                renderField: 'name'
            }},
            date: {type: 'date', desc: '担任时间'},
            point: {type: 'num', desc: '分数'}
        };
    };

    onQuery = (queryCondition, callback) => {
        Consistence.query(this.tableId, queryCondition)
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
        Consistence.onDelete(this.tableId, delPks).then((res) => {
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
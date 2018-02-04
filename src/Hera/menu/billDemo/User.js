/**
 * Created by edeity on 11/10/2017.
 */

import React from 'react';
import Bill from '../../bill/OldBill';

import Consistence from '../../tools/Consistence';
import CommonRegex from '../../tools/CommonRegex';
import CommonFun from '../../tools/CommonFun';

const PK = 'pk';
// 实例:用户单据
const User = () => {
    
    // 单据标志
    const tableId = "user";
    // 基本描述
    const headMeta = {
        name: {
            type: 'str', desc: '姓名',
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
            type: 'str', desc: '联系电话',
            validate: {
                matchReg: CommonRegex.phone,
                required: true
            }
        },
        mail: {
            type: 'mail', desc: '邮箱地址',
            validate: {
                matchReg: CommonRegex.mail,
                matchTips: '不是一个合法的邮箱地址',
                required: true
            },
        },
        age: {
            type: 'num', desc: '年龄',
            validate: {
                matchFun: CommonFun.isPositive,
                matchTips: '年龄必须大于0'
            }
        },
        ageEditable: {
            type: 'checkbox', desc: '可编辑性',
            query: {
                isShow: false
            }
        },
        syncAge: {
            type: 'num', desc: 'sync年龄',
            editable: false,
            editableRely: 'ageEditable', // 依赖字段
            validate: {
                required: false
            },
        },
    };
    // 表体描述
    const bodyMeta = {
        post: {
            type: 'refer',
            desc: '职位',
            refer: {
                tableId: 'post',
                field: 'pk',
                renderField: 'name'}
        },
        date: { type: 'date', desc: '担任时间'},
        point: { type: 'num', desc: '分数'},
        syncPoint: {
            type: 'num',
            desc: '同步分数',
            editable: false,
            validate: {
                required: false
            }
        }
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
        } else if(key === 'ageEditable') {
            table.setHeadAttr('syncAge', { editable: val })
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
            isCheckWhenInput={true}

            onQuery={onQuery}
            onDelete={onDelete}
            onSave={onSave}

            onHeadFieldChanged={onHeadFieldChanged}
            onBodyFieldChanged={onBodyFieldChanged}
        />
    )
};

export default User;
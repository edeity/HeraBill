/**
 * Created by edeity on 11/10/2017.
 */

import React from 'react';
import Bill from '../bill_new/Bill';

import Consistence from '../tools/Consistence';
import CommonRegex from '../tools/CommonRegex';
import CommonFun from '../tools/CommonFun';

const PK = 'pk';
// 实例:用户单据
const User = () => {

    // 单据标志
    const tableId = "new_user";
    // 基本描述
    const headMeta = {
        pk: {
            type: 'str', desc: '主键',
            __renderConfig: {
                isQuery: false,
                isList: false,
                isCard: false
            }
        },
        name: {
            type: 'str', desc: '姓名',
        },
        phone: {
            type: 'str', desc: '联系电话',
            __validConfig: {
                matchReg: CommonRegex.phone,
            }
        },
        mail: {
            type: 'mail', desc: '邮箱地址',
            __validConfig: {
                matchReg: CommonRegex.mail,
                matchTips: '不是一个合法的邮箱地址',
            },
        },
        age: {
            type: 'num', desc: '年龄',
            __validConfig: {
                matchFun: CommonFun.isPositive,
                matchTips: '年龄必须大于0'
            }
        },
        ageEditable: {
            type: 'checkbox', desc: '可编辑性',
            __renderConfig: {
                isQuery: false
            }
        },
        syncAge: {
            type: 'num', desc: 'sync年龄',
            editable: false,
            __renderConfig: {
                isQuery: false
            }
        },
    };
    // // 表体描述
    // const bodyMeta = {
    //     post: {
    //         type: 'refer',
    //         desc: '职位',
    //         refer: {
    //             tableId: 'post',
    //             field: 'pk',
    //             renderField: 'name'
    //         }
    //     },
    //     date: {type: 'date', desc: '担任时间'},
    //     point: {type: 'num', desc: '分数'},
    //     syncPoint: {
    //         type: 'num',
    //         desc: '同步分数',
    //         editable: false,
    //         validConfig: {
    //             required: false
    //         }
    //     }
    // };


    function onInit(queryTable, listTable, cardTable) {
        
    }

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

    }

    function onBodyFieldChanged(key, val, index, table) {

    }

    return (
        <Bill
            tableId={tableId}
            headMeta={headMeta}

            isQuery
            
            onQuery={onQuery}
            onDelete={onDelete}
            onSave={onSave}

            onInit={onInit}

            onHeadFieldChanged={onHeadFieldChanged}
            onBodyFieldChanged={onBodyFieldChanged}
        />
    )
};

export default User;
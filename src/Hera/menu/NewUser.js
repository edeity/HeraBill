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
    
    // 表体描述
    const postMeta = {
        headPk: {
            type: 'str', desc: '表头主键',
            __renderConfig: {
                isQuery: false,
                isList: false,
                isCard: false
            }
        },
        pk: {
            type: 'str', desc: '主键',
            __renderConfig: {
                isQuery: false,
                isList: false,
                isCard: false
            }
        },
        post: {
            type: 'str',
            desc: '职位',
        },
    };
    
    const pointMeta = {
        headPk: {
            type: 'str', desc: '表头主键',
            __renderConfig: {
                isQuery: false,
                isList: false,
                isCard: false
            }
        },
        pk: {
            type: 'str', desc: '主键',
            __renderConfig: {
                isQuery: false,
                isList: false,
                isCard: false
            }
        },
        point: {
            type: 'str',
            desc: '分数'
        },
    };
    
    const bodyMeta = {
        post: postMeta,
        point: pointMeta
    };
    
    function onInit(queryTable, listTable, cardTable, cardBodyTableMap) {
    }

    function onQuery(queryCondition, table, refresh) {
        Consistence.query(tableId, queryCondition).then((res) => {
                Bill.handleRes(res, null, function (data) {
                    table.setSimpleData(data);
                    refresh();
                }, );
            });
    }

    function onBodyQuery(tableId, queryCondition, suchTable, refresh) {
        Consistence.query(tableId, queryCondition).then((res) => {
            suchTable.setSimpleData(res.data);
            refresh();
        })
    }

    /**
     * 获取表体的信息, 应注意两点:
     *
     * 1. 表体应标注表头的pk(一般在后台进行)
     * 2. 表头表体的数据应一次性提交(一般对应DB的事物)
     *
     * 表体提交给后台以及接受后台的形式不是固定的,在这个示例中
     *
     * 提交数据:
     * {
     *  headData: { $tableId: headData},
     *  bodyData: [
     *              {$tableId: [data]}, 
     *              {$tableId: [data2]}
 *                  ]
     * }
     * 
     * 实际请求不应包括tableId,而应在请求的后台明确存储的结构
     * 在这为简便,仅提供一个通用保存接口 onBillSave,通过tableId来标准该结构存储在哪个表中;
     *
     * 返回数据:
     * {
     *  data: {
     *      $tableId: headData, 
     *      $tableId: bodyData1,
     *      $tableId: bodyData2
 *      },
     *  success: boolean,
     *  error: 'error msg such as error stack'
     *  }
     *
     * 推荐任何调用返回数据包含
     *
     * data:返回数据,
     * success: 是否成功,
     * error: 错误堆栈信息这三种基本格式
     **/
    function onSave(cardTable, cardBodyTableMap, refreshCallback) {
        // 获取表头的信息
        let headData = cardTable.getCurrentRow().getSimpleData();

        let bodyData = [];
        if(cardBodyTableMap) {
            for(let key of cardBodyTableMap.keys()) {
                let tempTable = cardBodyTableMap.get(key);
                let tempBodyData = tempTable.getSimpleData();
                let bodySet = {};
                bodySet[key] = tempBodyData; // 暂且以key作为存储的tableId
                bodyData.push(bodySet);
            }
        }
        
        let postData = {
            headData: { 'new_user': headData},
            bodyData: bodyData
        };

        Consistence.onBillSave(postData)
            .then((res) => {
                if(res.success) {
                    refreshCallback(res);
                } else {
                    console.log(res.error);
                }
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

    return (
        <Bill
            tableId={tableId}
            headMeta={headMeta}
            bodyMeta={bodyMeta}

            isQuery
            
            onQuery={onQuery}
            onBodyQuery={onBodyQuery}
            onDelete={onDelete}
            onSave={onSave}

            onInit={onInit}
        />
    )
};

export default User;
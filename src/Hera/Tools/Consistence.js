/**
 * Created by edeity on 03/11/2017.
 */

import * as db from 'localforage';
import VO from '../tools/VO';

const PK = 'pk';
const AJAX_TIME = '200';

/**
 * 用来模拟单据操作请求的类
 * 对应的对持久化操作的层
 */
class Consistence {

    // queryByPk = (tableId, billPk) => {
    //     db.getItem(tableId).then((table) => {
    //         let rowData = table[billPk];
    //         return Consistence.resSuccess(rowData);
    //     });
    // }

    /**
     *
     * @param tableId
     * @param billVo
     * @returns {{data, error, success}|*}
     */
    static query = (tableId, billVo) => {
        return new Promise((resolve, reject) => {
            db.getItem(tableId).then((table) => {
                table = table ? table : {};
                let resData = [];
                const key = Object.keys(table);
                if (billVo) {
                    const filterKey = Object.keys(billVo);
                    key.forEach((eachKey) => {
                        var tempRowData = table[eachKey];
                        var isMatch = filterKey.every((eachFilterKey)=> {
                            let matchKey = billVo[eachFilterKey];
                            if (matchKey === null
                                || matchKey === ''
                                || matchKey === undefined
                                || matchKey === tempRowData[eachFilterKey]) {
                                return true;
                            }
                            return false;
                        })
                        if (isMatch) {
                            resData.push(tempRowData);
                        }
                    });
                } else {
                    key.forEach((eachKey) => {
                        var tempRowData = table[eachKey];
                        resData.push(tempRowData);
                    })
                }

                resolve(Consistence.resSuccess(resData));
            });
        })
    };

    /**
     * update or insert
     * @param tableId
     * @param billVo
     * @deprecate
     * 保存一条数据,返回pk
     */
    static onSave = (tableId, billVo) => {
        let billPK = billVo[PK];
        if (billPK) {
            // 更新
            return new Promise((resolve, reject) => {
                db.getItem(tableId).then((table) => {
                    table = table ? table : {};
                    table[billPK] = billVo;
                    db.setItem(tableId, table).then(() => {
                        return db.getItem(tableId);
                    }).then((resData) => {
                        resolve(Consistence.resSuccess(resData[billPK]));
                    }).catch((err)=> {
                        resolve(Consistence.resFail(err));
                    });
                });
            });
        } else {
            // 新增
            billPK = '' + Math.random();
            billVo[PK] = billPK;
            return Consistence.onSave(tableId, billVo)
        }
    };

    /**
     * delete
     * @param tableId
     * @param billPk
     */
    static onDelete = (tableId, pks) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                db.getItem(tableId).then((table)=> {
                    var isDelete = pks.every((pk) => {
                        if (table[pk]) {
                            delete table[pk];
                            return true;
                        }
                        return false;
                    });
                    if (isDelete) {
                        db.setItem(tableId, table).then(()=> {
                            resolve(Consistence.resSuccess('删除成功'));
                        }).catch((err) => {
                            resolve(Consistence.resFail(err))
                        });
                    }
                });
            }, AJAX_TIME)
        });
    };

    static onBillSave = (postData) => {
        return new Promise((resolve, reject) => {
            let headData = postData.headData;
            let bodyData = postData.bodyData;
            let headTableId = Object.keys(headData)[0];
            let headPk = VO.saveVO(headTableId, headData[headTableId])
                .then((headPk) => {
                    bodyData.forEach(function (eachBodyData) {
                        let bodyTableIds = Object.keys(eachBodyData);
                        bodyTableIds.forEach(function (eachTableId) {
                            let eachBodyDataArray = eachBodyData[eachTableId];
                            eachBodyDataArray.forEach(function (eachRowBodyData) {
                                eachRowBodyData['headPk'] = headPk;
                            });
                            VO.saveVOArray(eachTableId, eachBodyDataArray);
                        });
                        resolve(Consistence.resSuccess(headPk));
                    })
                }).catch((err) => {
                    reject(Consistence.resFail(err));
                });
        })
    };

    static resSuccess(data) {
        return {
            data: data,
            error: null,
            success: true
        }
    }

    static resFail(msg) {
        return {
            data: null,
            error: msg,
            success: false
        }
    }
}

export default Consistence;
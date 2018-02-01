/**
 * Created by edeity on 03/11/2017.
 */

import * as db from 'localforage';
import VO from '../tools/VO';

const HEAD_PK = 'headPk';
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

    /**
     * 保存一个完整的单据
     * @param postData
     * @returns {Promise}
     */
    static onBillSave = (postData) => {
        return new Promise((resolve, reject) => {
            let headData = postData.headData;
            let bodyData = postData.bodyData;
            let headTableId = Object.keys(headData)[0];

            VO.saveVO(headTableId, headData[headTableId])
                .then((headPk) => {
                    let bodyTrans = [];

                    // 遍历每个表体
                    bodyData.forEach((eachBodyData) => {
                        let bodyTableId = Object.keys(eachBodyData)[0];

                        bodyTrans.push(new Promise((resolve, reject) => {
                            Consistence.query(bodyTableId, {headPk: headPk}).then((res) => {
                                let bodyData = res.data;
                                if(bodyData.length !== 0) {
                                    let tempBodyPks = [];
                                    bodyData.forEach((eachBodyData)=> {
                                        tempBodyPks.push(eachBodyData[PK]);
                                    });
                                    // 删除旧的
                                    VO.deleteVOByPks(bodyTableId, tempBodyPks).then(()=> {
                                        // 保存新的
                                        let bodyDataArray = eachBodyData[bodyTableId];
                                        bodyDataArray.forEach(function (eachRowData) {
                                            eachRowData[HEAD_PK] = headPk;
                                        });
                                        VO.saveVOArray(bodyTableId, bodyDataArray).then(()=> {
                                            resolve();
                                        }).catch(err => reject(err))
                                    })
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    });

                    // 更新新的
                    Promise.all(bodyTrans)
                        .then(() => resolve(Consistence.resSuccess(headPk)))
                        .catch(err => reject(Consistence.resFail(err)));

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
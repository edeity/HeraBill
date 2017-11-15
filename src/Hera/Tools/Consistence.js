/**
 * Created by edeity on 03/11/2017.
 */

import * as db from 'localforage';

const PK = 'pk';
const AJAX_TIME = '200';
class Consistence {
    /**
     *
     * @param tableId
     * @param billPk
     * @returns {{data, error, success}|*}
     */
    queryByPk = (tableId, billPk) => {
        db.getItem(tableId).then((table) => {
            let rowData = table[billPk];
            return Consistence.resSuccess(rowData);
        });
    }

    /**
     *
     * @param tableId
     * @param billVo
     * @returns {{data, error, success}|*}
     */
    static query = (tableId, billVo) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                db.getItem(tableId).then((table) => {
                    table = table ? table : {};
                    let resData = [];
                    const key = Object.keys(table);
                    if(billVo) {
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
                            if(isMatch) {
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
            }, AJAX_TIME);
        })
    };

    /**
     * update or insert
     * @param tableId
     * @param billVo
     */
    static onSave = (tableId, billVo) => {
        let billPK = billVo[PK];
        if (billPK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
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
                }, AJAX_TIME);
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
                db.getItem(tableId).then((table)=>{
                    var isDelete = pks.every((pk) => {
                        if (table[pk]) {
                            delete table[pk];
                            return true;
                        }
                        return false;
                    });
                    if(isDelete) {
                        db.setItem(tableId, table).then(()=>{
                            resolve(Consistence.resSuccess('删除成功'));
                        }).catch((err) => {
                            resolve(Consistence.resFail(err))
                        });   
                    }
                });
            }, AJAX_TIME)
        });
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
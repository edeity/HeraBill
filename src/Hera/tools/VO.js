/**
 * Created by edeity on 2018/1/7.
 */
import * as db from 'localforage';

// const HEAD_PK = 'headPk';
const PK = 'pk';

class VO {
    /**
     * 保存单个VO
     * @param tableId
     * @param billVo
     * @returns {Promise}
     */
    static saveVO(tableId, billVo) {
        return new Promise((resolve, reject) => {
            db.getItem(tableId)
                .then((table) => {
                    // 新建pk
                    table = table || {};
                    let headPk = billVo[PK] || VO.__createPk();
                    billVo[PK] = headPk;
                    table[headPk] = billVo;
                    // 保存
                    db.setItem(tableId, table).then(()=> {
                        resolve(headPk);
                    }).catch((err) => {
                        reject(err);
                    })

                });

        });
    }
    /**
     * 保存多个VO
     * @param tableId
     * @param billVo
     */
    static saveVOArray(tableId, billVos) {
        return new Promise((resolve, reject) => {
            db.getItem(tableId)
                .then((table) => {
                    // 新建pk
                    table = table || {};
                    billVos.forEach(function (eachBill) {
                        let tempBillPk = eachBill[PK];
                        if (!tempBillPk) {
                            tempBillPk = VO.__createPk();
                        }
                        eachBill[PK] = tempBillPk;
                        table[tempBillPk] = eachBill;
                    });

                    // 保存
                    db.setItem(tableId, table).then(()=> {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    })

                });

        });
    }

    /**
     * 删除多个VO
     * @param tableId
     * @param pks
     */
    static deleteVOByPks(tableId, pks) {
        return new Promise((resolve, reject) => {
            db.getItem(tableId)
                .then((table)=>{
                var isDelete = pks.every((pk) => {
                    if (table[pk]) {
                        delete table[pk];
                        return true;
                    }
                    return false;
                });
                if(isDelete) {
                    db.setItem(tableId, table).then(()=>{
                        resolve();
                    }).catch((err) => {
                        reject(err)
                    });
                }
            });
        });
    }

    static __createPk() {
        return '' + Math.random();
    }
}

export default VO;
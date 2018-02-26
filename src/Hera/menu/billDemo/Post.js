/**
 * Created by edeity on 13/11/2017.
 */


import React from 'react';

import Bill from '../../bill/Bill';
import Consistence from '../../tools/Consistence';

const PK = 'pk';
// 实例:用户单据
const POST = () => {
    
    // 单据标志
    const tableId = "post";
    // 基本描述
    const headMeta = {
        name: { type: 'str', desc: '职位'}
    };
    

    function onQuery(queryCondition, callback) {
        Consistence.query(tableId, queryCondition)
            .then((res) => {
                callback(res);
            });
    };

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

    
    return (
        <Bill tableId={tableId}
              headMeta={headMeta}
              isQuery={true}
              onQuery={onQuery}
              onDelete={onDelete}
              onSave={onSave}/>
    )
};

export default POST;
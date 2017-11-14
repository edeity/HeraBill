/**
 * Created by edeity on 13/11/2017.
 */


import React, {Component} from 'react';

import Bill from '../Bill/Bill';
import Consistence from '../Tools/Consistence';

const PK = 'pk';
// 实例:用户单据
class Post extends Component {
    constructor() {
        super();
        // 单据标志
        this.tableId = "post";
        // 基本描述
        this.headMeta = {
            name: { type: 'str', desc: '职位名称'},
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

export default Post;
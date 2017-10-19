/**
 * Created by edeity on 11/10/2017.
 */

import React, {Component} from 'react';

import Bill from '../Bill/Bill';

// 实例:用户单据
class User extends Component {
    constructor() {
        super();
        
        // 单据标志
        this.tableId = "user";
        
        // 基本描述
        const userMeta = {
            name: {
                type: 'string',
                desc: '姓名',
                editable: true,
                validate: {
                    matchReg: '',
                    matchTips: '',
                    minLen: 10,
                    maxLen: 20,
                    required: true,
                },
            },
            phone: { type: 'phone', desc: '联系电话' }
        };
        
        const bodyMeta = {
            post: { type: 'ref', desc: '职位' },
            date: { type: 'date', desc: '担任时间' },
            point: { type: 'number', desc: '分数' }
        };
        
        this.meta = {
            headMeta: userMeta,
            bodyMeta: bodyMeta
        };

        let pk1BodyData = [ { post: '逗逼', date: '2017-10-16', point: '10', key: 'b1',pk: 'b1', headPk: 'pk1' },
            { post: 'fe', date: '2017-10-16', point: '6', key: 'b2', pk: 'b2', headPk: 'pk1' }
        ];
        let pk2BodyData = [
            { post: 'sb', date: '2017-10-16', point: '5', key: 'b3', pk: 'b3', headPk: 'pk2' },
            { post: 'be', date: '2017-10-16', point: '4', key: 'b4', pk: 'b4', headPk: 'pk2' }
        ];
        // 基本数据
        let data = [
            { name: '李健乐', phone: '18410225473', key: 'pk1', pk: 'pk1', bodyData: pk1BodyData},
            { name: '张琳', phone: '18366116120', key: 'pk2', pk: 'pk2', bodyData: pk2BodyData}
        ];
        this.data = data;
    };

    onSave = (editData) => {
        // console.log(editData);
    };

    render() {
        return (
            <div>
                <Bill tableId={this.tableId} 
                      meta={this.meta.headMeta} 
                      bodyMeta={this.meta.bodyMeta} 
                      data={this.data}
                      onSave={this.onSave}/>
            </div>
        )
    }
}

export default User;
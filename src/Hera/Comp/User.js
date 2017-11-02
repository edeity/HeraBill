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
                type: 'str',
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
            phone: { type: 'str', desc: '联系电话' },
            age: {type: 'num', desc: '年龄'},
            mail: {type: 'mail', desc: '邮箱地址'}
        };


        const bodyMeta = {
            post: { type: 'refer', desc: '职位' },
            date: { type: 'date', desc: '担任时间' },
            point: { type: 'num', desc: '分数' }
        };

        this.meta = {
            headMeta: userMeta,
            bodyMeta: bodyMeta
        };

        let pk1BodyData = [
            { post: '逗逼', date: '2017-10-16', point: '10', key: 'b1',pk: 'b1', headPk: 'pk1' },
            { post: 'fe', date: '2017-10-16', point: '6', key: 'b2', pk: 'b2', headPk: 'pk1' }
        ];
        let pk2BodyData = [
            { post: 'sb', date: '2017-10-16', point: '5', key: 'b3', pk: 'b3', headPk: 'pk2' },
            { post: 'be', date: '2017-10-16', point: '4', key: 'b4', pk: 'b4', headPk: 'pk2' }
        ];
        // 基本数据
        let data = [
            { name: '李健乐', phone: '18410225473', age: '18', mail: 'lijle@yonyou.com', key: 'pk1', pk: 'pk1', bodyData: pk1BodyData},
            { name: '张琳', phone: '18366116120', age: '25', key: 'pk2', pk: 'pk2', bodyData: pk2BodyData},
            { name: '3', phone: '3', key: 'pk3', pk: 'pk3' },
            { name: '4', phone: '4', key: 'pk4', pk: 'pk4' },
            { name: '5', phone: '5', key: 'pk5', pk: 'pk5' },
            { name: '6', phone: '6', key: 'pk6', pk: 'pk6' },
            { name: '7', phone: '7', key: 'pk7', pk: 'pk7' },
            { name: '8', phone: '8', key: 'pk8', pk: 'pk8' },
            { name: '9', phone: '9', key: 'pk9', pk: 'pk9' },
            { name: '10', phone: '10', key: 'pk10', pk: 'pk10' },
            { name: '11', phone: '11', key: 'pk11', pk: 'pk11' },
            { name: '12', phone: '12', key: 'pk12', pk: 'pk12' },
        ];
        this.data = data;
    };

    onSave = (data) => {
        // console.log(data);
    };

    onDelete = (data) => {

    };

    render() {
        return (
            <Bill tableId={this.tableId}
                  headMeta={this.meta.headMeta}
                  bodyMeta={this.meta.bodyMeta}
                  data={this.data}

                  onDelete={this.onDelete}
                  onSave={this.onSave}/>
        )
    }
}

export default User;
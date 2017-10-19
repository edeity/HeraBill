/**
 * Created by edeity on 11/10/2017.
 */


import React, {Component} from 'react';
import Bill from '../Bill/Bill';

// 实例:用户单据
class Setting extends Component {
    constructor() {
        super();

        // 单据标志
        const tableId = "setting";
        this.tableId = tableId;

        const userMeta = {
            time: {
                type: 'time',
                desc: '系统时间1',
                editable: false,
            },
            style: {
                type: 'ref',
                desc: '系统风格',
            },
            dataBase: {
                type: 'ref',
                desc: '数据库'
            }
        };

        this.meta = {
            headMeta: userMeta,
        };

        const data = [{
            time: new Date().toLocaleString(),
            style: '明亮',
            dataBase: 'oracel',
            key: 'pk1'
        }, {
            time: new Date().toLocaleString(),
            style: '护眼',
            dataBase: 'db2',
            key: 'pk2'
        }];
        this.data = data;
    }

    render() {
        return (
            <div>
                <Bill meta={this.meta.headMeta} data={this.data} tableId={this.tableId}/>
            </div>
        )
    }
}

export default Setting;
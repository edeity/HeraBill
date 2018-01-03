/**
 * Created by edeity on 26/10/2017.
 */


import React, {Component} from 'react';
import Meta from '../Bill/Meta';
import {Row, Button} from 'antd';
import dm from '../Tools/DefaultMeta';

// 实例:用户单据
class MetaList extends Component {
    constructor() {
        super();
        this.state = {
            isEditable: false
        };
    }

    canEdit = () => {
        this.setState({
            isEditable: true
        })
    };

    canNotEdit = () => {
        this.setState({
            isEditable: false
        })
    };

    onChange = (key, value) => {
        console.log('变更字段: ' + key + ', 值: ' + value);
    };

    render() {
        /**
         * 枚举支持的类型
         */
        const metaAttrList = dm.fillDefaultMeta({
            data: {type: 'date', desc: '日期'},
            time: { type: 'time', desc: '时间'},
            num: { type: 'num', desc: '数字'},
            str: { type: 'str', desc: '字符串'},
            mail: { type: 'mail', desc: '邮箱'},
            refer: { type: 'refer', desc: '参照', refer: {
                tableId: 'user',
                field: 'pk',
                renderField: 'name'
            }}
        });
        const keys = Object.keys(metaAttrList);

        const isEditable = this.state.isEditable;
        return (
            <div>
                <Row type="flex" justify="end" style={{ marginBottom: 16 }}>
                    {
                        isEditable
                            ?
                            <Button.Group>
                                <Button onClick={this.canNotEdit}>取消</Button>
                            </Button.Group>
                            :
                            <Button.Group>
                                <Button onClick={this.canEdit}>编辑</Button>
                            </Button.Group>
                    }
                </Row>
                <Row gutter={16}>
                    {
                        keys.map((key)=> {
                            let metaAttr = metaAttrList[key];
                            return <Meta
                                key={metaAttr.type}
                                type={metaAttr.type}
                                field={ key }
                                meta={metaAttr}
                                editable={isEditable}
                                onChange={this.onChange}
                            />
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default MetaList;
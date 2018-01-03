/**
 * Created by edeity on 2018/1/3.
 */

import React, {Component} from 'react';
import { List } from 'antd';

// 开发计划
class Plan extends Component {
    render() {
        const doneData= [
            '单表头表体CRDU',
            '简单参照',
            '校验接口',
            '字段变更'
        ];
        const toDoData = [
            '多表体',
            '显示公式',
            '代码持续重构'
        ];
        return (
            <div>
                <List
                    style={{ marginBottom: 16 }}
                    header={<h2>已完成</h2>}
                    bordered
                    dataSource={doneData}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
                <List
                    style={{ marginBottom: 16 }}
                    header={<h2>未完成</h2>}
                    bordered
                    dataSource={toDoData}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>
        )
    }
}

export default Plan;
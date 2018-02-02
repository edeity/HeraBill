/**
 * Created by edeity on 2018/1/3.
 */

import React, {Component} from 'react';
import { Row, Col, Timeline } from 'antd';

// 开发计划
class Plan extends Component {
    render() {
        const oldDoneData = ['单表头表体', '多表体', '简单参照', '校验接口', '字段变更'];
        const oldToDoData = [];
        const doneData= ['单表头表体', '多表体', 'Kero接口'];
        const toDoData = ['简单参照', '校验接口', '字段变更', '显示公式'];
        function getDoneTimeLine(data) {
            let doneTimeLine = [];
            data.forEach(function (eachData, i) {
                doneTimeLine.push(<Timeline.Item color="green" key={`done-${i}`}>{eachData}</Timeline.Item>)
            });
            return doneTimeLine;
        }
        function getToDoTimeLine(data) {
            let doneTimeLine = [];
            data.forEach(function (eachData, i) {
                doneTimeLine.push(<Timeline.Item color="blue" key={`todo-${i}`}>{eachData}</Timeline.Item>)
            });
            return doneTimeLine;
        }
        return (
            <Timeline>
                <Row>
                    <Col span={10} offset={2}>
                        <p>旧规划</p>
                        {getDoneTimeLine(oldDoneData)}
                        {getToDoTimeLine(oldToDoData)}
                    </Col>
                    <Col span={10} offset={2}>
                        <p>新规划</p>
                        {getDoneTimeLine(doneData)}
                        {getToDoTimeLine(toDoData)}
                    </Col>
                </Row>
            </Timeline>
        )
    }
}

export default Plan;
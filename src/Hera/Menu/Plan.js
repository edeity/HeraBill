/**
 * Created by edeity on 2018/1/3.
 */

import React, {Component} from 'react';
import { Timeline } from 'antd';

// 开发计划
class Plan extends Component {
    render() {
        const doneData= [
            '单表头表体',
            '多表体',
            'Kero接口'
        ];
        const toDoData = [
            '简单参照',
            '校验接口',
            '字段变更',
            '显示公式',
        ];
        function getDoneTimeLine() {
            let doneTimeLine = [];
            doneData.forEach(function (eachData) {
                doneTimeLine.push(<Timeline.Item color="green">{eachData}</Timeline.Item>)
            });
            return doneTimeLine;
        }
        function getToDoTimeLine() {
            let doneTimeLine = [];
            toDoData.forEach(function (eachData) {
                doneTimeLine.push(<Timeline.Item color="blue">{eachData}</Timeline.Item>)
            });
            return doneTimeLine;
        }
        return (
            <Timeline>
                {getDoneTimeLine()}
                {getToDoTimeLine()}
            </Timeline>
        )
    }
}

export default Plan;
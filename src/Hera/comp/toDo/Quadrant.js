/**
 * Created by edeity on 2018/2/4.
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import Todo from './Todo';

import './quadrant.css';

class Quadrant extends Component {
    render() {
        return (
            <Row>
                <div className="quadrant-container">
                    <Col span={12}>
                        <div className="quadrant beta-quadrant">
                            <Todo defaultValue={['学习英语、数学、常规算法', '高star的开源项目', '结婚、房、驾驶证']}/>
                            <div className="tags">
                                <span className="tag">65%~80%</span>
                                <span className="tag">重要但不紧急</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="quadrant first-quadrant">
                            <Todo defaultValue={['相关的离职手续', '广州的前端工作']}/>
                            <div className="tags">
                                <span className="tag">紧急又重要事项</span>
                                <span className="tag">20%~25%</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="quadrant third-quadrant">
                            <Todo defaultValue={['烤鸭和稻香村的手信']}/>
                            <div className="tags">
                                <span className="tag">15%</span>
                                <span className="tag">紧急但不重要</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="quadrant delta-quadrant">
                            <Todo defaultValue={['炉石传说国服前1000']}/>
                            <div className="tags">
                                <span className="tag">不紧急也不重要</span>
                                <span className="tag">{"<1%"}</span>
                            </div>
                        </div>
                    </Col>
                </div>
            </Row>)

    }
}

export default Quadrant;
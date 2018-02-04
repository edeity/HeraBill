/**
 * Created by edeity on 2018/2/4.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Icon, Tooltip, Input, Popconfirm} from 'antd';

import './toDo.css';

class ToDo extends Component {
    constructor(props) {
        super(props);
        const betaArray = this.getArrayAttribute('学习英语、数学、常规算法', '高star的开源项目', '结婚、房、驾驶证');
        const firstArray = this.getArrayAttribute('相关的离职手续', '广州的前端工作');
        const thirdArray = this.getArrayAttribute('烤鸭和稻香村的手信');
        const deltaArray = this.getArrayAttribute('炉石传说国服前1000');
        this.state = {
            firstArray: firstArray,
            betaArray: betaArray,
            thirdArray: thirdArray,
            deltaArray: deltaArray
        }
    }

    getArrayAttribute(...array) {
        let data = [];
        array.forEach(function (eachData) {
            data.push({
                content: eachData,
                isEdit: false
            });
        });
        return data;
    }

    add(key) {
        switch(key) {
            case 1: let firstArray = this.state.firstArray;
                firstArray.push({
                    content: '',
                    isEdit: true
                });
                this.setState({
                    firstArray: firstArray
                }); break;
            case 2: let betaArray = this.state.betaArray;
                betaArray.push({
                    content: '',
                    isEdit: true
                });
                this.setState({
                    betaArray: betaArray
                }); break;
            case 3: let thirdArray = this.state.thirdArray;
                thirdArray.push({
                    content: '',
                    isEdit: true
                });
                this.setState({
                    thirdArray: thirdArray
                }); break;
            case 4: let deltaArray = this.state.deltaArray;
                deltaArray.push({
                    content: '',
                    isEdit: true
                });
                this.setState({
                    deltaArray: deltaArray
                }); break;
        }
    }

    empty(key) {
        switch(key) {
            case 1: this.setState({
                firstArray: []
            }); break;
            case 2: this.setState({
                betaArray: []
            }); break;
            case 3: this.setState({
                thirdArray: []
            }); break;
            case 4: this.setState({
                deltaArray: []
            }); break;
        }
    }

    changeEditState(key, index, isEditable){
        switch(key) {
            case 1: {
                let firstArray = this.state.firstArray;
                firstArray.forEach(function (eachData) {
                    eachData.isEdit = false
                });
                firstArray[index].isEdit = isEditable;
                this.setState({
                    firstArray: firstArray
                });
                break;
            }
            case 2: {
                let betaArray  = this.state.betaArray;
                betaArray.forEach(function (eachData) {
                    eachData.isEdit = false
                });
                betaArray[index].isEdit = isEditable;
                this.setState({
                    betaArray: betaArray
                });
                break;
            }
            case 3: {
                let thirdArray  = this.state.thirdArray;
                thirdArray.forEach(function (eachData) {
                    eachData.isEdit = false
                });
                thirdArray[index].isEdit = isEditable;
                this.setState({
                    thirdArray: thirdArray
                });
                break;
            }
            case 4: {
                let deltaArray  = this.state.deltaArray;
                deltaArray.forEach(function (eachData) {
                    eachData.isEdit = false
                });
                deltaArray[index].isEdit = isEditable;
                this.setState({
                    deltaArray: deltaArray
                });
                break;
            }
        }
    }

    changeContent(key, index, value) {
        switch(key) {
            case 1: {
                let firstArray = this.state.firstArray;
                firstArray[index].content = value;
                this.setState({
                    firstArray: firstArray
                });
                break;
            }
            case 2: {
                let betaArray  = this.state.betaArray;
                betaArray[index].content = value;
                this.setState({
                    betaArray: betaArray
                });
                break;
            }
            case 3: {
                let thirdArray  = this.state.thirdArray;
                thirdArray[index].content = value;
                this.setState({
                    thirdArray: thirdArray
                });
                break;
            }
            case 4: {
                let deltaArray  = this.state.deltaArray;
                deltaArray[index].content = value;
                this.setState({
                    deltaArray: deltaArray
                });
                break;
            }
        }
    }

    getRenderBar(key) {
        return (
            <div className="tool-tips">
                <Tooltip placement="top" title={"添加"}>
                    <span onClick={()=>{this.add(key)}} className="tool-btn"><Icon type="plus"/></span>
                </Tooltip>
                <Tooltip placement="top" title={"清空"}>
                    <Popconfirm title="确定清空该象限内容?" onConfirm={() => {this.empty(key)}} okText="是" cancelText="否">
                        <span className="tool-btn"><Icon type="delete"/></span>
                    </Popconfirm>
                </Tooltip>
            </div>
        )
    }

    getRenderList(key) {
        let data = null;
        switch(key) {
            case 1: data = this.state.firstArray; break;
            case 2: data = this.state.betaArray; break;
            case 3: data = this.state.thirdArray; break;
            case 4: data = this.state.deltaArray; break;
        }
        let renderList = [];
        data.forEach((eachData, index) => {
            renderList.push(
                eachData.isEdit
                    ? <Input key={"edit-"+index}
                             defaultValue={eachData.content}
                             onPressEnter={()=>this.changeEditState(key, index, false)}
                             onChange={(event)=>this.changeContent(key, index, event.target.value)}
                             onBlur={()=>this.changeEditState(key, index, false)} />
                    : <li className="todo-li"
                          key={"li-"+index}
                          onClick={()=>this.changeEditState(key, index, true)} >{eachData.content}</li>
            );
        })
        return renderList;
    }
    render() {
        return (
            <Row>
                <div className="quadrant-container">
                    <Col span={12}>
                        <div className="quadrant beta-quadrant">
                            {this.getRenderBar(2)}
                            <ul className="todo-list">
                                {
                                    this.getRenderList(2)
                                }
                            </ul>
                            <div className="tags">
                                <span className="tag">65%~80%</span>
                                <span className="tag">重要但不紧急</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="quadrant first-quadrant">
                            {this.getRenderBar(1)}
                            <ul className="todo-list">
                                {
                                    this.getRenderList(1)
                                }
                            </ul>
                            <div className="tags">
                                <span className="tag">紧急又重要事项</span>
                                <span className="tag">20%~25%</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="quadrant third-quadrant">
                            {this.getRenderBar(3)}
                            <ul className="todo-list">
                                {
                                    this.getRenderList(3)
                                }
                            </ul>
                            <div className="tags">
                                <span className="tag">15%</span>
                                <span className="tag">紧急但不重要</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="quadrant delta-quadrant">
                            {this.getRenderBar(4)}
                            <ul className="todo-list">
                                {
                                    this.getRenderList(4)
                                }
                            </ul>
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

export default ToDo;
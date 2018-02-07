/**
 * Created by edeity on 2018/2/5.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, Tooltip, Input, Popconfirm, message} from 'antd';
import Type from '../../tools/Type';
import * as db from 'localforage';
import Log from '../../tools/Log';

import './toDo.css';

const TRANS_KEY = '__dragData';

class Todo extends Component {
    constructor(props) {
        super(props);
        let defaultValue = this.props.defaultValue || [];
        if(this.props.isStore) {
            if(this.props.storeKey) {
                this.state = {
                    data: [],
                    isDragOver: false
                };
                db.getItem(this.props.storeKey).then(table=> {
                    if(table)  {
                        this.setState({
                            data: this.__getRenderData(table),

                        });
                    } else {
                        // 证明还没有被初始化
                        db.setItem(this.props.storeKey, defaultValue).then(()=> {
                            this.setState({
                                data: this.__getRenderData(defaultValue),

                            });
                        });
                    }
                })
            } else {
                Log.error('props: if [isStore] === true, that attribute [storeKey] is required');
            }
        } else {
            this.state = {
                data: this.__getRenderData(defaultValue),
                isDragOver: false
            }
        }
    }

    __getRenderData(arrayData) {
        let data = [];
        if(Type.isArray(arrayData)) {
            arrayData.forEach(function (eachData) {
                data.push({
                    content: eachData,
                    isEditable: false
                })
            });
        } else if(Type.isString()){
            data.push({
                content: arrayData,
                isEditable: false
            })
        }
        return data;
    }

    __refreshData(data) {
        this.setState({
            data: data
        });
        // 同步到本地
        if(this.props.isStore) {
            let storeData = [];
            data.forEach(function (eachData) {
                storeData.push(eachData.content);
            });
            db.setItem(this.props.storeKey, storeData);
        }
    }

    empty() {
        this.__refreshData([]);
    }

    add(newData) {
        let data = this.state.data;
        if(newData) {
            data.push(newData);
        } else {
            data.push({
                content: '',
                isEditable: true
            });
        }
        this.__refreshData(data);
    }

    insert(index) {
        let data = this.state.data;
        data.splice(index + 1, 0, {
            content: '',
            isEditable: true
        });
        this.__refreshData(data);
    }

    toTop(index) {
        if(index === 0) {
            message.info('已经是第一项了');
        } else {
            let data = this.state.data;
            const changeIndex = 0;
            let tempData = data[changeIndex];
            data[changeIndex] = data[index];
            data[index] = tempData;
            this.__refreshData(data);
        }
    }

    up(index) {
        if(index === 0) {
            message.info('已经是第一项了');
        } else {
            let data = this.state.data;
            const changeIndex = index -1;
            let tempData = data[changeIndex];
            data[changeIndex] = data[index];
            data[index] = tempData;
            this.__refreshData(data);
        }
    }

    down(index) {
        let data = this.state.data;
        if(index === data.length - 1) {
            message.info('已经是最后一项了');
        } else {
            let data = this.state.data;
            const changeIndex = index + 1;
            let tempData = data[changeIndex];
            data[changeIndex] = data[index];
            data[index] = tempData;
            this.__refreshData(data);
        }
    }

    delete(index) {
        let data = this.state.data;
        data.splice(index, 1);
        this.__refreshData(data);
    }

    deleteIfEmpty(index) {
        let data = this.state.data;
        if(data[index].content === '') {
            data.splice(index, 1);
            this.__refreshData(data);
        }
    };

    getRenderBar =() =>{
        return (
            <div className="tool-tips">
                <Tooltip placement="top" title={"添加"}>
                    <span onClick={()=>{this.add()}} className="tool-btn"><Icon type="plus"/></span>
                </Tooltip>
                <Tooltip placement="top" title={"清空"}>
                    <Popconfirm title="确定清空该象限内容?" onConfirm={() => {this.empty()}} okText="是" cancelText="否">
                        <span className="tool-btn"><Icon type="delete"/></span>
                    </Popconfirm>
                </Tooltip>
            </div>
        )
    };

    changeEditState(index, isEditable) {
        let data = this.state.data;
        data[index].isEditable = isEditable;
        this.__refreshData(data);
    }

    changeContent(index, value) {
        let data = this.state.data;
        data[index].content = value;
        this.__refreshData(data);
    }

    // onDrag(event) {
    //     if(!this.state.isDragOver) {
    //         this.setState({
    //             isDragOver: true
    //         })
    //     }
    //     event.preventDefault();
    // }

    onDragStart(event, index) {
        if(this.props.isDrag) {
            let data = this.state.data;
            window[TRANS_KEY] = data[index];
            data.splice(index, 1);
        }
    }

    onDragEnter(event) {
        if(this.props.isDrag) {
            if(!this.state.isDragOver) {
                this.setState({
                    isDragOver: true
                })
            }
            event.preventDefault();
        }
    }

    onDragOver(event) {
        if(this.props.isDrag) {
            if(!this.state.isDragOver) {
                this.setState({
                    isDragOver: true
                })
            }
            event.preventDefault();
        }
    }

    onDragLeave(event) {
        if(this.props.isDrag) {
            if(this.state.isDragOver) {
                this.setState({
                    isDragOver: false
                })
            }
            event.preventDefault();
        }
    }

    onDragEnd(event) {
        if(this.props.isDrag) {
            // 拖拽,但没有触发onDrop时的动作
            if(this.state.isDragOver) {
                this.setState({
                    isDragOver: false
                })
            }
            // this.add(window[TRANS_KEY]);
            event.preventDefault();
        }
    }

    onDrop(event) {
        if(this.props.isDrag) {
            if(this.state.isDragOver) {
                this.setState({
                    isDragOver: false
                })
            }
            this.add(window[TRANS_KEY]);
            event.preventDefault();
        }
    }

    getRenderList() {
        let renderList = [];
        let data = this.state.data;
        //  onDrag={(event)=>{this.onDrag(event, key)}}
        data.forEach((eachData, key) => {
            renderList.push(
                eachData.isEditable
                    ? <Input autoFocus
                             key={"edit-"+key}
                             defaultValue={eachData.content}
                             onPressEnter={()=>this.changeEditState(key, false)}
                             onChange={(event)=>this.changeContent(key, event.target.value)}
                             onBlur={()=>{this.changeEditState(key, false); this.deleteIfEmpty(key)}} />
                    : <li className="todo-li"
                          key={"li-"+key}
                          draggable={this.props.isDrag}
                          onDragStart={(event)=>{this.onDragStart(event, key)}}>
                            <div className="li-content"
                                 onClick={()=>this.changeEditState(key, true)}>
                                {eachData.content}</div>
                            <div className="li-tool left">
                                <Tooltip placement="top" title={"置顶"}>
                                    <span className="li-btn" onClick={() => {this.toTop(key)}}><Icon type="to-top"/></span>
                                </Tooltip>
                                <Tooltip placement="top" title={"上移"}>
                                    <span className="li-btn" onClick={() => {this.up(key)}}><Icon type="arrow-up"/></span>
                                </Tooltip>
                                <Tooltip placement="top" title={"下移"}>
                                    <span className="li-btn" onClick={() => {this.down(key)}}><Icon type="arrow-down"/></span>
                                </Tooltip>
                            </div>
                            <div className="li-tool right">
                                <Tooltip placement="top" title={"插入"}>
                                    <span onClick={()=>{this.insert(key)}} className="tool-btn"><Icon type="plus"/></span>
                                </Tooltip>
                                <Tooltip placement="top" title={"删除"}>
                                    <span className="li-btn" onClick={() => {this.delete(key)}}><Icon type="minus"/></span>
                                </Tooltip>
                            </div>
                    </li>
            );
        });
        // this.state.isDragOver
        // && renderList.push(<li className="todo-li drag-over" key="drag-over">{window[TRANS_KEY].content}</li>);
        return renderList;
    }

    render() {
        //  onDragStart={(event)=>{this.onDragStart(event)}}
        return (
            <div className={"todo-container"}
                 onDragEnter={(event)=>{this.onDragEnter(event)}}
                 onDragOver={(event)=>{this.onDragOver(event)}}
                 onDragLeave={(event) => {this.onDragLeave(event)}}
                 onDragEnd={(event)=>{this.onDragEnd(event)}}
                 onDrop={(event)=>{this.onDrop(event)}}>
                {this.getRenderBar()}
                <ul className="todo-list">
                    {
                        this.state.data && this.state.data.length > 0
                            ? this.getRenderList()
                            : <div className="no-content">暂无内容</div>
                    }
                </ul>
                {
                    this.state.isDragOver &&
                    <div className="drag-overlay">
                        <div className="drag-tips"><Icon style={{fontSize: 30}} type="plus"/></div>
                    </div>
                }
            </div>
        );
    }
}

Todo.propTypes = {
    defaultValue: PropTypes.array,
    isStore: PropTypes.bool,
    storeKey: PropTypes.string,
    isDrag: PropTypes.bool
};

export default Todo;
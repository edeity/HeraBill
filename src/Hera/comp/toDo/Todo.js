/**
 * Created by edeity on 2018/2/5.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, Tooltip, Input, Popconfirm, message} from 'antd';
import Type from '../../tools/Type';

import './toDo.css';

const TRANS_KEY = '__dragData';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.__getRenderData(this.props.defaultValue),
            isDragOver: false
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

    empty() {
        this.setState({
            data: []
        })
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
        this.setState({
            data: data
        })
    }

    insert(index) {
        let data = this.state.data;
        data.splice(index + 1, 0, {
            content: '',
            isEditable: true
        });
        this.setState({
            data: data
        });
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
            this.setState({
                data: data
            })
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
            this.setState({
                data: data
            })
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
            this.setState({
                data: data
            })
        }
    }

    delete(index) {
        let data = this.state.data;
        data.splice(index, 1);
        this.setState({
            data: data
        })
    }

    deleteIfEmpty(index) {
        let data = this.state.data;
        if(data[index].content === '') {
            data.splice(index, 1);
            this.setState({
                data: data
            })
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
        this.setState({
            data: data
        });
    }

    changeContent(index, value) {
        let data = this.state.data;
        data[index].content = value;
        this.setState({
            data: data
        });
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
        let data = this.state.data;
        window[TRANS_KEY] = data[index];
        data.splice(index, 1);
        // if(Type.isUndefined(index)) {
        //     if(!this.state.isDragOver) {
        //         this.setState({
        //             isDragOver: true
        //         })
        //     }
        //     event.preventDefault();
        // } else {
        //
        // }
    }

    onDragEnter(event) {
        if(!this.state.isDragOver) {
            this.setState({
                isDragOver: true
            })
        }
        event.preventDefault();
    }

    onDragOver(event) {
        if(!this.state.isDragOver) {
            this.setState({
                isDragOver: true
            })
        }
        event.preventDefault();
    }

    onDragLeave(event) {
        if(this.state.isDragOver) {
            this.setState({
                isDragOver: false
            })
        }
        event.preventDefault();
    }

    onDragEnd(event) {
        if(this.state.isDragOver) {
            this.setState({
                isDragOver: false
            })
        }
        event.preventDefault();
    }

    onDrop(event) {
        if(this.state.isDragOver) {
            this.setState({
                isDragOver: false
            })
        }
        this.add(window[TRANS_KEY]);
        event.preventDefault();
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
                          draggable
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
                            : <div className="no-content">* 暂无内容 *</div>
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
    defaultValue: PropTypes.array
};

export default Todo;
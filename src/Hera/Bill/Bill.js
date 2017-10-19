/**
 * Created by edeity on 12/10/2017.
 */

import React, {Component} from 'react';
import {Button, message} from 'antd';
import {Row} from 'antd';
import {Table} from 'antd';
import Body from './Body';
import Meta from './Meta';
import $ from 'jquery';

const KEY = 'key';
const PK = 'pk';
const AJAX_TIME = '500';

/**
 * 单据表头
 * */
class Bill extends Component {
    constructor(props) {
        super(props);

        let data = this.props.data; // 数据
        let meta = this.props.meta; // 列数据
        
        const keys = Object.keys(meta);
        let columns = [];
        keys.forEach((key) => {
            var tempField = meta[key];
            columns.push({
                title: tempField.desc,
                dataIndex: key,
            })
        });
        this.columns = columns;

        // 设置data和默认值
        this.state = {
            editable: false, // 编辑态是否可编辑
            isList: true, // 是否属于列表态

            allData: data, // 列表态的数据

            selectedData: [], // 模板态勾选的数据
            bodySelectedRowKeys: [], // 卡片态勾选的表体数据key
            bodySelectedData: [], // 卡片态勾选的表体数据

            cardData: {}, // 当前浏览态的数据
            editData: {}, // 当前编辑态的数据

            cardBodyData: {}, // 当前浏览态的表体数据
            editBodyData: {}, // 当前编辑态的表体数据

            waitDblClick: false, // 判断是否属于双击
            firClickIndex: -1 // 第一次点击的索引
        };

        let self = this;

        // 数据动作
        const DATA_ACTION = {
            view2Edit: () => {
                self.setState({
                    editData: $.extend(true, {}, self.state.cardData),
                    cardBodyData: $.extend(true, [], self.state.cardData["bodyData"]),
                    editBodyData: $.extend(true, [], self.state.cardData["bodyData"])
                })
            },
            emptyData: () => {
                self.setState({
                    cardData: {},
                    editData: {},
                    cardBodyData: [],
                    editBodyData: []
                })
            },
            onHeadFieldChanged: (key, value) => {
                let editData = this.state.editData;
                editData[key] = value;
                self.setState({
                    editData: editData
                });
            },
            onBodyFieldChanged: (index, key, value) => {
                let editBodyData = self.state.editBodyData;
                editBodyData[index][key] = value;
                self.setState({
                    editBodyData: editBodyData
                })
            }
        };
        self.DATA_ACTION = DATA_ACTION;

        // 基本视图动作
        // 多选状态
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedData: selectedRows,
                    cardData: selectedRows[0],
                });
            },
        };
        this.rowSelection = rowSelection;
        const VIEW_ACTION = {
            // 单击
            onRowClick: (record, index) => {
                let waitDblEvent = (index) => {
                    self.setState({
                        waitDblClick: true,
                        firClickIndex: index
                    });
                };
                // 取消等待双击
                let resetDblEvent = () => {
                    self.setState({
                        waitDblClick: false,
                        firClickIndex: -1
                    })
                };
                if (index === self.state.firClickIndex && self.state.waitDblClick === true) {
                    VIEW_ACTION.onRowDblClick(record, index);
                    resetDblEvent();
                } else {
                    waitDblEvent(index);
                    setTimeout(resetDblEvent, 500); // 只有500秒内的双击才算是
                }
            },
            // 双击事件
            onRowDblClick: (record, index) => {
                VIEW_ACTION.toCard();
                VIEW_ACTION.canEditable(false);
                self.setState({
                    cardData: record,
                    cardBodyData: record.bodyData,
                    editData: record,
                    editBodyData: record.bodyData,
                });
            },
            // 设置是否可编辑
            canEditable: (editable) => {
                self.setState({
                    editable: editable
                })
            },
            // 跳转到列表太
            toTemplate: () => {
                self.setState({
                    isList: true,
                    editable: false
                })
            },
            // 跳转到卡牌态
            toCard: () => {
                self.setState({
                    isList: false
                })
            },
            reloadAllData: () => {
                let allData = self.state.allData;
                let cardData = self.state.cardData;
                let cardBodyData = self.state.cardBodyData;
                let editHeadPk = cardData[PK];
                allData.forEach((value, index) => {
                    if(value[PK] === editHeadPk) {
                        cardData["bodyData"] = cardBodyData;
                        allData[index] =   cardData;
                    }
                });
                self.setState({
                    allData: allData
                });
            },
            onBodySelected: (selectedRowKeys, selectedRows) => {
                this.setState({
                    bodySelectedRowKeys: selectedRowKeys,
                    bodySelectedData: selectedRows
                })
            }
        };
        self.VIEW_ACTION = VIEW_ACTION;

        // 基本按钮操作
        const BTN_ACTION = {
            head: {
                // 添加
                add: () => {
                    DATA_ACTION.emptyData();
                    VIEW_ACTION.toCard();
                    VIEW_ACTION.canEditable(true);
                },
                delete: ()=> {
                    let deletedData = this.state.selectedData;
                    if (deletedData.length > 0) {
                        const hide = message.loading('删除中', 0);
                        setTimeout(() => {
                            hide();
                            VIEW_ACTION.reloadAllData();
                            message.success('删除成功');
                        }, AJAX_TIME);
                    } else {
                        message.warning('操作错误: 请选择至少一条数据');
                    }
                },
                // 保存
                save: () => {
                    const hide = message.loading('保存中', 0);
                    VIEW_ACTION.canEditable(false);

                    /*********** S ****************/
                    self.props.onSave && self.props.onSave(self.state.editData);
                    /*********** E ****************/

                    // 测试(注意,这部分应该从后台获取,现为测试,暂时默认为editData)
                    self.setState({
                        cardData: this.state.editData,
                        cardBodyData: this.state.editBodyData
                    });
                    setTimeout(() => {
                        hide();
                        message.success('保存成功');
                    }, AJAX_TIME);
                },
            },
            body: {
                onBodyAdd: () => {
                    let editData = self.state.editData;
                    let editBodyData = self.state.editBodyData;
                    if(!editBodyData) {
                        editBodyData = [];
                    }
                    let newBodyData = {};
                    newBodyData["headPk"] = editData[PK];
                    newBodyData["key"] = '' + Math.random();
                    editBodyData.push(newBodyData);
                    self.setState({
                        editBodyData: editBodyData
                    })
                },
                onBodyDelete: () => {
                    let bodySelectedRowKeys = self.state.bodySelectedRowKeys;
                    let editBodyData = self.state.editBodyData;
                    let newBodyData = [];
                    editBodyData.forEach((eachBody) => {
                        let isDelete = bodySelectedRowKeys.some((bodySelectedRowKey) => {
                            if (eachBody[KEY] === bodySelectedRowKey) {
                                return true;
                            }
                            return false;
                        });
                        if (!isDelete) {
                            newBodyData.push(eachBody);
                        }
                    });
                    self.setState({
                        editBodyData: newBodyData
                    })
                },
            },
            // 取消
            cancel: () => {
                VIEW_ACTION.canEditable(false);
                DATA_ACTION.view2Edit();
            },
            // 返回
            back: () => {
                VIEW_ACTION.toTemplate();
                VIEW_ACTION.reloadAllData();
            },
            listModify: () => {
                self.setState({
                    cardBodyData: self.cardBodyData,
                    editBodyData: self.cardBodyData
                })
                BTN_ACTION.modify();
            },
            // 修改
            modify: () => {
                let cardData = self.state.cardData;
                if (cardData && cardData[PK]) {
                    VIEW_ACTION.toCard();
                    VIEW_ACTION.canEditable(true);
                    DATA_ACTION.view2Edit();
                } else {
                    message.warning('操作错误: 请选择至少一条数据');
                }
            },
        };
        self.BTN_ACTION = BTN_ACTION;
    }


    // 渲染视图
    render() {
        let meta = this.props.meta;
        let keys = Object.keys(meta);
        return (
            <div className="bill">
                <Row type="flex" justify="end">
                    {
                        this.state.isList
                            // 列表-编辑态按钮组
                            ? (
                            <Button.Group>
                                <Button onClick={this.BTN_ACTION.head.add}>新增</Button>
                                <Button onClick={this.BTN_ACTION.listModify}>修改</Button>
                                {/*<Button>复制</Button>*/}
                                <Button onClick={this.BTN_ACTION.head.delete}>删除</Button>
                            </Button.Group>
                        )
                            : (
                            this.state.editable
                                // 卡片-编辑态按钮组
                                ?
                                <Button.Group>
                                    <Button onClick={this.BTN_ACTION.head.save}>保存</Button>
                                    <Button onClick={this.BTN_ACTION.cancel}>取消</Button>
                                    <Button onClick={this.BTN_ACTION.back}>返回</Button>
                                </Button.Group>
                                // 卡片-浏览态按钮组
                                :
                                <Button.Group>
                                    <Button onClick={this.BTN_ACTION.modify}>修改</Button>
                                    {/*<Button>复制</Button>*/}
                                    {/*<Button>删除</Button>*/}
                                    <Button onClick={this.BTN_ACTION.back}>返回</Button>
                                </Button.Group>
                        )
                    }
                </Row>
                {
                    this.state.isList
                        ? (<div className="list-panel">
                        <Table
                            rowSelection={this.rowSelection}
                            columns={this.columns}
                            dataSource={this.state.allData}
                            onRowClick={this.VIEW_ACTION.onRowClick}
                            size="middle"/>
                    </div>)
                        : (
                        <div className="card-panel">
                            <Row gutter={16}>
                                {
                                    keys.map((key) => {
                                        return <Meta key={key} field={key} meta={meta[key]} cardValue={this.state.cardData[key]}
                                                     editable={this.state.editable} editValue={ this.state.editData[key]}
                                                     onChange={this.DATA_ACTION.onHeadFieldChanged}/>
                                    })
                                }
                            </Row>
                            {
                                this.props.bodyMeta &&
                                <Body meta={this.props.bodyMeta} editable={this.state.editable}
                                      cardData={this.state.cardBodyData} editData={this.state.editBodyData}
                                      selected={this.VIEW_ACTION.onBodySelected}
                                      onBodyFieldChanged={this.DATA_ACTION.onBodyFieldChanged}
                                      add={this.BTN_ACTION.body.onBodyAdd} delete={this.BTN_ACTION.body.onBodyDelete}
                                />
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Bill;
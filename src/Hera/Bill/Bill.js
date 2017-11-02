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
        let meta = this.props.headMeta; // 列数据
        
        const keys = Object.keys(meta);
        let columns = []; // 列表态的表头
        keys.forEach((key) => {
            var tempField = meta[key];
            columns.push({
                key: key,
                title: tempField.desc,
                dataIndex: key,
            })
        });
        // 最后一列为动作列
        columns.push({
            title: '操作',
            key: 'hera-bill-operation',
            fixed: 'right',
            width: 100,
            render: (text, record, index) =>   <a onClick={() => BTN_ACTION.head.edit(index)}>修改</a>
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
                edit: (index) => {
                    let selectedData = [];
                    let editData = this.state.allData[index];
                    selectedData.push(editData);
                    this.setState({
                        selectedData: selectedData,
                        cardData: editData,
                        // cardBodyData: self.cardBodyData,
                        // editBodyData: self.cardBodyData
                    }, BTN_ACTION.modify);
                },
                delete: ()=> {
                    let deletedData = this.state.selectedData;
                    if (deletedData.length > 0) {
                        const hide = message.loading('删除中', 0);

                        self.props.onDelete && self.props.onDelete(deletedData);

                        setTimeout(() => {
                            hide();
                            message.success('保存成功');
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
            },
            // 修改
            modify: () => {
                let cardData = this.state.cardData;
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
        let meta = this.props.headMeta;
        let keys = Object.keys(meta);
        let isEditable = this.state.editable;
        let bodyData = isEditable ? this.state.editBodyData : this.state.cardBodyData;
        return (
            <div className="bill">
                <Row type="flex" justify="end" style={{ marginBottom: 16 }}>
                    {
                        this.state.isList
                            // 列表-编辑态按钮组
                            ? (
                            <Button.Group>
                                <Button onClick={this.BTN_ACTION.head.add}>新增</Button>
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
                            scroll={{ x: 1000, y: 500 }}
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
                                        let value = this.state.editable ? this.state.cardData[key] : this.state.editData[key];
                                        return <Meta key={key}
                                                     field={key}
                                                     meta={meta[key]}
                                                     value={ value }
                                                     editable={ isEditable }
                                                     onChange={this.DATA_ACTION.onHeadFieldChanged}/>
                                    })
                                }
                            </Row>
                            {

                                this.props.bodyMeta &&
                                <Body meta={this.props.bodyMeta}
                                      editable={ isEditable }
                                      data={ bodyData }
                                      selected={this.VIEW_ACTION.onBodySelected}
                                      onBodyFieldChanged={this.DATA_ACTION.onBodyFieldChanged}
                                      add={this.BTN_ACTION.body.onBodyAdd}
                                      delete={this.BTN_ACTION.body.onBodyDelete}
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
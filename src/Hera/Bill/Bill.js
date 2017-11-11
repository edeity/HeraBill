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
import dm from '../Tools/DefaultMeta';
import dv from '../Tools/DefaultValue';

const KEY = 'key';
const PK = 'pk';
const BODY_DATA = "bodyData";
let nKey = [];
nKey.push(BODY_DATA);

/**
 * 单据表头
 * */
class Bill extends Component {
    constructor(props) {
        super(props);

        // 构建表头列
        this.headMeta = dm.createMeta(this.props.headMeta);
        this.bodyMeta = dm.createMeta(this.props.bodyMeta);

        this.columns = this.getHeadColumns(this.headMeta);

        // 设置data和默认值
        this.state = {
            editable: false, // 编辑态是否可编辑
            isList: true, // 是否属于列表态

            headMeta: this.headMeta,
            bodyMeta: this.bodyMeta,

            allData: [], // 列表态的数据

            selectedData: [], // 模板态勾选的数据
            bodySelectedRowKeys: [], // 卡片态勾选的表体数据key
            bodySelectedData: [], // 卡片态勾选的表体数据

            cardData: {}, // 当前浏览态的数据
            editData: {}, // 当前编辑态的数据
            cardBodyData: {}, // 当前浏览态的表体数据
            editBodyData: {}, // 当前编辑态的表体数据
        };

        let self = this;

        // 以下对应的具体操作需要好好分类
        // 数据动作
        const DATA_ACTION = {
            // 卡牌态 : 浏览态 -> 编辑态
            view2Edit: () => {
                self.setState({
                    editData: $.extend(true, {}, self.state.cardData),
                    editBodyData: $.extend(true, [], self.state.cardBodyData)
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
                let keyData = editData[key];
                editData[key] = keyData || dv.createSingleValue();
                editData[key].value = value;
                self.setState({
                    editData: editData
                });
            },
            onBodyFieldChanged: (index, key, value) => {
                let editBodyData = self.state.editBodyData;
                let keyData = editBodyData[index][key];
                if(typeof keyData === 'undefined') {
                    editBodyData[index][key] = dv.createSingleValue();
                }
                editBodyData[index][key].value = value;
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
                    cardData: dv.createValue(selectedRows[0], nKey),
                    cardBodyData: dv.createArrayValue(selectedRows[0][BODY_DATA])
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
            query: (queryCondition) => {
                const hide = message.loading('查询中', 0);
                this.props.onQuery(queryCondition, (res) => {
                    if (res.success) {
                        hide();
                        if (res.data) {
                            var resData = res.data;
                            resData.forEach((eachData) => {
                                eachData[KEY] = eachData[PK];
                            });
                            self.setState({
                                allData: resData
                            });
                        } else {
                            message.success('后台暂无数据');
                        }
                    } else {
                        hide();
                        message.error('查询失败: ' + res.error);
                    }
                });
            },
            head: {
                // 添加
                add: () => {
                    DATA_ACTION.emptyData();
                    VIEW_ACTION.toCard();
                    VIEW_ACTION.canEditable(true);
                },
                edit: (index) => {
                    BTN_ACTION.details(index, BTN_ACTION.modify);
                },
                delete: ()=> {
                    let deletedData = this.state.selectedData;
                    if (deletedData.length > 0) {
                        const hide = message.loading('删除中', 0);

                        self.props.onDelete && self.props.onDelete(deletedData,
                            (res)=> {
                                hide();
                                if (res.success) {
                                    message.success(res.data);
                                } else {
                                    message.success(res.error);
                                }
                                self.BTN_ACTION.query();
                            });
                    } else {
                        message.warning('操作错误: 请选择至少一条数据');
                    }
                },
                // 保存
                save: () => {
                    const hide = message.loading('保存中', 0);

                    var editData = dv.reduction(self.state.editData);
                    var editBodyData = dv.reductionArray(self.state.editBodyData);
                    editData[BODY_DATA] = editBodyData;

                    // 进行基本的字段校验
                    var isValidate = self.validateHead(editData) && self.validateBody(editBodyData);
                    if(isValidate) {
                        self.props.onSave
                            ? self.props.onSave(editData,
                            (res)=> {
                                if (res.success) {
                                    hide();
                                    message.success('保存成功');
                                    VIEW_ACTION.canEditable(false);
                                    self.setState({
                                        cardData: self.state.editData,
                                        cardBodyData: self.state.editBodyData
                                    });
                                } else {
                                    hide();
                                    message.error(res.error);
                                    VIEW_ACTION.canEditable(false);
                                }
                            })
                            : console.warn('请在<Bill>中实现onSave方法');
                    } else {
                        hide();
                        message.error('保存失败, 相应的校验未能通过');
                    }
                },
            },
            body: {
                onBodyAdd: () => {
                    let editData = self.state.editData;
                    let editBodyData = self.state.editBodyData;
                    if (!editBodyData) {
                        editBodyData = [];
                    }
                    let newBodyData = {};
                    newBodyData["headPk"] = editData[PK] ? editData[PK].value : '';
                    newBodyData["key"] = '' + Math.random();
                    editBodyData.push(dv.createValue(newBodyData));
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
                self.BTN_ACTION.query();
            },
            // 修改
            modify: () => {
                VIEW_ACTION.canEditable(true);
            },
            // 进入详情页
            details: (index, callback) => {
                let selectedData = [];
                let cardData = dv.createValue(this.state.allData[index], nKey);
                let cardBodyData = dv.createArrayValue(this.state.allData[index][BODY_DATA]);
                selectedData.push(cardData);
                this.setState({
                    selectedData: selectedData,
                    cardData: cardData,
                    cardBodyData: cardBodyData
                }, () => {
                    let cardData = this.state.cardData;
                    if (cardData && cardData[PK] && cardData[PK].value) {
                        VIEW_ACTION.toCard();
                        DATA_ACTION.view2Edit();
                        $.isFunction(callback) && callback()
                    } else {
                        message.warning('操作错误: 请选择至少一条数据');
                    }
                });
            }
        };
        self.BTN_ACTION = BTN_ACTION;
    }

    getHeadColumns = () => {
        const keys = Object.keys(this.headMeta);
        let columns = []; // 列表态的表头
        keys.forEach((key) => {
            var tempField = this.headMeta[key];
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
            render: (text, record, index) => {
                return <div className="row-btn">
                    <a onClick={() => this.BTN_ACTION.details(index)}>浏览</a>
                    <span> | </span>
                    <a onClick={() => this.BTN_ACTION.head.edit(index)}>修改</a>
                </div>
            }
        });

        return columns;
    };

    isNull = (data) => {
        return !data || (data.trim && data.trim === '');
    };

    validate = (meta, data) => {
        let matchReg = meta.matchReg;
        let matchFun = meta.matchFun;
        if (meta.validate.required === true && this.isNull(data)) {
            return false;
        } else if(matchReg) {
            return matchReg(data);
        } else if($.isFunction(matchFun)) {
            return matchFun(data);
        }
        return true;
    };
    validateHead = (headData) => {
        let headMeta = this.headMeta;
        let realHeadData = this.state.editData;
        let headKey = Object.keys(headMeta);
        let isValidate = true;
        headKey.forEach((eachKey) => {
            if(!this.validate(headMeta[eachKey], headData[eachKey])) {
                realHeadData[eachKey].__isValidate = false;
                isValidate = false;
            }
        });
        if(!isValidate) {
            this.setState({
                editHead: realHeadData
            });
        }
        return isValidate;
    };
    validateBody = (bodyData) => {
        let bodyMeta = this.bodyMeta;
        let realBodyData = this.state.editBodyData;
        let bodyKey = Object.keys(bodyMeta);
        let isValidate = true;
        bodyKey.forEach((eachKey) => {
            bodyData.forEach((eachBodyData, index) => {
                if(!this.validate(bodyMeta[eachKey], eachBodyData[eachKey])) {
                    realBodyData[index][eachKey].__isValidate = false;
                    isValidate = false;
                }
            })
        });
        if(!isValidate) {
            this.setState({
                editBodyData: realBodyData
            });
        }
        return isValidate;
    };

    componentDidMount = () => {
        if (this.props.isQuery) {
            this.BTN_ACTION.query();
        }
    };


    // 渲染视图
    render() {
        let self = this;
        let meta = this.headMeta;
        let keys = Object.keys(meta);
        let isEditable = this.state.editable;
        let bodyData = isEditable ? this.state.editBodyData : this.state.cardBodyData;
        return (
            <div className="hera-bill">
                <Row type="flex" justify="end" style={{ marginBottom: 16 }}>
                    {
                        this.state.isList
                            // 列表-编辑态按钮组
                            ? (
                            <Button.Group>
                                <Button onClick={this.BTN_ACTION.query}>查询</Button>
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
                                        let fieldData = self.state.editable ? self.state.editData[key] : self.state.cardData[key];
                                        return <Meta key={key}
                                                     field={key}
                                                     meta={meta[key]}
                                                     data={ fieldData }
                                                     editable={ isEditable }
                                                     onChange={this.DATA_ACTION.onHeadFieldChanged}/>
                                    })
                                }
                            </Row>
                            {

                                this.bodyMeta &&
                                <Body meta={this.bodyMeta}
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
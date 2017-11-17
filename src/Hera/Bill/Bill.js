/**
 * Created by edeity on 12/10/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, message, Collapse, Table, Alert} from 'antd';
import Body from './Body';
import Meta from './Meta';

import $ from 'jquery';
import dm from '../Tools/DefaultMeta';
import dv from '../Tools/DefaultValue';

const Panel = Collapse.Panel;

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

        let self = this;

        // 构建表头列

        this.headMeta = dm.createMeta(this.props.headMeta);
        this.queryMeta = dm.createMeta(this.props.headMeta, {editable: true});
        this.props.bodyMeta && ( this.bodyMeta = dm.createMeta(this.props.bodyMeta));

        this.columns = this.getHeadColumns(this.headMeta);
        this.validateHeadTips = [];
        this.validateBodyTips = [];

        // 设置data和默认值
        this.state = {
            editable: false, // 编辑态是否可编辑
            isList: true, // 是否属于列表态

            allData: [], // 列表态的数据

            selectedData: [], // 模板态勾选的数据
            bodySelectedRowKeys: [], // 卡片态勾选的表体数据key
            bodySelectedData: [], // 卡片态勾选的表体数据

            queryData: {}, // 查询的数据
            cardData: {}, // 当前浏览态的数据
            editData: {}, // 当前编辑态的数据
            cardBodyData: {}, // 当前浏览态的表体数据
            editBodyData: {}, // 当前编辑态的表体数据

            errorMsg: '', // 保存失败的错误信息
        };

        // 暴露给外界的接口
        let TABLE = {
            __headData: {},
            __bodyData: [],
            __emptyData: function () {
                TABLE.__headData = {};
                TABLE.__bodyData = {};
            },
            __getChangedHeadData: function () {
                return TABLE.__headData;
            },
            __getChangedBodyData: function () {
                return TABLE.__bodyData;
            },
            setHeadValue: function (key, value) {
                TABLE.__headData[key] = value;
            },
            setBodyValue: function (key, value, index) {
                TABLE.__bodyData[index] = TABLE.__bodyData[index] || {};
                TABLE.__bodyData[index][key] = value;
            },
            getHeadValue: function (key) {
                return dv.reduction(self.state.editData[key]);
            },
            getBodyValue: function (key, index) {
                return dv.reduction(self.editBodyData[index][key]);
            }
        };


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
            // 清空数据(一般作用于新增)
            emptyData: () => {
                self.setState({
                    cardData: {},
                    editData: {},
                    cardBodyData: [],
                    editBodyData: []
                })
            },
            // 当查询区域表头发生变化时触发动作
            onQueryHeadFieldChanged: (key, value) => {
                let queryData = this.state.queryData;
                let keyData = queryData[key];
                queryData[key] = keyData || dv.createSingleValue();
                queryData[key].value = value;
                self.setState({
                    queryData: queryData
                })
            },
            // 当编辑区域表头发生变化时触发动作
            onHeadFieldChanged: (key, value) => {
                let editData = this.state.editData;
                let keyData = editData[key];
                editData[key] = keyData || dv.createSingleValue();
                editData[key].value = value;
                // 假如用户监听了字段变更事件
                if (this.props.onHeadFieldChanged) {
                    this.props.onHeadFieldChanged(key, value, TABLE);
                    let changedData = TABLE.__getChangedHeadData();
                    let keys = Object.keys(changedData);
                    keys.forEach(function (eachKey) {
                        editData[eachKey] = dv.createSingleValue(changedData[eachKey]);
                    })
                }

                self.setState({
                    editData: editData
                });
            },
            // 当编辑区域表体发生变化时触发动作
            onBodyFieldChanged: (key, value, index) => {
                let editBodyData = self.state.editBodyData;
                let keyData = editBodyData[index][key];
                if (typeof keyData === 'undefined') {
                    editBodyData[index][key] = dv.createSingleValue();
                }
                editBodyData[index][key].value = value;
                if (this.props.onBodyFieldChanged) {
                    this.props.onBodyFieldChanged(key, value, index, TABLE);
                    let changedData = TABLE.__getChangedBodyData();
                    changedData.forEach(function (eachBodyData, index) {
                        let keys = Object.keys(eachBodyData);
                        keys.forEach(function (eachKey) {
                            editBodyData[index][eachKey] = dv.createSingleValue(changedData[index][eachKey]);
                        })
                    })
                }
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
            reset: () => {
                let queryData = dv.createValueByMeta(self.props.headMeta);
                self.setState({
                    queryData: queryData
                })
            },
            query: () => {
                const hide = message.loading('查询中', 0);
                this.props.onQuery(dv.reduction(this.state.queryData), (res) => {
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
                    self.emptyValidateTips();
                    var isValidate = self.validateHead(editData) & self.validateBody(editBodyData); // & 同时校验表头表体
                    if (isValidate) {
                        self.props.onSave
                            ? self.props.onSave(editData,
                            (res)=> {
                                if (res.success) {
                                    hide();
                                    message.success('保存成功');
                                    VIEW_ACTION.canEditable(false);
                                    self.setState({
                                        cardData: dv.createValue(res.data),
                                        cardBodyData: dv.createArrayValue(res.data[BODY_DATA])
                                    });
                                } else {
                                    hide();
                                    message.error(res.error);
                                    VIEW_ACTION.canEditable(false);
                                }
                                self.setState({
                                    errorMsg: ''
                                });
                            })
                            : console.warn('请在<Bill>中实现onSave方法');
                    } else {
                        hide();
                        let errorMsg = '字段校验不通过: ';
                        if (self.validateHeadTips.length > 0) {
                            errorMsg += '表头：' + self.validateHeadTips.join('，');
                            errorMsg += '；';
                        }
                        if (self.validateBodyTips.length > 0) {
                            errorMsg += '表体：' + self.validateBodyTips.join('，');
                        }
                        message.error('保存失败: 校验不通过');
                        self.setState({
                            errorMsg: errorMsg
                        });
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
                self.emptyValidateTips();
            },
            // 返回
            back: () => {
                VIEW_ACTION.toTemplate();
                self.BTN_ACTION.query();
                self.emptyValidateTips();
            },
            // 修改
            modify: () => {
                DATA_ACTION.view2Edit();
                VIEW_ACTION.canEditable(true);
            },
            // 进入详情页
            details: (index, callback) => {
                let selectedData = [];
                let cardData = dv.createValue(this.state.allData[index], nKey);
                let cardBodyData = dv.createArrayValue(this.state.allData[index][BODY_DATA]);
                // selectedData.push(cardData);
                this.setState({
                    // selectedData: selectedData,
                    cardData: cardData,
                    cardBodyData: cardBodyData
                }, () => {
                    let cardData = this.state.cardData;
                    if (cardData && cardData[PK] && cardData[PK].value) {
                        VIEW_ACTION.toCard();
                        $.isFunction(callback) && callback()
                    } else {
                        message.warning('操作错误: 请选择至少一条数据');
                    }
                });
            }
        };
        self.BTN_ACTION = BTN_ACTION;
    }

    componentDidMount = () => {
        if (this.props.isQuery) {
            this.BTN_ACTION.query();
        }
    };

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
        return data === null || typeof data === 'undefined' || (data.trim && data.trim === '');
    };

    emptyValidateTips = () => {
        this.validateHeadTips = [];
        this.validateBodyTips = [];
        this.setState({
            errorMsg: ''
        })
    };
    addValidateHeadTips = (eachHeadMeta) => {
        let tips = eachHeadMeta.validate && eachHeadMeta.validate.matchTips ? ' : ' + eachHeadMeta.validate.matchTips : '';
        this.validateHeadTips.push(`【${eachHeadMeta.desc}】${ tips }`)
    };
    addValidateBodyTips = (eachBodyMeta) => {
        let tips = eachBodyMeta.validate && eachBodyMeta.validate.matchTips ? ' : ' + eachBodyMeta.validate.matchTips : '';
        this.validateBodyTips.push(`【${eachBodyMeta.desc}】${ tips }`)
    };
    validate = (meta, data) => {
        let matchReg = meta.validate.matchReg;
        let matchFun = meta.validate.matchFun;
        if (meta.validate.required === true && this.isNull(data)) {
            return false;
        } else if (matchReg) {
            return matchReg.test(data);
        } else if ($.isFunction(matchFun)) {
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
            realHeadData[eachKey] = realHeadData[eachKey] || dv.createSingleValue();
            if (!this.validate(headMeta[eachKey], headData[eachKey])) {
                realHeadData[eachKey].__isValidate = false;
                this.addValidateHeadTips(headMeta[eachKey]);
                isValidate = false;
            } else {
                realHeadData[eachKey].__isValidate = true;
            }
        });
        if (!isValidate) {
            this.setState({
                editHead: realHeadData
            });
        }
        return isValidate;
    };
    validateBody = (bodyData) => {
        if (this.bodyMeta) {
            let bodyMeta = this.bodyMeta;
            let realBodyData = this.state.editBodyData;
            let bodyKey = Object.keys(bodyMeta);
            let isValidate = true;
            bodyKey.forEach((eachKey) => {
                bodyData.forEach((eachBodyData, index) => {
                    realBodyData[index][eachKey] = realBodyData[index][eachKey] || dv.createSingleValue();
                    if (!this.validate(bodyMeta[eachKey], eachBodyData[eachKey])) {
                        this.addValidateBodyTips(bodyMeta[eachKey])
                        realBodyData[index][eachKey].__isValidate = false;
                        isValidate = false;
                    } else {
                        realBodyData[index][eachKey].__isValidate = true;
                    }
                })
            });
            if (!isValidate) {
                this.setState({
                    editBodyData: realBodyData
                });
            }
            return isValidate;
        } else {
            return true; // 不需要校验表体
        }

    };

    // 渲染视图
    render() {
        let self = this;
        let isEditable = this.state.editable;
        let bodyData = isEditable ? this.state.editBodyData : this.state.cardBodyData;
        return (
            <div className="hera-bill">
                {
                    this.state.isList
                        ? (
                        <div className="list-panel">
                            <Row gutter={16}>
                                <Col span="8" style={{ padding: 10 }}>
                                    <h2 style={{ float: 'left' }}>卡片列表</h2>
                                </Col>
                                <Col span="16">
                                    <Row type="flex" justify="end" gutter={16}>
                                        {
                                            <Button.Group>
                                                <Button type="primary" onClick={this.BTN_ACTION.head.add}>新增</Button>
                                                <Button onClick={this.BTN_ACTION.head.delete}>删除</Button>
                                            </Button.Group>
                                        }
                                    </Row>
                                </Col>
                            </Row>
                            <Collapse activeKey={['search', 'list']}>
                                <Panel header="查询" key="search">
                                    <Row gutter={16}>
                                        {
                                            Object.keys(self.queryMeta).map((key) => {
                                                return <Meta key={'query-' + key}
                                                             field={key}
                                                             meta={ self.queryMeta[key] }
                                                             data={ self.state.queryData[key] }
                                                             editable={true}
                                                             onChange={this.DATA_ACTION.onQueryHeadFieldChanged}/>
                                            })
                                        }
                                        <Button.Group style={{ float: 'right' }}>
                                            <Button onClick={this.BTN_ACTION.query}>查询</Button>
                                            <Button onClick={this.BTN_ACTION.reset}>重置</Button>
                                        </Button.Group>
                                    </Row>
                                </Panel>
                                <Panel header="列表" key="list">
                                    <Table
                                        /*scroll={{ x: 1000, y: 500 }}*/
                                        rowSelection={this.rowSelection}
                                        columns={this.columns}
                                        dataSource={this.state.allData}
                                        onRowClick={this.VIEW_ACTION.onRowClick}
                                        size="middle"
                                    />
                                </Panel>
                            </Collapse>
                        </div>
                    )
                        : (
                        <div className="card-panel">
                            {
                                this.state.errorMsg &&
                                <Alert style={{marginBottom: 10}}
                                       message="保存失败"
                                       banner showIcon
                                       type="error"
                                       description={this.state.errorMsg}
                                />}
                            <Row gutter={16}>
                                <Col span="8" style={{ padding: 10 }}><h2 style={{ float: 'left' }}>编辑列表</h2></Col>
                                <Col span="16">
                                    <Row type="flex" justify="end" gutter={16}>
                                        {
                                            this.state.editable
                                                // 卡片-编辑态按钮组
                                                ?
                                                <Button.Group>
                                                    <Button type="primary"
                                                            onClick={this.BTN_ACTION.head.save}>保存</Button>
                                                    <Button onClick={this.BTN_ACTION.cancel}>取消</Button>
                                                    <Button onClick={this.BTN_ACTION.back}>返回</Button>
                                                </Button.Group>
                                                // 卡片-浏览态按钮组
                                                :
                                                <Button.Group>
                                                    <Button type="primary" onClick={this.BTN_ACTION.modify}>修改</Button>
                                                    {/*<Button>复制</Button>*/}
                                                    {/*<Button>删除</Button>*/}
                                                    <Button onClick={this.BTN_ACTION.back}>返回</Button>
                                                </Button.Group>
                                        }
                                    </Row>
                                </Col>
                            </Row>
                            {/*编辑 S*/}
                            <Collapse activeKey={['head', 'body']}>
                                <Panel header="表头" key="head">
                                    <Row gutter={16}>
                                        {
                                            Object.keys(self.headMeta).map((key) => {
                                                let fieldData = self.state.editable ? self.state.editData[key] : self.state.cardData[key];
                                                return <Meta key={'card-' + key}
                                                             field={key}
                                                             meta={self.headMeta[key]}
                                                             data={ fieldData }
                                                             editable={ isEditable }
                                                             onChange={this.DATA_ACTION.onHeadFieldChanged}/>
                                            })
                                        }
                                    </Row>
                                </Panel>
                                {
                                    this.bodyMeta &&
                                    <Panel header="表体" key="body">
                                        <Body meta={this.bodyMeta}
                                              editable={ isEditable }
                                              data={ bodyData }
                                              selected={this.VIEW_ACTION.onBodySelected}
                                              onBodyFieldChanged={this.DATA_ACTION.onBodyFieldChanged}
                                              add={this.BTN_ACTION.body.onBodyAdd}
                                              delete={this.BTN_ACTION.body.onBodyDelete}
                                        />
                                    </Panel>
                                }
                            </Collapse>
                            {/*编辑 E*/}
                        </div>
                    )
                }
            </div>
        )
    }
}

Bill.propTypes = {
    // 表名
    tableId: PropTypes.string.isRequired,
    // 表头字段描述
    headMeta: PropTypes.object.isRequired,
    // 表体字段描述
    bodyMeta: PropTypes.object,
    // 首次加载是查询
    isQuery: PropTypes.bool,
    // 查询按钮触发事件
    onQuery: PropTypes.func.isRequired,
    // 删除按钮触发事件
    onDelete: PropTypes.func.isRequired,
    // 保存按钮触发事件
    onSave: PropTypes.func.isRequired,
    // 当表头字段改变触发事件
    onHeadFieldChanged: PropTypes.func,
    // 当表体字段改变触发事件
    onBodyFieldChanged: PropTypes.func
};

export default Bill;
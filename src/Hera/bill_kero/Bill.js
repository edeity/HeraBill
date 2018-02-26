import React, {Component} from 'react';

import QueryModule from './module/QueryModule';
import ListModule from './module/ListModule';
import CardModule from './module/CardModule';
import DataTable from './data/DataTable';
import PropTypes from 'prop-types';
import Type from '../tools/Type';
import Log from '../tools/Log';
import {message} from 'antd';

const PK = 'pk';

class Bill extends Component {
    constructor(props) {
        super(props);

        // 构造 查询, 列表, 卡片三种状态的DataTable
        this.queryTable = new DataTable(props.headMeta, this.__getRefreshHandle);
        this.listTable = new DataTable(props.headMeta, this.__getRefreshHandle);
        this.cardTable = new DataTable(props.headMeta, this.__getRefreshHandle);
        this.__cacheCardTabelData = null; // 用来暂存取消时的副本
        this.__cacheCardBodyTabelData = new Map(); // 用来暂存取消的表体副本
        this.queryTable.createEmptyRow(); // 默认查询区域有空行

        // 构造表体状态的DataTable
        this.cardBodyTableMap = new Map();
        if (props.bodyMeta) {
            let keys = Object.keys(props.bodyMeta);
            keys.forEach((eachBodyKey) => {
                if (this.cardBodyTableMap.get(eachBodyKey)) {
                    Log.error('bodyMeta error, key should be unique, that is more than one : ' + eachBodyKey);
                } else {
                    let eachBodyMeta = props.bodyMeta[eachBodyKey];
                    this.cardBodyTableMap.set(eachBodyKey, new DataTable(eachBodyMeta, this.__getRefreshHandle));
                }
            })
        }

        this.isMount = false;
        // state状态
        this.state = {
            isNew: false, // 是否是新增态
            isList: true, // 是否为列表态
            editable: false, // 是否可编辑,一般仅针对Card形态,
            refresh: Symbol(),
        }
    }

    componentWillMount = () => {
        this.isMount = true;
        this.props.onInit(this.queryTable, this.listTable, this.cardTable, this.cardBodyTableMap);
        if (this.props.isQuery) {
            this.onQuery();
        }
    };

    componentWillUnMount = () => {
        this.isMount = false;
    };

    __getRefreshHandle = () => {
        return () => {
            if(this.isMount) {
                this.setState({
                    refresh: Symbol()
                });
            }
        }
    };


    /**
     * 新增
     */
    onNew = () => {
        this.cardTable.createEmptyRow();
        this.__toNewMode();
        this.__canEditable();
    };

    /**
     * 浏览
     */
    onReview = (reviewMsg) => {
        let modifyData;
        if(Type.isNumber(reviewMsg)) {
            // 通过列表点击的预览
            let reviewRow = this.listTable.getRowByIndex(reviewMsg);
            modifyData = reviewRow.getSimpleData();
        } else if(Type.isObject(reviewMsg)) {
            // 通过跳转或后天刷新的预览
            modifyData = reviewMsg;
        }
        this.cardTable.setSimpleData(modifyData);
        this.__toEditMode();
        this.__cannotEditable();
        this.onBodyQuery();
    };

    /**
     * 卡牌态的修改
     */
    onCardModify = () => {
        this.__cacheCardTabelData = this.cardTable.getSimpleData();
        this.__canEditable();
    };

    onBodyQuery = () => {
        let queryCondition = {};
        queryCondition["headPk"] = this.cardTable.getCurrentRow().getSimpleData()[PK];
        for(let eachKey of this.cardBodyTableMap.keys()) {
            this.props.onBodyQuery(eachKey, queryCondition, this.cardBodyTableMap.get(eachKey), (data)=> {
                this.__cacheCardBodyTabelData.set(eachKey, data); // 缓存表体
            })
        }
    };


    /**
     * 删除
     */
    onDelete = (index) => {
        let deleteRow = this.listTable.getRowByIndex(index);
        let deleteData = deleteRow.getSimpleData();
        this.props.onDelete && this.props.onDelete([deleteData], (res) => {
            if (res.success) {
                this.onQuery();
            } else {
                message.error('删除失败 : ' + res.error)
            }
        });

    };

    /**
     * 查询
     */
    onQuery = () => {
        let queryCondition = this.queryTable.getCurrentRow().getSimpleData();
        this.props.onQuery(queryCondition, this.listTable, (res)=> {
        })
    };

    /**
     * 列表态的修改
     */
    onListModify = (index) => {
        this.onReview(index);
        this.onCardModify();
    };

    /**
     * 保存
     */
    onSave = () => {
        this.props.onSave(this.cardTable, this.cardBodyTableMap, (data) => {
            this.onReview(data);
        });
    };

    /**
     * 重置
     */
    onReset = () => {
        this.queryTable.removeAllRows();
    };

    /**
     * 取消
     */
    onCancel = () => {
        this.cardTable.setSimpleData(this.__cacheCardTabelData);
        for(let key of this.__cacheCardBodyTabelData.keys()) {
            let tempBodyTable = this.cardBodyTableMap.get(key);
            tempBodyTable.setSimpleData(this.__cacheCardBodyTabelData.get(key));
        }
        this.__cannotEditable();
    };

    /**
     * 返回
     */
    onReturn = () => {
        this.cardTable.removeAllRows();
        for (let eachBodyTable of this.cardBodyTableMap.values()) {
            eachBodyTable.removeAllRows();
        }
        this.__cannotEditable();
        this.__toList();
        this.onQuery();
    };

    static handleRes = (res, successMsg, callback) => {
        if(res.success) {
            Type.isFunction(callback) && callback(res.data);
            successMsg && message.success(successMsg);
        } else {
            Log.error(res.error);
            message.error(res.error);
        }
    };

    __toList = () => {
        this.setState({
            isList: true
        })
    };

    __toNewMode = () => {
        this.setState({
            isList: false,
            isNew: true,
        })
    };

    __toEditMode = () => {
        this.setState({
            isList: false,
            isNew: false,
        })
    };

    __canEditable = () => {
        this.setState({
            editable: true
        })
    };

    __cannotEditable = () => {
        this.setState({
            editable: false
        })
    };

    render() {
        return <div className="hera-bill">
            {this.state.isList ?
                <div id="list-panle">
                    <QueryModule
                        dataTable={this.queryTable}
                        uniqKey={this.cardTable.__getRefreshKey()}
                        onQuery={this.onQuery}
                        onReset={this.onReset}
                        onNew={this.onNew}/>
                    <ListModule
                        tableId="list"
                        dataTable={this.listTable}
                        uniqKey={this.listTable.__getRefreshKey()}
                        btnInLine
                        onReview={this.onReview}
                        onDelete={this.onDelete}
                        onModify={this.onListModify}/>
                </div>
                : <div id="card-panel">
                <CardModule
                    dataTable={this.cardTable}
                    bodyTableMap={this.cardBodyTableMap}
                    bodyTableAttr={this.props.bodyTableAttr}
                    editable={this.state.editable}
                    isNewMode={this.state.isNew}
                    onSave={this.onSave}
                    onModify={this.onCardModify}
                    onCancel={this.onCancel}
                    onReturn={this.onReturn}/>
            </div>
            }
        </div>
    }
}

Bill.propTypes = {
    tableId: PropTypes.string.isRequired,
    headMeta: PropTypes.object.isRequired,
    bodyMeta: PropTypes.object,
    bodyTableAttr: PropTypes.object,
    isQuery: PropTypes.bool,
    onQuery: PropTypes.func.isRequired,
    onBodyQuery: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onInit: PropTypes.func
};

export default Bill;
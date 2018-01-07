import React, {Component} from 'react';

import QueryModule from './module/QueryModule';
import ListModule from './module/ListModule';
import CardModule from './module/CardModule';
import DataTable from '../data/DataTable';
import PropTypes from 'prop-types';
import Type from '../tools/Type';

import Log from '../tools/Log';

import {message} from 'antd';

const PK = 'pk';

class Bill extends Component {
    constructor(props) {
        super(props);

        // 构造 查询, 列表, 卡片三种状态的DataTable
        this.queryTable = new DataTable(props.headMeta);
        this.listTable = new DataTable(props.headMeta);
        this.cardTable = new DataTable(props.headMeta);
        this.__cacheCardTabel = null; // 用来暂存取消时的副本
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
                    this.cardBodyTableMap.set(eachBodyKey, new DataTable(eachBodyMeta));
                }
            })
        }

        // state状态
        this.state = {
            isNewMode: false, // 是否是新增态
            isList: true, // 是否为列表态
            editable: false, // 是否可编辑,一般仅针对Card形态,
            refresh: Symbol(),
        }
    }

    componentWillMount = () => {
        this.props.onInit(this.queryTable, this.listTable, this.cardTable, this.cardBodyTableMap);
        if (this.props.isQuery) {
            this.onQuery();
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
     * 卡牌态的修改
     */
    onCardModify = () => {
        this.__cacheCardTabel = this.cardTable.getSimpleData();
        this.__canEditable();
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
            this.__refresh();
        })
    };
    
    onBodyQuery = () => {
        let queryCondition = {};
        queryCondition["headPk"] = this.cardTable.getCurrentRow().getSimpleData()[PK];
        for(let eachKey of this.cardBodyTableMap.keys()) {
            this.props.onBodyQuery(eachKey, queryCondition, this.cardBodyTableMap.get(eachKey), (res)=> {
                this.__refresh();
            })
        }
    };

    /**
     * 列表态的修改
     */
    onListModify = (index) => {
        let currRow = this.listTable.getRowByIndex(index);
        let modifyData = currRow.getSimpleData();
        this.__cacheCardTabel = modifyData;
        this.cardTable.setSimpleData(modifyData);
        this.onBodyQuery();
        this.__toEditMode();
        this.__canEditable();
    };
    
    /**
     * 保存
     */
    onSave = () => {
        this.props.onSave(this.cardTable, this.cardBodyTableMap, this.__refresh);
    };

    /**
     * 重置
     */
    onReset() {
        this.queryTable.removeAllRows();
    }

    /**
     * 浏览
     */
    onReview = (index) => {
        let reviewRow = this.listTable.getRowByIndex(index);
        let modifyData = reviewRow.getSimpleData();
        this.cardTable.setSimpleData(modifyData);
        this.__toEditMode();
        this.__cannotEditable();
    };

    /**
     * 取消
     */
    onCancel = () => {
        this.cardTable.setSimpleData(this.__cacheCardTabel);
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
        this.__toList();
        this.onQuery();
    };

    onCardBodyDelete(tableId) {

    }

    onCardBodyChange = (tableId, field, value) => {
        let changeTable = this.cardBodyTableMap.get(tableId);
        changeTable.setValue(field, value);
        this.__refresh();
    };

    onCardBodyNew = (tableId) => {
        let changeTable = this.cardBodyTableMap.get(tableId);
        changeTable.createEmptyRow();
        this.__refresh();
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
    
    
    __refresh = () => {
        this.setState({
            refresh: Symbol()
        })
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

    __getCardBody = () => {
        let self = this;
        let child = [];
        for (let key of this.cardBodyTableMap.keys()) {
            let eachCardBodyTable = this.cardBodyTableMap.get(key);
            child.push(<ListModule
                key={key}
                tableId={key}
                dataTable={eachCardBodyTable}
                btnInPanel
                editable={self.state.editable}
                onDelete={self.onCardBodyDelete}
                onChange={self.onCardBodyChange}
                onNew={self.onCardBodyNew}/>)
        }
        return child;
    };

    render() {
        return <div className="hera-bill">
            {this.state.isList ?
                <div id="list-panle">
                    <QueryModule
                        dataTable={this.queryTable}
                        onQuery={this.onQuery}
                        onReset={this.onReset}
                        onNew={this.onNew}/>
                    <ListModule
                        tableId="list"
                        dataTable={this.listTable}
                        btnInLine
                        onReview={this.onReview}
                        onDelete={this.onDelete}
                        onModify={this.onListModify}/>
                </div>
                : <div id="card-panel">
                <CardModule
                    dataTable={this.cardTable}
                    editable={this.state.editable}
                    isNewMode={this.state.isNewMode}
                    onSave={this.onSave}
                    onModify={this.onCardModify}
                    onCancel={this.onCancel}
                    onReturn={this.onReturn}>
                    {
                        this.__getCardBody()
                    }
                </CardModule>
            </div>
            }
        </div>
    }
}

Bill.propTypes = {
    tableId: PropTypes.string.isRequired,
    headMeta: PropTypes.object.isRequired,
    bodyMeta: PropTypes.object,
    isQuery: PropTypes.bool,
    onQuery: PropTypes.func.isRequired,
    onBodyQuery: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onInit: PropTypes.func
};


export default Bill;
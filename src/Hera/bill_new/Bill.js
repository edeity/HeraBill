import React, {Component} from 'react';

import QueryModule from './module/QueryModule';
import ListModule from './module/ListModule';
import CardModule from './module/CardModule';
import DataTable from '../data/DataTable';

import Log from '../tools/Log';

import {message} from 'antd';

const PRIMARY_KEY = 'pk';

class Bill extends Component {
    constructor(props) {
        super(props);

        this.__cacheCardTabel = null;
        this.queryTable = new DataTable(this.props.headMeta);
        this.listTable = new DataTable(this.props.headMeta);
        this.cardTable = new DataTable(this.props.headMeta);
        this.queryTable.createEmptyRow();
        this.state = {
            isNewMode: false, // 是否是新增态
            isList: true, // 是否为列表态
            editable: false, // 是否可编辑,一般仅针对Card形态,
            refresh: Symbol(),
        }
    }

    componentWillMount = () => {
        this.props.onInit(this.queryTable, this.listTable, this.cardTable);
        if(this.props.isQuery) {
            this.onQuery();
        }
    };

    refresh =() => {
        this.setState({
            refresh: Symbol()
        })
    };

    /**
     * 新增
     */
    onNew = () => {
        this.cardTable.createEmptyRow();
        this.__toNewMode();
        this.__canEditable();
    }

    /**
     * 列表态的修改
     */
    onListModify =(index) => {
        let currRow = this.listTable.getRowByIndex(index);
        let modifyData = currRow.getSimpleData();
        this.__cacheCardTabel = modifyData;
        this.cardTable.setSimpleData(modifyData);
        this.__toEditMode();
        this.__canEditable();
    };

    /**
     * 卡牌态的修改
     */
    onCardModify =() => {
        this.__cacheCardTabel = this.cardTable.getSimpleData();
        this.__canEditable();
    };

    /**
     * 复制
     */
    onCopy() {
        let copyData = this.state.listTable.getData();
        this.cardTable.setData(copyData);
        this.cardTable.setValue(PRIMARY_KEY, '');
        this.__toNewMode();
        this.__canEditable();
    }

    /**
     * 删除
     */
    onDelete() {
        this.cardTable.getCurrentRow()
    }

    /**
     * 查询
     */
    onQuery = () => {
        let queryCondition = this.queryTable.getCurrentRow().getSimpleData();
        this.props.onQuery(queryCondition, (res)=> {
            Log.log(res);
            if (res.success) {
                this.listTable.setSimpleData(res.data);
                this.refresh();
            } else {
                message.error('查询失败' + res.error);
            }

        })
    };

    /**
     * 保存
     */
    onSave =() => {
        let saveData = this.cardTable.getCurrentRow().getSimpleData();
        this.props.onSave(saveData, (res)=> {
            if(res.success) {
                this.cardTable.setSimpleData(res.data);
                this.refresh();
            } else {
                message.error('保存失败' + res.error);
            }
        });
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
    onReview =(index) => {
        let reviewRow = this.listTable.getRowByIndex(index);
        let modifyData = reviewRow.getSimpleData();
        this.cardTable.setSimpleData(modifyData);
        this.__toEditMode();
        this.__cannotEditable();
    };

    /**
     * 取消
     */
    onCancel =() => {
        this.cardTable.setSimpleData(this.__cacheCardTabel);
        this.__cannotEditable();
    };

    /**
     * 返回
     */
    onReturn =() => {
        this.cardTable.removeAllRows();
        this.__toList();
    };


    onBodyNewRow() {
    }

    onBodyCopy() {
    }

    onBodyDelete() {
    }

    __toList =() => {
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
    
    __canEditable =() => {
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
        // <CardBodyModele
        //     onNewRow={this.onBodyNewRow}
        //     onCopy={this.onBodyCopy}
        //     onDelete={this.onBodyDelete}/>

        return this.state.isList ?
                <div id="list-panle">
                    <QueryModule
                        dataTable={this.queryTable}
                        onQuery={this.onQuery}
                        onReset={this.onReset}
                        onNew={this.onNew}/>
                    <ListModule
                        dataTable={this.listTable}
                        onReview={this.onReview}
                        onDelete={this.onDelete}
                        onCopy={this.onCopy}
                        onModify={this.onListModify}/>
                </div>
                : <div id="card-panel">
                    <CardModule
                        dataTable={this.cardTable}
                        editable={this.state.editable}
                        isNewModel={this.state.isNewMode}
                        onSave={this.onSave}
                        onModify={this.onCardModify}
                        onCancel={this.onCancel}
                        onReturn={this.onReturn}>
                    </CardModule>
                </div>

    }
}

export default Bill;
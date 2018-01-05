import React, {Component} from 'react';

import  OperateModule from './module/OperateModule';
import QueryModule from './module/QueryModule';
import ListModule from './module/ListModule';
import CardModule from './module/CardModule';
import DataTable from '../data/DataTable';

const PRIMARY_KEY = 'pk';

class NewBill extends Component {
    constructor(props) {
        super(props);
        this.queryTable = new DataTable(this.props.headMeta);
        this.listTable = new DataTable(this.props.headMeta);
        this.cardTable = new DataTable(this.props.headMeta);
        this.__cacheCardTabel = null;
    }

    /**
     * 新增
     */
    onNewRow() {
        this.cardTable.createEmptyRow();
        this.__toCard();
        this.__canEditable();
    }

    /**
     * 列表态的修改
     */
    onListModify() {
        let modifyData = this.listTable.getData();
        this.cardTable.setData(modifyData);
        this.__toCard();
        this.__cacheCardTabel = modifyData;
        this.__canEditable();
    }

    /**
     * 卡牌态的修改
     */
    onCardModify() {
        this.__cacheCardTabel = this.cardTable.getData();
        this.__canEditable();
    }

    /**
     * 复制
     */
    onCopy() {
        let copyData = this.listTable.getData();
        this.cardTable.setData(copyData);
        this.cardTable.setValue(PRIMARY_KEY, '');
        this.__toCard();
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
    onQuery() {
        let queryCondition = this.queryTable.getSimpleData();
        this.props.onQuery(queryCondition, (responseData)=> {
            this.listTable.setSimpleData(responseData);
        })
    }

    /**
     * 重置
     */
    onReset() {
        this.queryTable.removeAllRows();
    }

    /**
     * 浏览
     */
    onReview() {
        let modifyData = this.listTable.getData();
        this.cardTable.setData(modifyData);
        this.__toCard();
        this.__cannotEditable();
    }

    /**
     * 保存
     */
    onSave() {
        let saveData = this.listTable.getSimpleData();
        this.props.onSave(saveData, (responseData)=> {
            this.listTable.setSimpleData(responseData);
        })
    }

    /**
     * 取消
     */
    onCancel() {
        this.__cannotEditable();
    }

    /**
     * 返回
     */
    onReturn() {
        this.cardTable.removeAllRows();
        this.__toList();
    }


    onBodyNewRow() {
    }

    onBodyCopy() {
    }

    onBodyDelete() {
    }

    __toCard() {
    }

    __toList() {
    }

    __canEditable() {
    }

    __cannotEditable() {
    }

    render() {
        // <CardBodyModele
        //     onNewRow={this.onBodyNewRow}
        //     onCopy={this.onBodyCopy}
        //     onDelete={this.onBodyDelete}/>
        return <div>
            <OperateModule
                onNewRow={this.onNewRow}
                onListModify={this.onListModify}
                onCardModify={this.onCardModify}
                onCopy={this.onCopy}
                onDelete={this.onDelete}/>
            <QueryModule
                dataTable={this.queryTable}
                onQuery={this.onQuery}
                onReset={this.onReset}/>
            <ListModule
                dataTable={this.listTable}
                onReview={this.onReview}/>
            <CardModule
                dataTable={this.cardTable}
                onSave={this.onSave}
                onCancel={this.onCancel}
                onReturn={this.onReturn}>
            </CardModule>
        </div>
    }
}

export default NewBill;
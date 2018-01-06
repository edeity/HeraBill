/**
 * Created by edeity on 2018/1/4.
 */
import React, {Component} from 'react';
import {Table} from 'antd';
import DataRow from '../../data/DataRow';
import Meta from '../Meta';

class ListModule extends Component {
    constructor(props) {
        super(props);
        this.rowMetaValue = this.props.dataTable.getMeta();
        this.columns = this.getHeadColumns();
    }

    /**
     * 获得通用的显示行
     * @returns {Array}
     */
    getHeadColumns = () => {
        const keys = Object.keys(this.rowMetaValue);
        let columns = []; // 列表态的表头
        keys.forEach((key) => {
            var eachMetaValue = this.rowMetaValue[key];
            if(eachMetaValue.__renderConfig.isList) {
                columns.push({
                    key: key,
                    title: eachMetaValue.desc,
                    render: (text, record, index) => {
                        if(key === DataRow.ROW_KEY) {
                            return null;
                        }
                        let eachCellMetaValue = record[key];
                        return <Meta
                            type={eachCellMetaValue.type}
                            field={key}
                            metaValue={eachCellMetaValue}
                            isStrMode
                            disabled/>
                    }
                });
            }
        });

        // 最后一列为动作列
        columns.push({
            title: '操作',
            key: 'hera-bill-operation',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => {
                return <div className="row-btn">
                    <a onClick={() => this.onReview(index)}>浏览</a>
                    <span> | </span>
                    <a onClick={() => this.onModify(index)}>修改</a>
                </div>
            }
        });

        return columns;
    };

    onReview =(index) => {
        this.props.onReview(index);
    };

    onModify(index) {
        this.props.onModify(index);
    }

    render() {
        return <Table
            rowKey={ DataRow.ROW_KEY }
            columns={this.columns}
            dataSource={ this.props.dataTable.__getMetaValueWithRowKey()}
            size="middle"
        />
    }
}
export default ListModule;
/**
 * Created by edeity on 2018/1/4.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../data/DataTable';
import DataRow from '../../data/DataRow';
import {Row, Table, Button, Tooltip} from 'antd';
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
                            onChange={ (field, value) => this.props.onChange(this.props.tableId, field, value) }
                            isStrMode={!this.props.editable}
                            isSimMode
                            disabled/>
                    }
                });
            }
        });

        if(this.props.btnInLine) {
            // 最后一列为动作列
            columns.push({
                title: '操作',
                key: 'hera-bill-operation',
                fixed: 'right',
                width: 150,
                render: (text, record, index) => {
                    return <div className="row-btn">
                        {this.props.onReview && <a className="inline-btn" onClick={() => this.onReview(index)}>浏览</a>}
                        {this.props.onModify && <a className="inline-btn" onClick={() => this.onModify(index)}>修改</a>}
                        {this.props.onDelete && <a className="inline-btn" onClick={() => this.onDelete(index)}>删除</a>}
                    </div>
                }
            });
        }

        return columns;
    };
    
    onDelete = (index) => {
        this.props.onDelete(index);
    };

    onReview =(index) => {
        this.props.onReview(index);
    };

    onModify =(index) => {
        this.props.onModify(index);
    };

    __getTitleBtn = () => {

        return  this.props.btnInPanel && <Row type="flex" justify="end">
            <Button.Group style={{ float: 'right' }}>
                {
                    this.props.onNew &&
                    <Tooltip placement="top" title="新增" onClick={() => this.props.onNew(this.props.tableId)}>
                        <Button icon="plus"/>
                    </Tooltip>
                }
                {
                    this.props.onDelete &&
                    <Tooltip placement="top" title="删除" onClick={this.props.onDelete}>
                        <Button icon="delete"/>
                    </Tooltip>
                }
            </Button.Group>
        </Row>
    };
    
    render() {
        return <Table
            rowKey={ DataRow.ROW_KEY }
            columns={this.columns}
            dataSource={ this.props.dataTable.__getMetaValueWithRowKey()}
            size="middle"
            title={ this.__getTitleBtn }
        />
    }
}

ListModule.propTypes = {
    tableId: PropTypes.string.isRequired,
    dataTable: PropTypes.instanceOf(DataTable),
    editable: PropTypes.bool,
    btnInLine: PropTypes.bool, // 按钮是否在行上
    btnInPanel: PropTypes.bool, // 按钮是否在顶部上
    onNew: PropTypes.func,
    onModify: PropTypes.func,
    onDelete: PropTypes.func,
};

export default ListModule;
/**
 * Created by edeity on 12/10/2017.
 */


import React, {Component} from 'react';
import {Button, Tooltip} from 'antd';
import {Row} from 'antd';
import {Table} from 'antd';
import Meta from './Meta';

/**
 * 单据表体
 */
class Body extends Component {
    constructor(props) {
        super(props);

        let self = this;

        // 初始化渲染
        let meta = this.props.meta;
        const keys = Object.keys(meta);

        // 构建列
        let cardColumns = [];
        let editColumns = [];
        keys.forEach((key) => {
            let tempField = meta[key];
            cardColumns.push({
                title: tempField.desc,
                dataIndex: key,
            })
            editColumns.push({
                title: tempField.desc,
                dataIndex: key,
                render: (text, record, index) => this.renderColumns(meta[key], index, key)
            })
        });
        self.cardColumns = cardColumns;
        self.editColumns = editColumns;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.selected(selectedRowKeys, selectedRows);
            },
        };
        self.rowSelection = rowSelection;
    }

    onFieldChange = (index) => {
        let self = this;
        return (key, value) => {
            self.props.onBodyFieldChanged(index, key, value)
        };
    };

    renderColumns = (meta, index, key) => {
        return (<Meta key={key}
                      field={key}
                      meta={meta}
                      editable={this.props.editable}
                      isSimMode={true}
                      value={this.props.data[index][key]}
                      onChange={this.onFieldChange(index)}
        />);
    }

    render() {
        return (
            <div className="body-panel">
                <Row>
                    {
                        this.props.editable ?
                            <Table
                                rowSelection={this.rowSelection}
                                columns={this.editColumns}
                                dataSource={this.props.data || []}
                                bordered
                                title={() => {
                                return <Row type="flex" justify="end">
                                    <Button.Group>
                                        <Tooltip placement="top" title="新增">
                                            <Button icon="plus" onClick={this.props.add}/>
                                        </Tooltip>
                                        <Tooltip placement="top" title="删除" onClick={this.props.delete}>
                                            <Button icon="delete"/>
                                        </Tooltip>
                                    </Button.Group>
                                </Row>
                                }
                            }/>
                            :
                            <Table
                                columns={this.cardColumns}
                                dataSource={this.props.data || []}
                                bordered/>
                    }
                </Row>
            </div>
        )
    }
}

export default Body;
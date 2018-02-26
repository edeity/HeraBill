/**
 * Created by edeity on 2018/1/4.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from '../data/DataTable';
import Meta from '../Meta';
import {Row, Col, Button, Tabs} from 'antd';
import ListModule from './ListModule';

const TabPane = Tabs.TabPane;

class CardModule extends Component {
    constructor(props) {
        super(props);
        let dataTable = props.dataTable;
        this.meta = dataTable.getMeta();
        this.state = {
            dataTable: dataTable,
            bodyTableMap: this.props.bodyTableMap
        }
    }
    onFieldChanged = (field, value) => {
        let dataTable = this.state.dataTable;
        dataTable.setValue(field, value);
        this.setState({
            dataTable: dataTable
        })
    };

    onSave = () => {
        this.props.onSave();
    };

    onCancel = () => {
        this.props.onCancel();
    };

    onModify = () => {
        this.props.onModify();
    };

    onReturn = () => {
        this.props.onReturn();
    };

    __resetBodyTableData = (tableId, dataTable) => {
        let bodyTableMap = this.state.bodyTableMap;
        bodyTableMap.set(tableId, dataTable);
        this.setState({
            bodyTableMap: bodyTableMap
        })
    }
    onCardBodyDelete = (index, tableId) => {
        let currTable = this.state.bodyTableMap.get(tableId);
        let currRow = currTable.getRowByIndex(index);
        currTable.removeRow(currRow);
        this.__resetBodyTableData(tableId, currTable);
    };

    onCardBodyChange = (tableId, field, value) => {
        let changeTable = this.state.bodyTableMap.get(tableId);
        changeTable.setValue(field, value);
        this.__resetBodyTableData(tableId, changeTable);
    };

    onCardBodyCell = (tableId, index) => {
        let changeTable = this.state.bodyTableMap.get(tableId);
        let currRow = changeTable.getRowByIndex(index);
        changeTable.__setCurrentRow(currRow);
        this.__resetBodyTableData(tableId, changeTable);
    };

    onCardBodyNew = (tableId) => {
        let changeTable = this.state.bodyTableMap.get(tableId);
        changeTable.createEmptyRow();
        this.__resetBodyTableData(tableId, changeTable);
    };
    
    __getCardBody = () => {
        let self = this;
        let child = [];
        for (let key of this.state.bodyTableMap.keys()) {
            let eachCardBodyTable = this.state.bodyTableMap.get(key);
            child.push(
                <TabPane tab={this.props.bodyTableAttr[key].title} key={key}>
                    <ListModule
                        key={key}
                        tableId={key}
                        dataTable={eachCardBodyTable}
                        uniqKey={eachCardBodyTable.__getRefreshKey()}
                        btnInPanel
                        editable={self.props.editable}
                        onDelete={self.onCardBodyDelete}
                        onChange={self.onCardBodyChange}
                        onCell={self.onCardBodyCell}
                        onNew={self.onCardBodyNew}/>
                </TabPane>
            )
        }
        return child;
    };
    
    render() {
        let self = this;
        let currRow = this.state.dataTable.getCurrentRow();
        return <Row gutter={16}>
            <Col span="24">
            {
                Object.keys(this.meta).map((key) => {
                    let metaValue = currRow.getMetaValue(key);
                    return metaValue.__renderConfig.isCard
                        && <Meta key={'query-' + key}
                                 field={key}
                                 metaValue={ metaValue }
                                 editable={self.props.editable}
                                 onChange={ self.onFieldChanged }/>
                })
            }
            </Col>
            <Col span="24" style={{marginBottom: 20}}>
            {
                self.props.editable
                    ?
                    <Button.Group style={{ float: 'right' }}>
                        <Button onClick={self.onSave}>保存</Button>
                        {
                            !self.props.isNewMode && <Button onClick={self.onCancel}>取消</Button>
                        }
                        <Button onClick={self.onReturn}>返回</Button>
                    </Button.Group>
                    :
                    <Button.Group style={{ float: 'right' }}>
                        <Button onClick={self.onModify}>修改</Button>
                        <Button onClick={self.onReturn}>返回</Button>
                    </Button.Group>

            }
            </Col>
            <Tabs defaultActiveKey={this.state.bodyTableMap.keys().next().value} >
                {
                    this.__getCardBody()
                }
            </Tabs>
        </Row>
    }
}

CardModule.propTypes = {
    dataTable: PropTypes.instanceOf(DataTable),
    onReturn: PropTypes.func.isRequired,
    onModify: PropTypes.func.isRequired,
    isNewMode: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
export default CardModule;
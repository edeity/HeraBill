/**
 * Created by edeity on 2018/1/4.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../data/DataTable';
import Meta from '../Meta';
import {Row, Button} from 'antd';

class QueryModule extends Component {
    constructor(props) {
        super(props);
        let dataTable = props.dataTable;
        this.meta = dataTable.getMeta();
        this.state = {
            dataTable: dataTable
        }
    }
    onNew = () => {
        this.props.onNew();
    };
    onQuery =() => {
        this.props.onQuery();
    };
    onReset =() => {
        let dataTable = this.state.dataTable;
        dataTable.removeAllRows().createEmptyRow();
        this.setState({
            dataTable: dataTable
        })
    };
    onFieldChanged =(field, value) => {
        let dataTable = this.state.dataTable;
        dataTable.setValue(field, value);
        this.setState({
            dataTable: dataTable
        })
    };
    render() {
        let currRow = this.state.dataTable.getCurrentRow();
        return <Row gutter={16} style={{marginBottom: 20}}>
                {
                    Object.keys(this.meta).map((key) => {
                        let metaValue = currRow.getMetaValue(key);
                        return metaValue.__renderConfig.isQuery
                            && <Meta key={'query-' + key}
                                     field={key}
                                     metaValue = { metaValue }
                                     editable
                                     onChange={ this.onFieldChanged }/>
                    })
                }
                <Button.Group style={{ float: 'right' }}>
                    <Button onClick={this.onQuery}>查询</Button>
                    <Button onClick={this.onReset}>重置</Button>
                    <Button onClick={this.onNew}>新增</Button>
                </Button.Group>
            </Row>
    }
}


QueryModule.propTypes = {
    dataTable: PropTypes.instanceOf(DataTable),
    onQuery: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired
};


export default QueryModule;
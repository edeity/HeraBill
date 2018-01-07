/**
 * Created by edeity on 2018/1/4.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../data/DataTable';
import Meta from '../Meta';
import {Row, Col, Button} from 'antd';

class CardModule extends Component {
    constructor(props) {
        super(props);
        let dataTable = props.dataTable;
        this.meta = dataTable.getMeta();
        this.state = {
            dataTable: dataTable
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
            {
                React.Children.map(this.props.children, function (child) {
                    return <Col className="child-list" span="24" style={{marginBottom: 20}}>{child}</Col>;
                })
            }
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
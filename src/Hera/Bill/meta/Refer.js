/**
 * Created by edeity on 12/10/2017.
 */


import React, {Component} from 'react';
import {Select} from 'antd';
import Consistence from '../../Tools/Consistence';
const Option = Select.Option;


/**
 * 参照
 */
class Refer extends Component {
    constructor(props) {
        super(props);
        this.referConfig = this.props.meta.refer;
        this.state = {
            selector: [],
            value: this.props.value,
        };
        this.loadData();
    }

    loadData = (callback) => {
        let rc = this.referConfig;
        if (!rc) {
            console.error('meta: 参照必须设置refer');
        } else if (!rc.tableId) {
            console.error('meta: 参照必须设置tableId');
        } else if (!rc.field) {
            console.error('meta: 参照必须设置field');
        } else if (!rc.renderField) {
            console.error('meta: 参照必须设置renderField');
        } else {
            Consistence.query(rc.tableId)
                .then((res) => {
                    if (res.success) {
                        this.setState({
                            selector: res.data
                        })
                    }
                });
        }
    };

    handleSelect = (selectedData) => {
        var realValue = selectedData["key"];
        this.setState({
            value: realValue,
        }, () => {
            this.props.onChange && this.props.onChange(realValue);
        })
    };

    filter = (input, option) => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    };

    render() {
        let self = this;
        return (
            <Select labelInValue
                    showSearch
                    style={{ minWidth: 100 }}
                    className={this.props.className}
                    onSelect={self.handleSelect}
                    value={{ key: this.state.value }}
                    disabled={self.props.disabled}
                    filterOption={self.filter}
            >
                {
                    this.state.selector.map((eachOption) => {
                        return <Option
                            key={eachOption[self.referConfig.field]}>
                            {eachOption[self.referConfig.renderField]}</Option>
                    })
                }
            </Select>
        )
    }
}

export default Refer;
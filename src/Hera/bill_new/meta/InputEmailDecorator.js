/**
 * Created by edeity on 02/11/2017.
 */

import React, {Component} from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

const Option = Select.Option;


/**
 * 基本字符串
 */
class InputEmailDecorator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
        }
    }

    handleChange = (value) => {
        let options;
        if (!value || value.indexOf('@') >= 0) {
            options = [];
        } else {
            options = ['yonyou.com', '163.com', 'qq.com'].map((domain) => {
                const email = `${value}@${domain}`;
                return <Option key={email}>{email}</Option>;
            });
        }
        this.setState({ options }, () => {
            this.props.onChange(value);
        });
    }

    render() {
        return (
            <Select
                style={{ minWidth: 100 }}
                className={this.props.className}
                mode="combobox"
                onChange={this.handleChange}
                filterOption={false}
                placeholder="请输入邮箱地址"
                defaultValue={this.props.defaultValue}
                value={this.props.value}
                disabled={this.props.disabled}
            >
                {this.state.options}
            </Select>
        );
    }
}

InputEmailDecorator.propTypes = {
    className: PropTypes.string, // 名称-一般由状态觉定
    defaultValue: PropTypes.string, // 默认显示的值
    value: PropTypes.string, // 实际的值
    disabled: PropTypes.bool, // 是否可编辑
    onChange: PropTypes.func.isRequired, // 字段变更的回调
};

export default InputEmailDecorator;
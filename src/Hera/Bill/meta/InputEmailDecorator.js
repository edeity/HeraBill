/**
 * Created by edeity on 02/11/2017.
 */

import React, {Component} from 'react';
import { Select } from 'antd';
const Option = Select.Option;


/**
 * 基本字符串
 */
class InputEmailDecorator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            value: this.props.value
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
        this.setState({ options, value: value }, () => {
            this.props.onChange(this.state.value);
        });
    }

    render() {
        return (
            <Select
                className={this.props.className}
                mode="combobox"
                style={{ width: 200 }}
                onChange={this.handleChange}
                filterOption={false}
                placeholder="请输入邮箱地址"
                defaultValue={this.state.value}
                disabled={this.props.disabled}
            >
                {this.state.options}
            </Select>
        );
    }
}

export default InputEmailDecorator;
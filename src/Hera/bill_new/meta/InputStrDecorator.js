/**
 * Created by edeity on 02/11/2017.
 */


import React, { PureComponent} from 'react';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';


/**
 * 基本字符串
 */
class InputStr extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    };

    componentWillUpdate() {
        this.refInput.focus();
    }

    emitEmpty = () => {
        this.refInput.focus();
        this.props.onChange && this.props.onChange('');
        this.setState({
            value: ''
        });
    };

    onValueChange = (e) => {
        let value = e.target.value;
        this.props.onChange && this.props.onChange(value);
        this.setState({
            value: value
        });
    };

    render() {
        const suffix = (this.state.value && !this.props.disabled)  ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <Input
                value={ this.state.value }
                suffix={suffix}
                ref={node => this.refInput = node}
                onChange={this.onValueChange}
                disabled={this.props.disabled}/>
        )
    }
}

InputStr.propTypes = {
    className: PropTypes.string, // 名称-一般由状态觉定
    defaultValue: PropTypes.string, // 默认显示的值
    value: PropTypes.string, // 实际的值
    disabled: PropTypes.bool, // 是否可编辑
    onChange: PropTypes.func.isRequired, // 字段变更的回调
};

export default InputStr;
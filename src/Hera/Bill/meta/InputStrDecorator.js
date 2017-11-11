/**
 * Created by edeity on 02/11/2017.
 */


import React, {Component} from 'react';
import { Input, Icon } from 'antd';


/**
 * 基本字符串
 */
class InputStr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    emitEmpty = () => {
        this.refInput.focus();
        this.setState({ value: '' }, () => {
            this.props.onChange && this.props.onChange(this.state.value);
        });
    };

    onValueChange = (e) => {
        this.setState({ value: e.target.value }, ()=> {
            this.props.onChange && this.props.onChange(this.state.value);
        });
    };

    render() {
        const { value } = this.state;
        const suffix = (value && !this.props.disabled)  ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <Input
                className={"meta-str " + this.props.className}
                value={value}
                suffix={suffix}
                ref={node => this.refInput = node}
                onChange={this.onValueChange}
                disabled={this.props.disabled}/>
        )
    }
}

export default InputStr;
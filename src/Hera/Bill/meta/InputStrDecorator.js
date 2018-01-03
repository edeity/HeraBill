/**
 * Created by edeity on 02/11/2017.
 */


import React, { PureComponent} from 'react';
import { Input, Icon } from 'antd';


/**
 * 基本字符串
 */
class InputStr extends PureComponent {
    emitEmpty = () => {
        this.refInput.focus();
        this.props.onChange && this.props.onChange('');
    };

    onValueChange = (e) => {
        this.props.onChange && this.props.onChange(e.target.value);
    };

    render() {
        let value = this.props.value;
        const suffix = (value && !this.props.disabled)  ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <Input
                className={"meta-str " + this.props.className}
                value={ value }
                suffix={suffix}
                ref={node => this.refInput = node}
                onChange={this.onValueChange}
                disabled={this.props.disabled}/>
        )
    }
}

export default InputStr;
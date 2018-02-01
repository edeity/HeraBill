/**
 * Created by edeity on 2018/1/31.
 */


import React, {Component} from 'react';
import './BigNumberEditor.css';

class BigNumberEditorBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    onChange = () => {
        let value = this.refs.input.value;
        this.setState({
            value: value
        })
        this.props.onChange(value, this.props.index);
    };

    render() {
        return (
            <input className="input-block"
                 ref="input"
                 defaultValue={this.state.value}
                 onChange={this.onChange}
                 onBlur={this.onBlur}/>
        )

    }
}

export default BigNumberEditorBlock;
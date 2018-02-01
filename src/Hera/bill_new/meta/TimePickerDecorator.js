/**
 * Created by edeity on 02/11/2017.
 */


import React, { PureComponent } from 'react';
import { TimePicker, Button } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';


/**
 * 基本字符串
 */
class TimePickerDecorator extends PureComponent {
    constructor(props) {
        super(props);
        this.format = 'HH:mm:ss';
        this.state = {
            value: null,
            open: false,
        }
    }

    getCurrentTimeStr =() =>{
        let date = new Date();
        return date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
    };
    
    setCurrentTime = () => {
        this.setState({
            open: false,
            value: moment(this.getCurrentTimeStr(), this.format)
        })
    };

    handleOpenChange = (open) => {
        this.setState({ open });
    };

    render() {
        return (
            <TimePicker
                className={this.props.className}
                value = {this.state.value}
                open={this.state.open}
                onOpenChange={this.handleOpenChange}
                onChange={this.props.onChange}
                addon={() => (<Button size="small" onClick={this.setCurrentTime}>now</Button>)}
                disabled={this.props.disabled}/>
        )
    }
}

TimePickerDecorator.propTypes = {
    className: PropTypes.string, // 名称-一般由状态觉定
    defaultValue: PropTypes.string, // 默认显示的值
    value: PropTypes.string, // 实际的值
    disabled: PropTypes.bool, // 是否可编辑
    onChange: PropTypes.func.isRequired, // 字段变更的回调
};

export default TimePickerDecorator;
/**
 * Created by edeity on 02/11/2017.
 */


import React, {Component} from 'react';
import { TimePicker, Button } from 'antd';
import moment from 'moment';


/**
 * 基本字符串
 */
class TimePickerDecorator extends Component {
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
                value = {this.state.value}
                open={this.state.open}
                onOpenChange={this.handleOpenChange}
                onChange={this.props.onChange}
                addon={() => (<Button size="small" onClick={this.setCurrentTime}>now</Button>)}
                disabled={this.props.disabled}/>
        )
    }
}

export default TimePickerDecorator;
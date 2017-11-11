/**
 * Created by edeity on 02/11/2017.
 */


import React, {Component} from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';


/**
 * 参照
 */
class Refer extends Component {
    
    getCurrentDateStr =() =>{
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    };


    onChange = (moment) => {
        this.props.onChange(moment.format('YYYY-MM-DD'));
    };

    render() {
        return (
            <DatePicker 
                className={ this.props.className }
                defaultValue={this.props.value ? moment(this.props.value) : null}
                onChange={this.onChange}
                disabled={this.props.disabled}/>
        )
    }
}

export default Refer;
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


    render() {
        return (
            <DatePicker defaultValue={moment(this.props.value || this.getCurrentDateStr(), 'YYYY-MM-DD')} 
                        onChange={this.props.onChange}
                        disabled={this.props.disabled}/>
        )
    }
}

export default Refer;
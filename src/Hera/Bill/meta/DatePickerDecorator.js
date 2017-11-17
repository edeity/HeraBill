/**
 * Created by edeity on 02/11/2017.
 */


import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';


/**
 * 日期
 */
const DatePickerDecorator =(props) => {

    // 日期变更事件
    function onChange (moment) {
        props.onChange(moment.format('YYYY-MM-DD'));
    };

    return (
        <DatePicker
            className={ props.className }
            defaultValue={ props.value ? moment(props.value) : moment()}
            onChange={ onChange }
            disabled={ props.disabled }/>
    )
}

export default DatePickerDecorator;
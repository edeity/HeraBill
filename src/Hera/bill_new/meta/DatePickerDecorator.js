/**
 * Created by edeity on 02/11/2017.
 */


import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';


/**
 * 日期
 */
const DatePickerDecorator =(props) => {

    // 日期变更事件
    function onChange (moment) {
        if(moment) {
            props.onChange(moment.format('YYYY-MM-DD'));
        }
    }

    return (
        <DatePicker
            className={ props.className }
            defaultValue={ props.value ? moment(props.value) : moment()}
            onChange={ onChange }
            disabled={ props.disabled }/>
    )
};

DatePickerDecorator.propTypes = {
    className: PropTypes.string, // 名称-一般由状态觉定
    defaultValue: PropTypes.string, // 默认显示的值
    value: PropTypes.string, // 实际的值
    disabled: PropTypes.bool, // 是否可编辑
    onChange: PropTypes.func.isRequired, // 字段变更的回调
};

export default DatePickerDecorator;
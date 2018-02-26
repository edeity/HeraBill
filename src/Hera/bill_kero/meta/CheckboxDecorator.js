/**
 * Created by edeity on 20/11/2017.
 */

import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';


/**
 * 复选框
 */
const CheckBoxDecorator =(props) => {

    // 复选框
    function onChange (e) {
        props.onChange && props.onChange(e.target.checked);
    }

    return (
        <Checkbox
            className={ props.className }
            defaultChecked={ props.value || false}
            onChange={ onChange }
            disabled={ props.disabled }/>
    )
};

CheckBoxDecorator.propTypes = {
    className: PropTypes.string, // 名称-一般由状态觉定
    // defaultValue: PropTypes.bool, // 默认显示的值
    // value: PropTypes.bool, // 实际的值
    disabled: PropTypes.bool, // 是否可编辑
    onChange: PropTypes.func.isRequired, // 字段变更的回调
};

export default CheckBoxDecorator;
/**
 * Created by edeity on 20/11/2017.
 */

import React from 'react';
import { Checkbox } from 'antd';


/**
 * 复选框
 */
const CheckBoxDecorator =(props) => {

    // 复选框
    function onChange (e) {
        props.onChange && props.onChange(e.target.checked);
    };

    return (
        <Checkbox
            className={ props.className }
            defaultChecked={ props.value || false}
            onChange={ onChange }
            disabled={ props.disabled }/>
    )
}

export default CheckBoxDecorator;
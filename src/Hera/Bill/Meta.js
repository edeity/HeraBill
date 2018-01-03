/**
 * Created by edeity on 12/10/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Col, Form, InputNumber} from 'antd';
import InputStrDecorator from './meta/InputStrDecorator';
import TimePickerDecorator from './meta/TimePickerDecorator';
import InputEmailDecorator from './meta/InputEmailDecorator';
import DatePickerDecorator from './meta/DatePickerDecorator';
import CheckBoxDecorator from './meta/CheckboxDecorator';
import Refer from './meta/Refer';

const FormItem = Form.Item;

/**
 * 用于渲染一个字段的组件
 */
const Meta = (props) => {

    function onChange(value) {
        props.onChange(props.field, value);
    };
    
    function getTypeRender (){
        const meta = props.meta;
        let data = props.data; // 值和其他的属性
        // 类型
        const type = meta.type || 'str';
        // 值
        const value = data ? data.value : '';
        // 可编辑性
        const disabled = ((data && data.editable === false) && meta.editable === false) ? true : !props.editable;
        // 合法性
        const className = (data  && data.__isValidate === false)? 'is-not-validate' :  '';

        switch (type) {
            // case 'phone': return ();
            case 'date': return (
               <DatePickerDecorator
                   className={ className }
                   value={ value }
                   onChange={ onChange }
                   disabled={disabled}/>
            );
            case 'time': return (
               <TimePickerDecorator
                   className={ className }
                   onChange={ onChange }
                   disabled={disabled}/>
            );
            case 'num': return (
                <InputNumber
                    className={ className }
                    defaultValue={ value }
                    value={ value }
                    size="default"
                    onChange={ onChange }
                    disabled={disabled}/>
            );
            case 'mail': return (
                <InputEmailDecorator
                    className={ className }
                    value={ value }
                    onChange={ onChange }
                    disabled={disabled}/>
            );
            case'refer': return (
                <Refer
                    className={className}
                    value={ value }
                    onChange={ onChange }
                    meta={ meta }
                    disabled={disabled}/>
            );
            case 'checkbox': return (
                <CheckBoxDecorator
                    value={ value }
                    onChange={ onChange }
                    meta={ meta }
                    disabled={disabled}
                />
            );
            case 'str': // 默认渲染即str
            default: return ((
                <InputStrDecorator
                    className={ className }
                    value={ value }
                    onChange={ onChange }
                    disabled={disabled}/>
                )
            );
        }
    };


    const formItemLayout = {
        labelCol: {
            xs: { span: 23 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 22, offset: 1 },
            sm: { span: 14 },
        },
    };

    const isSimMode = props.isSimMode;
    return (
        isSimMode
            ?
            <Col xs={20} sm={20} md={20}>
                {getTypeRender()}
            </Col>
            :
            <Col className="gutter-row" xs={12} sm={8} md={6}>
                {
                    (<div className="gutter-box">
                        <FormItem {...formItemLayout} label={props.meta.desc} hasFeedback>
                            { getTypeRender() }
                        </FormItem>
                    </div>)
                }
            </Col>
    )
};

Meta.PropTypes = {
    // 字段类型
    type: PropTypes.string,
    // 字段
    field: PropTypes.string.isRequired,
    // 字段描述
    meta: PropTypes.object.isRequired,
    // 字段数据
    data: PropTypes.object,
    // 是否可编辑
    editable: PropTypes.bool,
    // 字段值变更后的触发事件
    onChange: PropTypes.func.isRequired
};


export default Meta;
/**
 * Created by edeity on 12/10/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Col, Form, InputNumber, Checkbox} from 'antd';
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

    const metaValue = props.metaValue;
    const type = metaValue.type || 'str'; // 类型
    const value = metaValue.value || ''; // 值
    const desc = metaValue.desc || '';
    const isStrMode = props.isStrMode || false; // 是否仅返回字符串
    const isSimMode = props.isSimMode || false; // 是否是简单模式(不显示desc)

    function onChange(value) {
        props.onChange(props.field, value);
    };

    function getStrModeRender() {
        switch (type) {
            case 'checkbox':
                return <Checkbox
                    defaultChecked={value === true}
                    disabled/>;
            default:
                    return value;
        }
    };

    function getTypeRender (){

        const metaValue = props.metaValue;
        const disabled = props.editable === false ? true : (!metaValue.editable || false);  // 可编辑性
        const isValid = metaValue.isValid || true; // 合法性
        const className = isValid ? '' : 'is-not-validate';

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
                    metaValue={ metaValue }
                    disabled={disabled}/>
            );
            case 'checkbox': return (
                <CheckBoxDecorator
                    value={ value }
                    onChange={ onChange }
                    metaValue={ metaValue }
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

    return (
        isStrMode 
            ? <span>{ getStrModeRender() }</span>
            : isSimMode
                ?
                <Col xs={20} sm={20} md={20}>
                    {getTypeRender()}
                </Col>
                :
                <Col className="gutter-row" xs={12} sm={8} md={6}>
                    {
                        (<div className="gutter-box">
                            <FormItem {...formItemLayout} label={ desc } hasFeedback>
                                { getTypeRender() }
                            </FormItem>
                        </div>)
                    }
                </Col>
    )
};

Meta.propTypes = {
    // 字段类型
    type: PropTypes.string,
    // 字段
    field: PropTypes.string.isRequired,
    // 字段描述
    metaValue: PropTypes.object.isRequired,
    // 是否可编辑
    editable: PropTypes.bool,
    // 字段值变更后的触发事件
    onChange: PropTypes.func,
    isSimMode: PropTypes.bool,
    isStrMode: PropTypes.bool,
};


export default Meta;
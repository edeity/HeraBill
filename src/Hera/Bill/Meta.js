/**
 * Created by edeity on 12/10/2017.
 */
import React, {Component} from 'react';
import {Col, Form, InputNumber} from 'antd';
import InputStrDecorator from './meta/InputStrDecorator';
import TimePickerDecorator from './meta/TimePickerDecorator';
import InputEmailDecorator from './meta/InputEmailDecorator';
import DatePickerDecorator from './meta/DatePickerDecorator';
import Refer from './meta/Refer';

const FormItem = Form.Item;

/**
 * 用于渲染一个字段的组件
 */
class Meta extends Component {

    onChange = (value) => {
        this.props.onChange(this.props.field, value);
    };
    
    getTypeRender = () => {
        const meta = this.props.meta;
        const type = meta.type;
        const disabled = !this.props.editable;
        let data = this.props.data; // 值和其他的属性
        const value = data ? data.value : '';
        const className = (data  && data.__isValidate === false)? 'is-not-validate' :  '';

        switch (type) {
            // case 'refer': return ();
            // case 'phone': return ();
            case 'date': return (
               <DatePickerDecorator
                   className={ className }
                   value={ value }
                   onChange={ this.onChange }
                   disabled={disabled}/>
            );
            case 'time': return (
               <TimePickerDecorator
                   className={ className }
                   onChange={ this.onChange }
                   disabled={disabled}/>
            );
            case 'num': return (
                <InputNumber
                    className={ className }
                    defaultValue={ value }
                    onChange={ this.onChange }
                    disabled={disabled}/>
            );
            case 'mail': return (
                <InputEmailDecorator
                    className={ className }
                    value={ value }
                    onChange={ this.onChange }
                    disabled={disabled}/>
            );
            case'refer': return (
                <Refer
                    className={className}
                    value={ value }
                    onChange={ this.onChange }
                    meta={ meta }
                    disabled={disabled}/>
            );
            case 'str': // 默认渲染即str
            default: return ((
                <InputStrDecorator
                    className={ className }
                    value={ value }
                    onChange={ this.onChange }
                    disabled={disabled}/>
                )
            );
        }
    };

    render() {
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

        const isSimMode = this.props.isSimMode;
        return (
            <Col className="gutter-row" xs={12} sm={8} md={6}>
                {
                    isSimMode ? this.getTypeRender()
                    :
                        (<div className="gutter-box">
                            <FormItem {...formItemLayout} label={this.props.meta.desc} hasFeedback>
                                {this.getTypeRender()}
                            </FormItem>
                        </div>)
                }
            </Col>
        )
    }
}

export default Meta;
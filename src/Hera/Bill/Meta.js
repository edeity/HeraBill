/**
 * Created by edeity on 12/10/2017.
 */
import React, {Component} from 'react';
import {Col, Form, InputNumber} from 'antd';
import InputStrDecorator from './meta/InputStrDecorator';
import TimePickerDecorator from './meta/TimePickerDecorator';
import InputEmailDecorator from './meta/InputEmailDecorator';
import DatePickerDecorator from './meta/DatePickerDecorator';

const FormItem = Form.Item;

/**
 * 用于渲染一个字段的组件
 */
class Meta extends Component {
    // constructor(props) {
    //     super(props);
    // }

    
    getTypeRender = () => {
        const type = this.props.meta.type;
        const disabled = !this.props.editable;
        const value = this.props.value;
        const onChange = this.props.onChange;

        switch (type) {
            // case 'refer': return ();
            // case 'phone': return ();
            case 'date': return (
               <DatePickerDecorator value={ value } onChange={ onChange } disabled={disabled}/>
            );
            case 'time': return (
               <TimePickerDecorator onChange={ onChange } disabled={disabled}/>
            );
            case 'num': return (
                <InputNumber defaultValue={ value } onChange={ onChange } disabled={disabled}/>
            );
            case 'mail': return (
                <InputEmailDecorator value={ value } onChnge={ onChange } disabled={disabled}/>
            );
            case 'str': // 默认渲染即str
            default: return ((
                <InputStrDecorator value={ value } onChange={ onChange } disabled={disabled}/>
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
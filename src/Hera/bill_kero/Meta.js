/**
 * Created by edeity on 12/10/2017.
 */
import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Col, Form, InputNumber, Checkbox} from 'antd';
import InputStrDecorator from './meta/InputStrDecorator';
import TimePickerDecorator from './meta/TimePickerDecorator';
import InputEmailDecorator from './meta/InputEmailDecorator';
import DatePickerDecorator from './meta/DatePickerDecorator';
import CheckBoxDecorator from './meta/CheckboxDecorator';
import Refer from './meta/Refer';

const FormItem = Form.Item;

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

/**
 * 用于渲染一个字段的组件
 * 该函数式众多meta的封装类,可通过高阶函数重构
 */
class Meta extends PureComponent {

    constructor(props) {
        super(props);

        this.metaValue = props.metaValue;
        this.type = this.metaValue.type || 'str'; // 类型
        this.desc = this.metaValue.desc || '';
        this.isStrMode = props.isStrMode || false; // 是否仅返回字符串
        this.isSimMode = props.isSimMode || false; // 是否是简单模式(不显示desc)

        this.state = {
            value: this.metaValue.value || ''
        }
    };

    onChange = (value) =>{
        this.setState({
            value: value
        });
    };

    onBlur =() =>{
        this.props.onChange(this.props.field, this.state.value);
    };

    getStrModeRender() {
        const value = this.state.value;
        switch (this.type) {
            case 'checkbox':
                return <Checkbox
                    defaultChecked={value === true}
                    disabled/>;
            default:
                    return value;
        }
    };

    getTypeRender =() =>{

        let self = this;
        const disabled = this.props.editable === false ? true : (!this.metaValue.editable || false);  // 可编辑性
        const isValid = this.metaValue.isValid || true; // 合法性
        const value = this.state.value;
        const className = isValid ? '' : 'is-not-validate';

        return (
            <div className={className} onBlur={this.onBlur} onFocus={this.props.onCell}>
                {getInnerRender(this.type)}
            </div>
        );

        function getInnerRender (type) {
            switch (type) {
                case 'str':  return(<InputStrDecorator
                        value={ value }
                        onChange={ self.onChange }
                        disabled={disabled}/>
                );
                case 'date': return (
                    <DatePickerDecorator
                        value={ value }
                        onChange={ self.onChange }
                        disabled={disabled}/>
                );
                case 'time': return (
                    <TimePickerDecorator
                        onChange={ self.onChange }
                        disabled={disabled}/>
                );
                case 'num': return (
                    <InputNumber
                        defaultValue={ value }
                        value={ value }
                        size="default"
                        onChange={ self.onChange }
                        disabled={disabled}/>
                );
                case 'mail': return (
                    <InputEmailDecorator
                        value={ value }
                        onChange={ self.onChange }
                        disabled={disabled}/>
                );
                case'refer': return (
                    <Refer
                        value={ value }
                        onChange={ self.onChange }
                        metaValue={ self.metaValue }
                        disabled={disabled}/>
                );
                case 'checkbox': return (
                    <CheckBoxDecorator
                        value={ value }
                        onChange={ self.onChange }
                        metaValue={ self.metaValue }
                        disabled={disabled}
                    />
                );
                default: return ((
                        <InputStrDecorator
                            value={ value }
                            onChange={ self.onChange }
                            onFocus={self.props.onCell}
                            disabled={disabled}/>
                    )
                );
            }
        }
    };

    render() {
        return (
            this.isStrMode ? <span>{ this.getStrModeRender() }</span>
                : this.isSimMode  ?
                    <Col xs={20} sm={20} md={20}>{this.getTypeRender()}</Col>
                            :
                    <Col className="gutter-row" xs={12} sm={8} md={6}>
                        {
                            (<div className="gutter-box">
                                <FormItem {...formItemLayout} label={ this.desc } hasFeedback>
                                    {this.getTypeRender()}
                                </FormItem>
                            </div>)
                        }
                    </Col>
        )
    }
};

Meta.propTypes = {
    type: PropTypes.string, // 字段类型
    field: PropTypes.string.isRequired, // 字段
    metaValue: PropTypes.object.isRequired, // 字段描述
    editable: PropTypes.bool, // 是否可编辑
    onChange: PropTypes.func, // 字段值变更后的触发事件
    onFocus: PropTypes.func,
    isSimMode: PropTypes.bool,
    isStrMode: PropTypes.bool
};


export default Meta;
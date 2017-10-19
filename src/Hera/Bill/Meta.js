/**
 * Created by edeity on 12/10/2017.
 */
import React, {Component} from 'react';
import {Col} from 'antd';
import {Form, Input} from 'antd';
const FormItem = Form.Item;

/**
 * 用于渲染一个字段的组件
 */
class Meta extends Component {

    handleValueChange =(e) => {
        this.props.onChange(e.target.value);
    }
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
        const type = this.props.meta.type; // 暂时不起作用
        const isTableMode = this.props.isTableMode;
        let disabled = !this.props.editable || this.props.meta.editable === false;
        return (
            <Col className="gutter-row" xs={12} sm={8} md={6}>
                <div className="gutter-box">
                    {
                        // 应在此处判断类型
                        isTableMode === true
                            ?
                            <Input value={this.props.value}
                                     onChange={this.handleValueChange} disabled={disabled}/>
                            :
                            <FormItem {...formItemLayout} label={this.props.meta.desc} hasFeedback>
                                {
                                    this.props.editable
                                        ? <Input value={this.props.editValue}
                                                 onChange={this.handleValueChange} disabled={disabled}/>
                                        : <Input value={this.props.cardValue} disabled={disabled}/>
                                }
                            </FormItem>
                    }
                </div>
            </Col>
        )
    }
}

export default Meta;
import React, {Component} from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './layout.css'
import './hera.css'

import User from './Comp/User';
import Setting from './Comp/Setting';

class Hera extends Component {
    constructor() {
        super();
        this.state = {
            collapse: true // 是否收缩
        };
    }

    onCollapseChange = () =>{
        this.setState({
            collapse: !this.state.collapse,
        })
    };

    render() {
        const collapse = this.state.collapse;
        return (
            <Router>
                <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
                    {/* 侧边栏 S */}
                    <aside className="ant-layout-sider">
                        <div className="ant-layout-logo"></div>
                        <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
                            <Menu.Item key="user">
                                <Link to="/user">
                                    <Icon type="user"/><span className="nav-text">个人信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="setting">
                                <Link to="/setting">
                                    <Icon type="setting"/><span className="nav-text">设置</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                        <div className="ant-aside-action" onClick={this.onCollapseChange}>
                            {collapse ? <Icon type="right"/> : <Icon type="left"/>}
                        </div>
                    </aside>
                    {/* 侧边栏 */}
                    {/* 主题内容 */}
                    <div className="ant-layout-main">
                        <div className="ant-layout-header">
                            <Breadcrumb>
                                <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                                <Breadcrumb.Item>某应用</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="ant-layout-container">
                            <div className="ant-layout-content">
                                <Route path="/user" component={User}/>
                                <Route path="/setting" component={Setting}/>
                            </div>
                        </div>
                        <div className="ant-layout-footer">
                            版权所有 © 2017 Edeity
                        </div>
                    </div>
                    {/* 主题内容 E */}
                </div>
            </Router>
        );
    }
}

export default Hera;
import React, {Component} from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './layout.css'
import './hera.css'

import User from './Comp/User';
import MetaList from './Comp/MetaList';

class Hera extends Component {
    constructor() {
        super();

        const menuData = [{
            key: 'user',
            url: '/user',
            iconType: 'user',
            title: '个人信息'
        }, {
            key: 'meta',
            url: '/meta',
            iconType: 'book',
            title: 'meta类型'
        }];

        this.menuData = menuData;

        this.state = {
            collapse: true, // 是否收缩
            title: this.getTitle('user'),
        };
    }

    onCollapseChange = () =>{
        this.setState({
            collapse: !this.state.collapse,
        })
    };

    getCurrentMenuSelectedKeys = () => {
        let currKey = document.location.pathname.split('/')[1];
        return [currKey];
    };

    getTitle = (key) => {
        let currentMenuData = null;
        let currentKey = this.getCurrentMenuSelectedKeys()[0];
        this.menuData.some(function (eachMenuData) {
            if(eachMenuData.key === currentKey) {
                currentMenuData = eachMenuData;
                return true;
            }
        });
        return currentMenuData.title;
    };

    onMenuSelect = (item) => {
        this.setState({
            title: this.getTitle(item.key)
        });
    };

    render() {
        const collapse = this.state.collapse;
        return (
            <Router>
                <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
                    {/* 侧边栏 S */}
                    <aside className="ant-layout-sider">
                        <div className="ant-layout-logo"><Icon type="api"/></div>
                        <Menu mode="inline" theme="dark"
                              defaultSelectedKeys={this.getCurrentMenuSelectedKeys()}
                              onClick={this.onMenuSelect}>
                            {
                                this.menuData.map((eachMenuData) => {
                                    return (
                                        <Menu.Item key={eachMenuData.key}>
                                            <Link to={eachMenuData.url}>
                                                <Icon type={eachMenuData.iconType}/>
                                                <span className="nav-text">{eachMenuData.title}</span>
                                            </Link>
                                        </Menu.Item>
                                    )
                                })
                            }
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
                                <Breadcrumb.Item>
                                    { this.state.title || this.onMenuSelect()}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="ant-layout-container">
                            <div className="ant-layout-content">
                                <Route path="/user" component={User}/>
                                <Route path="/meta" component={MetaList}/>
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
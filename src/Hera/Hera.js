import React, {Component} from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './layout.css'
import './hera.css'

import Doc from './Comp/Doc';
import User from './Comp/User';
import Post from './Comp/Post';
import MetaList from './Comp/MetaList';
import NotFound from './Exception/NotFound';

class Hera extends Component {
    constructor() {
        super();

        const menuData = [{
            key: 'doc',
            url: '/doc',
            iconType: 'home',
            comp: <Doc/>,
            title: '文档'
        },{
            key: 'user',
            url: '/user',
            iconType: 'user',
            comp: <User/>,
            title: '个人信息'
        }, {
            key: 'post',
            url: '/post',
            iconType: 'contacts',
            comp: <Post/>,
            title: '职位'
        },{
            key: 'meta',
            url: '/meta',
            iconType: 'book',
            comp: <MetaList/>,
            title: 'meta类型'
        }];

        this.menuData = menuData;

        this.state = {
            collapse: true, // 是否收缩
            title: '',
        };
    }

    onCollapseChange = () =>{
        this.setState({
            collapse: !this.state.collapse,
        })
    };

    // 获取当前页面渲染的路由组件
    getComp = (routeObj) => {
        let comp = routeObj.match.params.comp;
        let rendererComp = null;
        this.menuData.some((eachMenuData) => {
            if(eachMenuData.key === comp) {
                rendererComp = eachMenuData.comp
                return true;
            }
            return false;
        });
        return rendererComp || <NotFound/>
    };

    getMenuData = (key) => {
        let currentMenuData = null;
        this.menuData.some(function (eachMenuData) {
            if(eachMenuData.key === key) {
                currentMenuData = eachMenuData;
                return true;
            }
            return false;
        });
        return currentMenuData;
    };

    getCurrentMenuSelectedKeys = () => {
        let currKey = document.location.pathname.split('/')[1];
        let currentMenuData = this.getMenuData(currKey);
        return currentMenuData ? [currentMenuData.key] : ['404'];
    };

    getTitle = (key) => {
        let currentKey = this.getCurrentMenuSelectedKeys()[0];
        let currentMenuData = this.getMenuData(currentKey);
        return currentMenuData ? currentMenuData.title : '404';
    };


    onMenuSelect = (item) => {
        const key = item.key;
        this.setState({
            title: this.getTitle(key)
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
                                <Breadcrumb.Item> { this.state.title }</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="ant-layout-container">
                            <div className="ant-layout-content">
                                <Route path="/:comp" component={this.getComp}/>
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
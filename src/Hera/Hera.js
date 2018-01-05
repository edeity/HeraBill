import React, {Component} from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './layout.css'
import './hera.css'

import menuConfig from './config/MenuConfig';
import NotFound from './exception/NotFound';

const preMount = '/HeraBill';

class Hera extends Component {
    constructor() {
        super();

        this.menuData = menuConfig;

        this.state = {
            collapse: true, // 是否收缩
            title: this.getTitle(this.getCurrentMenuSelectedKeys()[0]),
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

    // 返回当前被激活的页签
    getCurrentMenuSelectedKeys = () => {
        let urlArray = document.location.pathname.split('/');
        let currKey = urlArray[urlArray.length - 1];
        let currentMenuData = this.getMenuData(currKey);
        return currentMenuData ? [currentMenuData.key] : ['404'];
    };

    // 通过当前激活的页签获取名称
    getTitle = (key) => {
        let currentKey = this.getCurrentMenuSelectedKeys()[0];
        let currentMenuData = this.getMenuData(currentKey);
        return currentMenuData ? currentMenuData.title : '404';
    };

    // 通过选择页签更改名称
    onMenuSelect = (item) => {
        const key = item.key;
        this.changeTitle(key);
    };
    changeTitle = (key) => {
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
                                            <Link to={preMount + eachMenuData.url}>
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
                                <Route>
                                    <Switch>
                                        <Route path={preMount + "/:comp"} component={this.getComp}/>
                                    </Switch>
                                </Route>
                            </div>
                        </div>
                        <div className="ant-layout-footer">
                            版权所有 © 2017~2018 Edeity
                        </div>
                    </div>
                    {/* 主题内容 E */}
                </div>
            </Router>
        );
    }
}
export default Hera;
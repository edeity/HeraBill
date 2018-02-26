/**
 * Created by edeity on 2017/12/28.
 */

import React, {Component} from 'react';
import {Tabs, Row, Col} from 'antd';

import BigTableDescPage from './comp/BigTableDescPage';
import BigNumberDescPage from './comp/BigNumberDescPage';
import MDDoc from '../comp/mdDoc/MDDoc';
import Quadrant from '../comp/toDo/Quadrant';
import Todo from '../comp/toDo/Todo';

const TabPane = Tabs.TabPane;

const isDev = true;
// 实例:用户单据
class Comp extends Component {

    getRenderDoc(url, isToc) {
        if(isDev) {
            return <MDDoc isToc={isToc} docUrl={url}/>
        } else {
            let baseUrl = 'https://raw.githubusercontent.com/edeity/HeraBill/master/public';
            return <MDDoc isToc={isToc} docUrl={baseUrl + url}/>
        }
    }

    render() {
        return (
            <Tabs defaultActiveKey={"bigTable"} tabPosition={"left"}>
                <TabPane tab="表格" key={"bigTable"}>
                    <div className="inner-container">
                        <BigTableDescPage/>
                        <MDDoc linkGithubDoc={!isDev} docUrl={"/md/BigTable.md"}/>
                    </div>
                </TabPane>
                <TabPane tab="大数" key={"bigNum"}>
                    <div className="inner-container">
                        <BigNumberDescPage/>
                        <MDDoc  linkGithubDoc={!isDev} docUrl={"/md/BigNumber.md"}/>
                    </div>
                </TabPane>
                <TabPane tab="Todo" key={"toDo"}>
                    <div className="inner-container">
                        <Row>
                            <h2>简单用法</h2>
                            <Col  span={12}>
                                <Todo defaultValue={["准备干一些事情"]}/>
                            </Col>
                            <Col span={24}>
                                <MDDoc docStr={'`<Todo defaultValue={["准备干一些事情"]}/>`'}/>
                            </Col>
                        </Row>
                        <Row>
                            <h2>拖拽</h2>
                            <Col span={12}  style={{borderRight: "1px solid #eee"}} >
                                <Todo isDrag defaultValue={["允许拖拽项"]}/>
                            </Col>
                            <Col span={12}>
                                <Todo isDrag/>
                            </Col>
                            <Col span={24}>
                                <MDDoc docStr={'`<Todo isDrag defaultValue={["允许拖拽项"]}/>` \n `<Todo isDrag/>`'}/>
                            </Col>
                        </Row>
                        <Row>
                            <h2>应用 : 四象限规划</h2>
                            <Col span={24}>
                                <Quadrant isDrag isStore storeKey="__demo-quadrant"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <MDDoc  linkGithubDoc={!isDev} docUrl={"/md/Todo.md"}/>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane tab="MD" key="markdown">
                    <div className="inner-container">
                        <MDDoc isToc  linkGithubDoc={!isDev} docUrl={"/md/MDDoc.md"}/>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

export default Comp;
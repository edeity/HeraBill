/**
 * Created by edeity on 2018/2/5.
 */

import React, {Component} from 'react';
import {Tabs} from 'antd';
import MDDoc from '../comp/mdDoc/MDDoc';
import Post from './billDemo/Post';
import User from './billDemo/User';
import KeroUser from './billDemo/KeroUser';
import MetaList from './billDemo/MetaList';
import Plan from './billDemo/Plan';
import GlobalConfig from '../config/GlobalConfig';

const isDev = GlobalConfig.isDev;
const TabPane = Tabs.TabPane;

class BillDemo extends Component {
    render() {
        return (
            <Tabs defaultActiveKey={"document"} tabPosition={"left"}>
                <TabPane tab="文档" key={"document"}>
                    <div className="inner-container">
                        <MDDoc isToc linkGithubDoc={!isDev} docUrl="/doc.md"/>
                    </div>
                </TabPane>
                <TabPane tab="职位" key={"post"}>
                    <Post/>
                </TabPane>
                <TabPane tab="个人信息" key={"user"}>
                    <User/>
                </TabPane>
                {/* <TabPane tab="【kero】个人信息" key={"kero-user"}>
                    <KeroUser/>
                </TabPane> */}
                <TabPane tab="meta一览" key={"meta"}>
                    <MetaList/>
                </TabPane>
                <TabPane tab="开发计划" key={"plan"}>
                    <Plan/>
                </TabPane>
            </Tabs>
        );
    }
}

export default BillDemo;
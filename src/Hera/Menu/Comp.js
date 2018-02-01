/**
 * Created by edeity on 2017/12/28.
 */

import React, {Component} from 'react';
import BigTable from '../comp/bigTable/BigTable';
import BigNumberEditor from '../comp/bigNumber/BigNumberEditor';

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

// 实例:用户单据
class Comp extends Component {
    render() {
        return (
           <Tabs defaultActiveKey={"bigNum"}  tabPosition={"left"}>
               <TabPane tab={"表格"} key={"bigTable"}>
                   <p>代替一般<code>table</code>渲染（用以解决渲染数据量过多而导致前端卡顿的情况），假如需要复杂的交互，推荐使用
                       <a href="https://handsontable.com">handsontable.js</a></p>
                   <BigTable/>
               </TabPane>
               <TabPane tab={"大数"} key={"bigNum"}>
                   <div>通过基本的<strong>竖式计算</strong>，以代替Js浮点型缺陷的工具类</div>
                   <BigNumberEditor/>
               </TabPane>
           </Tabs>
        )
    }
}

export default Comp;
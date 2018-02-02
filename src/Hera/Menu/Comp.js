/**
 * Created by edeity on 2017/12/28.
 */

import React, {Component} from 'react';
import BigTable from '../comp/bigTable/BigTable';
import BigNumberEditor from '../comp/bigNumber/BigNumberEditor';
import MDDoc from '../comp/mdDoc/MDDoc';

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

// 实例:用户单据
class Comp extends Component {

    getTestData = function(row, col) {
        let data = [];
        let dataRow= row; //
        let dataCol= col; // 列
        for(var i=0; i<dataRow; i++) {
            let tempArray = [];
            data.push(tempArray);
            for(var j=0; j<dataCol; j++) {
                let tempData = { data: i + ',' + j};
                tempArray.push(tempData);
            }
        }
        return data;
    };

    render() {

        return (
           <Tabs defaultActiveKey={"bigTable"}  tabPosition={"left"}>
               <TabPane tab={"表格"} key={"bigTable"}>
                   <BigTable data={this.getTestData(100, 100)}/>
                   <MDDoc docUrl="/md/BigTable.md"></MDDoc>
               </TabPane>
               <TabPane tab={"大数"} key={"bigNum"}>
                   <BigNumberEditor/>
                   <MDDoc docUrl="/md/BigNumber.md"></MDDoc>
               </TabPane>
           </Tabs>
        )
    }
}

export default Comp;
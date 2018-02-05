/**
 * Created by edeity on 2017/12/28.
 */

import React, {Component} from 'react';
import {Tabs, Row, Col} from 'antd';

import BigTable from '../comp/bigTable/BigTable';
import BigNumberEditor from '../comp/bigNumber/BigNumberEditor';
import MDDoc from '../comp/mdDoc/MDDoc';
import BookContainer from '../comp/book/BookContainer';
import Quadrant from '../comp/toDo/Quadrant';
import Todo from '../comp/toDo/Todo';

const TabPane = Tabs.TabPane;
const BookList = BookContainer.BookList;

// 实例:用户单据
class Comp extends Component {

    getTestData = function (row, col) {
        let data = [];
        let dataRow = row; //
        let dataCol = col; // 列
        for (var i = 0; i < dataRow; i++) {
            let tempArray = [];
            data.push(tempArray);
            for (var j = 0; j < dataCol; j++) {
                let tempData = {data: i + ',' + j};
                tempArray.push(tempData);
            }
        }
        return data;
    };

    render() {

        return (
            <Tabs defaultActiveKey={"toDo"} tabPosition={"left"}>
                <TabPane tab="表格" key={"bigTable"}>
                    <div className="inner-container">
                        <BigTable data={this.getTestData(100, 100)}/>
                        <MDDoc
                            docUrl="https://raw.githubusercontent.com/edeity/HeraBill/master/public/md/BigTable.md"/>
                    </div>
                </TabPane>
                <TabPane tab="大数" key={"bigNum"}>
                    <div className="inner-container">
                        <BigNumberEditor/>
                        <MDDoc
                            docUrl="https://raw.githubusercontent.com/edeity/HeraBill/master/public/md/BigNumber.md"/>
                    </div>
                </TabPane>
                <TabPane tab="Todo" key={"toDo"}>
                    <div className="inner-container">
                        <Row>
                            <Col span={12}>
                                <Todo defaultValue={["准备干一些事情"]}/>
                            </Col>
                            <Col span={24}>
                                <MDDoc docUrl="/md/Todo.md"/>
                            </Col>
                            <Col span={24}>
                                <h2>Todo应用__四象限规划</h2>
                                <Quadrant/>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane tab="读书" key={"bookList"}>
                    <div className="inner-container">
                        <h2 style={{textAlign: 'center'}}>
                            仅以记录读完的课外读物, 同时鼓励鞭策自己读更多的书
                        </h2>
                        <BookContainer>
                            <BookList name="上帝掷骰子吗？：量子物理史话"
                                      recommended
                                      date="2017-06"
                                      imgSrc="//img13.360buyimg.com/n1/s200x200_jfs/t10570/28/264917922/50872/16230ae7/59ca0ce0Nb0ebe5a0.jpg"/>
                            <BookList name="精通D3.js"
                                      date="2017-04"
                                      imgSrc="//img11.360buyimg.com/n1/s200x200_jfs/t5971/140/2558371291/293249/406383f/59416389N41715ec3.jpg"/>
                            <BookList name="JavaScript语言精髓"
                                      date="2017-03"
                                      imgSrc="//img14.360buyimg.com/n1/s200x200_jfs/t14287/63/487135291/96214/50c8ec26/5a2f05d2N8d1a7266.jpg"/>
                            <BookList name="程序员修炼之道"
                                      recommended
                                      date="2016-08"
                                      imgSrc="//img14.360buyimg.com/n1/s200x200_jfs/t17884/333/264769253/26660/b7536046/5a66fad2N7d0d9c76.jpg"/>
                            <BookList name="沉默的大多数"
                                      date="2016-03"
                                      imgSrc="//img10.360buyimg.com/n1/s200x200_jfs/t1948/289/2844228714/310060/d0206cc2/56f52f04Nda0985aa.jpg"/>
                            <BookList name="HTTP 权威指南"
                                      date="2016-03"
                                      imgSrc="//img14.360buyimg.com/n1/s200x200_jfs/t19771/3/317170794/192933/7ee6490/5a6ad1d3Ned0bef7c.jpg"/>
                            <BookList name="Working with Unix Processes: 理解Unix进程"
                                      date="2016-02"
                                      imgSrc="//img10.360buyimg.com/n7/jfs/t5563/254/153841625/126862/16a76171/58f9c25bNc25b2cdf.jpg"/>
                            <BookList name="Effective JavaScript:编写高质量JavaScript代码的68个有效方法"
                                      recommended
                                      date="2016-01"
                                      imgSrc="//img10.360buyimg.com/n1/s200x200_g13/M08/04/18/rBEhU1KB97wIAAAAAAPTJ85RehMAAFZcgKfxfkAA9M_171.jpg"/>
                            <BookList name="月亮与六便士"
                                      date="2016-01"
                                      imgSrc="//img10.360buyimg.com/n1/s200x200_jfs/t2059/205/1396397274/81358/886dfe40/56a09a7fN567bad16.jpg"/>
                            <BookList name="数学之美"
                                      recommended
                                      date="2015-12"
                                      imgSrc="//img12.360buyimg.com/n1/s200x200_jfs/t535/313/495218117/815050/9be8097a/546b1647N4326ba2c.jpg"/>
                            <BookList name="JavaScript高级程序设计"
                                      recommended
                                      date="2015-09"
                                      imgSrc="//img12.360buyimg.com/n1/s200x200_jfs/t5713/237/2034261320/248346/e364dcaa/592bf164N7a4187c3.jpg"/>
                            <BookList name="CSS权威指南"
                                      recommended
                                      date="2015-07"
                                      imgSrc="//img10.360buyimg.com/n1/s200x200_jfs/t2851/314/3804921704/166163/1ad2b626/57997c24Nf9850de8.jpg"/>
                            <BookList name="高性能JavaScript"
                                      recommended
                                      date="2015-05"
                                      imgSrc="//img13.360buyimg.com/n1/s200x200_jfs/t1870/255/67118695/351915/798ba476/55ec039eNb9a5ff3e.jpg"/>
                            <BookList name="精通正则表达式"
                                      recommended
                                      date="2015-03"
                                      imgSrc="//img11.360buyimg.com/n1/s200x200_g9/M03/04/15/rBEHaVA92YIIAAAAAAEvwcyKg0wAAA6fAExclUAAS_Z004.jpg"/>
                            <BookList name="鸟哥的Linux私房菜"
                                      recommended
                                      date="2014-06"
                                      imgSrc="//img14.360buyimg.com/n1/s200x200_g13/M07/05/0F/rBEhU1IIdeQIAAAAAAeR_FmIJB4AAB93QDkf9MAB5IU914.jpg"/>
                            <BookList name="Java权威指南"
                                      date="2013-03"
                                      imgSrc="//img11.360buyimg.com/n1/s200x200_jfs/t19516/149/267450733/108062/9e6be753/5a6853e5Nacc4f056.jpg"/>
                        </BookContainer>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

export default Comp;
/**
 * Created by edeity on 2018/2/24.
 */

import React, {Component} from 'react';

import {Col} from 'antd';

import BookContainer from '../../comp/book/BookContainer';
const BookList = BookContainer.BookList;

export default class Book extends Component {
    render() {
        return (
            <BookContainer>
                <Col md={12} lg={8} xl={6}>
                    <BookList name="javascript框架设计(第二版)"
                              date="2017-08"
                              imgSrc="//img12.360buyimg.com/n1/s200x200_jfs/t9181/230/827184604/59565/f5132a3a/59afa68dNc64af049.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList name="上帝掷骰子吗？：量子物理史话"
                              recommended
                              date="2017-06"
                              imgSrc="//img13.360buyimg.com/n1/s200x200_jfs/t10570/28/264917922/50872/16230ae7/59ca0ce0Nb0ebe5a0.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="精通D3.js"
                        date="2017-04"
                        imgSrc="//img11.360buyimg.com/n1/s200x200_jfs/t5971/140/2558371291/293249/406383f/59416389N41715ec3.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="JavaScript语言精髓"
                        date="2017-03"
                        imgSrc="//img14.360buyimg.com/n1/s200x200_jfs/t14287/63/487135291/96214/50c8ec26/5a2f05d2N8d1a7266.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="程序员修炼之道"
                        recommended
                        date="2016-08"
                        imgSrc="//img14.360buyimg.com/n1/s200x200_jfs/t17884/333/264769253/26660/b7536046/5a66fad2N7d0d9c76.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="沉默的大多数"
                        date="2016-03"
                        imgSrc="//img10.360buyimg.com/n1/s200x200_jfs/t1948/289/2844228714/310060/d0206cc2/56f52f04Nda0985aa.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="HTTP 权威指南"
                        date="2016-03"
                        imgSrc="//img14.360buyimg.com/n1/s200x200_jfs/t19771/3/317170794/192933/7ee6490/5a6ad1d3Ned0bef7c.jpg"/>

                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="Working with Unix Processes: 理解Unix进程"
                        date="2016-02"
                        imgSrc="//img10.360buyimg.com/n7/jfs/t5563/254/153841625/126862/16a76171/58f9c25bNc25b2cdf.jpg"/>

                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="Effective JavaScript:编写高质量JavaScript代码的68个有效方法"
                        recommended
                        date="2016-01"
                        imgSrc="//img10.360buyimg.com/n1/s200x200_g13/M08/04/18/rBEhU1KB97wIAAAAAAPTJ85RehMAAFZcgKfxfkAA9M_171.jpg"/>

                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="月亮与六便士"
                        date="2016-01"
                        imgSrc="//img10.360buyimg.com/n1/s200x200_jfs/t2059/205/1396397274/81358/886dfe40/56a09a7fN567bad16.jpg"/>

                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="数学之美"
                        recommended
                        date="2015-12"
                        imgSrc="//img12.360buyimg.com/n1/s200x200_jfs/t535/313/495218117/815050/9be8097a/546b1647N4326ba2c.jpg"/>

                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="JavaScript高级程序设计"
                        recommended
                        date="2015-09"
                        imgSrc="//img12.360buyimg.com/n1/s200x200_jfs/t5713/237/2034261320/248346/e364dcaa/592bf164N7a4187c3.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList name="CSS权威指南"
                              recommended
                              date="2015-07"
                              imgSrc="//img10.360buyimg.com/n1/s200x200_jfs/t2851/314/3804921704/166163/1ad2b626/57997c24Nf9850de8.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="高性能JavaScript"
                        recommended
                        date="2015-05"
                        imgSrc="//img13.360buyimg.com/n1/s200x200_jfs/t1870/255/67118695/351915/798ba476/55ec039eNb9a5ff3e.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="精通正则表达式"
                        recommended
                        date="2015-03"
                        imgSrc="//img11.360buyimg.com/n1/s200x200_g9/M03/04/15/rBEHaVA92YIIAAAAAAEvwcyKg0wAAA6fAExclUAAS_Z004.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="鸟哥的Linux私房菜"
                        recommended
                        date="2014-06"
                        imgSrc="//img14.360buyimg.com/n1/s200x200_g13/M07/05/0F/rBEhU1IIdeQIAAAAAAeR_FmIJB4AAB93QDkf9MAB5IU914.jpg"/>
                </Col>
                <Col md={12} lg={8} xl={6}>
                    <BookList
                        name="Java权威指南"
                        date="2013-03"
                        imgSrc="//img11.360buyimg.com/n1/s200x200_jfs/t19516/149/267450733/108062/9e6be753/5a6853e5Nacc4f056.jpg"/>
                </Col>
            </BookContainer>
        );
    }
}
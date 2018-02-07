/**
 * Created by edeity on 2018/2/6.
 */
import React, {Component} from 'react';

import {Carousel, Row, Col, Icon} from 'antd';
// import Simple from './Three'

import './css/Content.css';

class Content extends Component {
    render() {
        return (<div id="content">
            <div className="section fir-section clear-fix">
                <Row gutter={30}>
                    <Col span="14">
                        <Carousel autoplay>
                            <div className="list nc">
                                <img src="/img/nc.jpg" alt="nc"/>
                            </div>
                            <div className="list excel">
                                <img src="/img/excel-slide.png" alt="excel"/>
                            </div>
                            <div className="list nc-web">
                                <img src="/img/bcs.png" alt="bcs"/>
                            </div>
                        </Carousel>
                    </Col>
                    <Col span="10">
                        <div className="content-wrapper">
                            <h1>让『合并』轻而易举</h1>
                            <h2>多端支撑 赋能云端</h2>
                            <ul>
                                <li><span className="product">NC</span>：20年ToB端坚持 从未退却</li>
                                <li><span className="product">Excel</span>：COM+插件 完美融入</li>
                                <li><span className="product">NC Web</span>：云端平台 迎接ERP新时代</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="section sec-section">
                <h1 className="center">完整的合并流程</h1>
                <span className="separator"/>
                <Row>
                    <Col span="12">
                        <div className="content-wrapper">
                            <h2>合并流程 应有尽有</h2>
                            <p><strong>NC合并报表</strong>的流程</p>
                            <p><strong>NC预算</strong>的数据方案</p>
                            <p>让不可控的，尽在掌握</p>
                        </div>
                    </Col>
                </Row>
                <div className="flow-desc">
                    <span className="step-desc base">基础设置</span>
                    <span className="step-desc  process">合并步骤</span>
                    <span className="step-desc view">展示</span>
                </div>
                <div className="flow-chart slide">
                    <div className="step-container">
                        <span className="step base">定义合并组织体系</span>
                    </div>
                    <div className="step-container">
                        <span className="step base">多维建模</span>
                    </div>
                    <div className="step-container">
                        <div className="step base">
                            定义规则
                            <div className="step-list">
                                <span className="step-li">对账</span>
                                <span className="step-li">调整</span>
                                <span className="step-li">抵销</span>
                                <span className="step-li">计算</span>
                                <span className="step-li">审核</span>
                            </div>
                        </div>
                    </div>
                    <div className="step-container">
                        <span className="step base">涉及表单</span>
                    </div>
                    <div className="step-container">
                        <div className="step base">
                            合并准备
                            <div className="step-list">
                                <span className="step-li">合并方案</span>
                                <span className="step-li">合并任务</span>
                            </div>
                        </div>
                    </div>
                    <div className="branch branch-left">
                        <div className="step-container">
                            <div className="step process">
                                单体报表数据采集
                                <div className="step-list">
                                    <span className="step-li">外系统导入</span>
                                    <span className="step-li">Excel端录入</span>
                                </div>
                            </div>
                        </div>
                        <div className="step-container">
                            <span className="step process">单体公司调整</span>
                        </div>
                        <div className="step-container">
                            <span className="step process">单体公司对账</span>
                        </div>
                        <div className="step-container">
                            <span className="step process">查看对账报告</span>
                        </div>
                    </div>
                    <div className="branch branch-right">
                        <div className="step-container">
                            <span className="step process">登记股权及其变动</span></div>
                    </div>
                    <div className="step-container">
                        <span className="step process">合并前调整</span>
                    </div>
                    <div className="step-container">
                        <span className="step process">抵销合并</span>
                    </div>
                    <div className="step-container">
                        <div className="step view">
                            <div className="step-list">
                                <span className="step-li">格式化报表</span>
                                <span className="step-li">即时查询</span>
                                <span className="step-li">合并工作底稿</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section third-section">
                <div className="bg-banner"></div>
                <h1 className="center">跨系统数据整合</h1>
                <span className="separator"/>
                <h2>不一样的平台，一样的数据</h2>
                <div className="platform">
                    <div className="img-collection">
                        <img src="/img/nc-logo.jpg" alt="nc"/>
                        <img src="/img/sap.jpeg" alt="sap"/>
                        <img src="/img/oracle.jpeg" alt="oracle"/>
                        <img src="/img/excel.jpeg" alt="excel"/>
                        <img src="/img/txt.png" alt="txt"/>
                        <img src="/img/more.png" alt="更多"/>
                    </div>
                    <Icon type="arrow-right"/>
                    <div className="dv-data">多维数据</div>
                </div>
            </div>
            <div className="section forth-section">
                <h1 className="center">多维模型</h1>
                <h2>一样的数据，<span className="op-color">不一样的角度</span></h2>
            </div>
            <div className="section fifth-section">
                <h1 className="center">邀您体验</h1>
                <div className="role-desc line">
                    <span>请选择你的角色</span>
                </div>
                <div className="role-container">
                    <div className="role">
                        <div className="role-img">
                            <a href="http://123.103.9.208:9085/lightapp/">
                                <img src="https://acc.yonyoucloud.com/demo/cwcn.svg" alt="合并会计"/>
                            </a>
                        </div>
                        <span className="role-name">合并会计</span>
                    </div>
                    <div className="role">
                        <div className="role-img">
                            <a href="http://123.103.9.208:9085/lightapp/">
                                <img src="https://acc.yonyoucloud.com/demo/cwzj.svg" alt="单体会计" />
                            </a>
                        </div>
                        <span className="role-name">单体会计</span>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Content;
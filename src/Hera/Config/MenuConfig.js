/**
 * Created by edeity on 2018/1/2.
 */

import React from 'react';
// import BillDemo from '../menu/BillDemo';
import BillDemo from '../menu/async/AsyncBillDemo';
// import Comp from '../menu/Comp';
import Comp from '../menu/async/AsyncComp';
// import Page from '../menu/Page';
import Page from '../menu/async/AsyncPage';

const menuConifg = [{
    key: 'bill',
    url: '/bill',
    iconType: 'user',
    comp: <BillDemo/>,
    title: '单据模板'
},{
    key: 'comp',
    url: '/comp',
    iconType: 'windows-o',
    comp: <Comp/>,
    title: '组件或其他'
}, {
    key: 'page',
    url: '/page',
    iconType: 'api',
    comp: <Page/>,
    title: '渐进学习计划'
}];

export default menuConifg;
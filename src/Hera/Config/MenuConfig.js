/**
 * Created by edeity on 2018/1/2.
 */

import React from 'react';
import BillDemo from '../menu/BillDemo';
import Comp from '../menu/Comp';
import Page from '../menu/Page';

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
    title: '静态页面'
}];

export default menuConifg;
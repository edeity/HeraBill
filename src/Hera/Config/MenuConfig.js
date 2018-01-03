/**
 * Created by edeity on 2018/1/2.
 */

import React from 'react';
import Doc from '../Menu/Doc';
import User from '../Menu/User';
import Post from '../Menu/Post';
import MetaList from '../Menu/MetaList';
import Comp from '../Menu/Comp';
import Plan from '../Menu/Plan';

const menuConifg = [{
    key: 'doc',
    url: '/doc',
    iconType: 'home',
    comp: <Doc/>,
    title: '文档'
}, {
    key: 'post',
    url: '/post',
    iconType: 'contacts',
    comp: <Post/>,
    title: '职位'
}, {
    key: 'user',
    url: '/user',
    iconType: 'user',
    comp: <User/>,
    title: '个人信息'
},{
    key: 'meta',
    url: '/meta',
    iconType: 'book',
    comp: <MetaList/>,
    title: 'meta类型'
}, {
    key: 'comp',
    url: '/comp',
    iconType: 'windows-o',
    comp: <Comp/>,
    title: '组件一览'
}, {
    key: 'plan',
    url: '/plan',
    iconType: 'paper-clip',
    comp: <Plan/>,
    title: '开发计划'
}];

export default menuConifg;
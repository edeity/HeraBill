/**
 * Created by edeity on 2018/1/2.
 */

import React from 'react';
import Doc from '../Menu/Doc';
import User from '../Menu/User';
import Post from '../Menu/Post';
import MetaList from '../Menu/MetaList';
import Comp from '../Menu/Comp';

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
}];

export default menuConifg;
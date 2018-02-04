/**
 * Created by edeity on 2018/2/3.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './BookContainer.css'

import {Icon} from 'antd';

class BookContainer extends Component {

    render() {
        return (
            <div className="book-container">
                {
                    React.Children.map(this.props.children, function (child) {
                        return child
                    })
                }
            </div>
        )
    }
}

class BookList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let name = this.props.name;
        return (<div className="book-list">
            <img className="book-img" src={this.props.imgSrc}/>
            <div className="book-name" title={name}>{this.props.name}</div>
            <div className="book-desc">
                <span className="book-time">{this.props.date}</span>
            </div>
            <div className="book-tags">
                {this.props.douban !== false &&
                <a target="_black"
                   href={`https://www.douban.com/search?q=${name}`}>
                    <span className="book-tag douban-tag hover" title="豆瓣">豆</span>
                </a>}
                {this.props.amazon !== false &&
                <a target="_black"
                   href={`https://www.amazon.cn/s/ref=nb_sb_noss/458-1620990-8133015?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Daps&field-keywords=${name}`}>
                                <span className="book-tag amazon-tag hover" title="亚马逊">
                                    <Icon type="amazon"/>
                                </span>
                </a>
                }
                {this.props.amazon !== false &&
                <a target="_black"
                   href={`https://search.jd.com/Search?keyword=${name}&enc=utf-8&pvid=9c5ff26dbe18451eb341f98353488b38`}>
                    <span className="book-tag jd-tag hover" title="京东">JD</span>
                </a>
                }
                {this.props.recommended && <span className="recommended-tag">推荐</span>}
            </div>
        </div>);
    }
}

BookContainer.BookList = BookList;

BookList.propTypes = {
    name: PropTypes.string.isRequired,
    douban: PropTypes.bool,
    recommended: PropTypes.bool,
    date: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
};

export default BookContainer;
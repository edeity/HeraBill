/**
 * Created by edeity on 2018/2/2.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Anchor, Spin} from 'antd';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'
import './reset-markdown.css';

const {Link} = Anchor;

const gitHubDocUrl = 'https://raw.githubusercontent.com/edeity/HeraBill/master/public';

// 实例:用户单据
class MDDoc extends Component {
    constructor(props) {
        super(props);

        this.toc = [];

        // 配置导航页渲染
        let renderer = (() => {
            var renderer = new marked.Renderer();
            renderer.heading = (text, level, raw) => {
                var anchor = raw.replace(/[-<>]+/g, '-');
                let currAnchorData = {
                    level: level,
                    anchor: anchor,
                    title: text
                };

                // 生成树级toc
                if (level > 1) {
                    this.toc.push(currAnchorData);
                }

                var resDOM = `
                        <h${level} id='${anchor}'>${text}
                            <a class="title-anchor">#</a>
                        </h${level}>
                    `;
                return resDOM;
            };
            return renderer;
        })();

        // 配置mark渲染
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            },
            renderer: renderer,
            gfm: true,
            tables: true
        });

        if (this.props.docUrl) {
            // 请求远程
            this.state = {
                loading: true, // 是否正在加载
                markStr: '', // 需要被markdown的字符串
                toc: [] // 目录
            };
            let url = this.props.linkGithubDoc ? gitHubDocUrl + this.props.docUrl : this.props.docUrl;
            fetch(url)
                .then(response => response.text())
                .then(txt => {
                    let markStr = marked(txt);
                    this.setState({
                        loading: false,
                        markStr: markStr,
                    }, ()=> {
                        this.setState({
                            toc: this.__renderToc()
                        })
                    });
                });
        } else {
            // 渲染本地
            this.state = {
                loading: false, // 是否正在加载
                markStr: marked(this.props.docStr), // 需要被markdown的字符串
                toc: [] // 目录
            };
        }
    }

    __renderToc() {
        // 重新构建树
        let resultToc = [];
        let pre = null;

        this.toc.forEach((now) => {
            setRelative(now, pre, resultToc);
            pre = now;
        });

        return resultToc;

        function setRelative(now, pre, all) {
            if (!pre) {
                all.push(now)
            } else if (now.level > pre.level) {
                pre.child = pre.child || [];
                pre.child.push(now);
                now.parent = pre;
            } else {
                if (pre.parent) {
                    setRelative(now, pre.parent, all);
                } else {
                    all.push(now)
                }
            }
        }
    }
    
    createMarkup = ()=> {
        return {__html: this.state.markStr};
    };

    createTocByData = (data) => {
        return data.map((eachData) => {
            let result = null;
            if (!eachData.child) {
                result = <Link key={ eachData.anchor } href={'#'+eachData.anchor} title={ eachData.title }/>
            } else {
                result = <Link key={ eachData.anchor } href={'#'+eachData.anchor} title={ eachData.title }>
                    {
                        this.createTocByData(eachData.child)
                    }
                </Link>
            }
            return result;
        })
    };


    render() {
        return (
            <div className="md-doc" style={{margin: "10px 0"}}>
                <Spin
                    size="large"
                    spinning={this.state.loading}
                    delay={500}
                    style={{ 'marginTop': 100}}>
                    <div className="markdown-body" dangerouslySetInnerHTML={ this.createMarkup()}/>
                    {
                        this.props.isToc
                        && <Anchor className="home-anchor">
                            { this.createTocByData(this.state.toc) }
                        </Anchor>
                    }
                </Spin>
            </div>
        )
    }
}


MDDoc.propTypes = {
    isToc: PropTypes.bool,
    linkGithubDoc: PropTypes.bool,
    docUrl: PropTypes.string,
    docStr: PropTypes.string
};

export default MDDoc;
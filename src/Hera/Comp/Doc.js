/**
 * Created by edeity on 02/11/2017.
 */

import React, {Component} from 'react';
import {Anchor} from 'antd';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'

const {Link} = Anchor;

// 实例:用户单据
class Doc extends Component {
    constructor(props) {
        super(props);

        let toc = [];

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
                    toc.push(currAnchorData);
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

        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            },
            renderer: renderer,
            gfm: true,
            tables: true,
        });


        fetch(window.location.origin + '/doc.md')
            .then(response => response.text())
            .then(txt => {
                this.setState({
                    markStr: marked(txt)
                }, () => {

                    // 重新构建树
                    let resultToc = [];
                    let pre = null;

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

                    toc.forEach((now) => {
                        setRelative(now, pre, resultToc);
                        pre = now;
                    });

                    this.setState({
                        toc: resultToc
                    })
                });
            });

        this.state = {
            markStr: '',
            toc: []
        }
    }

    createMarkup = ()=> {
        return {__html: this.state.markStr};
    };

    createTocByData = (data) => {
        return data.map((eachData) => {
            let result = null;
            if (!eachData.child) {
                result = <Link key={ Math.random()} href={'#'+eachData.anchor} title={ eachData.title }/>
            } else {
                result = <Link key={ Math.random()} href={'#'+eachData.anchor} title={ eachData.title }>
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
            <div>
                <div className="markdown-body" dangerouslySetInnerHTML={ this.createMarkup() }/>
                <Anchor className="home-anchor"> { this.createTocByData(this.state.toc) }
                </Anchor>
            </div>
        )
    }
}

export default Doc;
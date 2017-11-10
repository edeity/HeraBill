/**
 * Created by edeity on 02/11/2017.
 */

import React, {Component} from 'react';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'
import $ from 'jquery';

// 实例:用户单据
class Home extends Component {
    constructor(props) {
        super(props);

        window.scrollTo = function (id) {
            var $Node = $(`#${id}`);
            $("html, body").animate({
                scrollTop: $Node.offset().top + "px"
            }, {
                duration: 500,
                easing: "swing"
            });
            return false;
        };

        this.toc = [];
        let renderer = (() => {
            var renderer = new marked.Renderer();
            renderer.heading = (text, level, raw) => {
                var anchor = raw.replace(/[-<>]+/g, '-');
                this.toc.push({
                    anchor: anchor,
                    level: level,
                    text: text
                });
                var resDOM = `
                        <h${level} id='${anchor}'>${text}
                            <a class="title-anchor" onclick="window.scrollTo('${anchor}')">#</a>
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
            // tables: true,
            // breaks: false,
            // pedantic: false,
            // sanitize: true,
            // smartLists: true,
            // smartypants: false
        });


        fetch(window.location.origin + '/home.md')
            .then(response => response.text())
            .then(txt => {
                this.setState({
                    markStr: txt
                })
            })

        this.state = {
            markStr: '',
        }
    }

    createMarkup = ()=> {
        return {__html: marked(this.state.markStr)};
    };

    render() {
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={ this.createMarkup() }/>
        )
    }
}

export default Home;
/**
 * Created by edeity on 2018/2/6.
 */
import React, {Component} from 'react';

import {Row, Col} from 'antd';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

export default class Page extends Component {
    state = {book: null};
    async componentDidMount() {
        const { default: Book} = await import('./page/Book');
        this.setState({
            book: <Book/>
        })
    }
    render() {
        return (
            <Tabs defaultActiveKey={"bookList"} animated={false}>
                <TabPane tab="那些年读的书" key={"bookList"}>
                    <div className="inner-container">
                        <h2 style={{textAlign: 'center', marginTop: 20}}>
                            仅以记录读完的课外读物, 同时鼓励鞭策自己读更多的书
                        </h2>
                        <Row>
                            {this.state.book || <h2>loading</h2>}
                        </Row>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}
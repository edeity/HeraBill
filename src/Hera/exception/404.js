/**
 * Created by edeity on 10/11/2017.
 */

import React, {Component} from 'react';

/**
 * 404
 */
class Status_404 extends Component {
    constructor() {
        super();
        this.time = new Date();
        this.state = {
            showUnderLine: true
        }
    }

    toggleUnderLine =  () => {
        this.setState({
            showUnderLine: !this.state.showUnderLine
        })
    };

    componentDidMount = () => {
        window.setInterval(this.toggleUnderLine, 500);
    };

    render() {
        return <div className="not-found">
            <div className="shell">
                <div className="tips">{"Last login：" + this.time + " on ttys002"}</div>
                <span className="pre">edeity@:~></span>
                <span className="command">Whoops, looks like that page doesn't exist</span>
                {this.state.showUnderLine && <span className="underline"/>}
            </div>
        </div>
    }
}

export default Status_404;
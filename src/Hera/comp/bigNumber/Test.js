import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val1: 0,
            val2: 0,
            val3: 0
        };
    }
    componentWillMount() {
        this.setState({
            val1: this.state.val1 + 1
        })
        console.log('willMount', this.state.val1);
        this.setState({
            val1: this.state.val1 + 1
        })
        console.log('willMount', this.state.val1);
        setTimeout(() => {
            this.setState({val1: this.state.val1 + 1});
            console.log('willMount', this.state.val1);

            this.setState({val1: this.state.val1 + 1});
            console.log('willMount', this.state.val1);
        }, 0)
    }
    componentDidMount() {
        this.setState({
            val2: this.state.val2 + 1
        })
        console.log(this.state.val2);
        this.setState({
            val2: this.state.val2 + 1
        })
        console.log(this.state.val2);
        setTimeout(() => {
            this.setState({val2: this.state.val2 + 1});
            console.log(this.state.val2);

            this.setState({val2: this.state.val2 + 1});
            console.log(this.state.val2);
        }, 0)
    }
    render() {
        return null;
    }
}

export  default Test;
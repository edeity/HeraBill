/**
 * Created by edeity on 2018/2/24.
 */
import React, {Component} from 'react';

import Loadable from 'react-loadable';

const TempLoadComponent = Loadable({
    loader: () => import('../Page'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading() {
        return <h2>loading</h2>
    }
});

export default class AsyncPage extends Component {
    render() {
        return <TempLoadComponent/>;
    }
}
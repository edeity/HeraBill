/**
 * Created by edeity on 2018/2/24.
 */
import React, {Component} from 'react';

import Loadable from 'react-loadable';
import Loading from '../../comp/Loading';

const TempLoadComponent = Loadable({
    loader: () => import('../../comp/bigNumber/BigNumberEditor'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading() {
        return <Loading/>
    }
});

export default class BigNumberDescPage extends Component {
    render() {
        return <TempLoadComponent/>;
    }
}
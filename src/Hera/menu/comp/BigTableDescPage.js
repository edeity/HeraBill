/**
 * Created by edeity on 2018/2/24.
 */
import React, {Component} from 'react';

import Loadable from 'react-loadable';
import Loading from '../../comp/Loading';

function getTestData (row, col) {
    let data = [];
    let dataRow = row; //
    let dataCol = col; // 列
    for (var i = 0; i < dataRow; i++) {
        let tempArray = [];
        data.push(tempArray);
        for (var j = 0; j < dataCol; j++) {
            let tempData = {data: i + ',' + j};
            tempArray.push(tempData);
        }
    }
    return data;
};

const TempLoadComponent = Loadable({
    loader: () => import('../../comp/bigTable/BigTable'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component data={getTestData(100, 100)}/>;
    },
    loading() {
        return <Loading/>
    }
});

export default class BigTableDescPage extends Component {
    render() {
        return <TempLoadComponent/>;
    }
}
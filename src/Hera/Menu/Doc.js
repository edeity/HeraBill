/**
 * Created by edeity on 02/11/2017.
 */

import React, {Component} from 'react';
import MDDoc from '../comp/mdDoc/MDDoc';

// 实例:用户单据
class Doc extends Component {
    render() {
        return (<MDDoc 
            isToc
            docUrl="https://raw.githubusercontent.com/edeity/HeraBill/master/public/doc.md"/>)
    }
}

export default Doc;
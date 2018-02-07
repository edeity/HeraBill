/**
 * Created by edeity on 2018/2/6.
 */
import React, {Component} from 'react';
import './css/Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="desc"></div>
                <div className="state">
                    产品状态：限购 | 版权所有 @2018 用友网络科技股份有限公司 All rights reserved
                </div>
            </footer>)
    }
}

export default Footer;
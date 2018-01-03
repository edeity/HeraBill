/**
 * Created by edeity on 2017/12/28.
 */

import React, {Component} from 'react';
import BigTable from '../Comp/BigTable';

// 实例:用户单据
class Comp extends Component {
    render() {
        return (
           <div>
               <h2>表格</h2>
               <p>代替一般<code>table</code>渲染（用以解决渲染数据量过多而导致前端卡顿的情况），假如需要复杂的交互，推荐使用
                   <a href="https://handsontable.com">handsontable.js</a></p>
               <BigTable/>
           </div>
        )
    }
}

export default Comp;
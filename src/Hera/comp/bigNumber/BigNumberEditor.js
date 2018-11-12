/**
 * Created by edeity on 2018/1/31.
 */

import React, {Component} from 'react';
import BigNumber from './BigNumber';
import BigNumberBlock from './BigNumberBlock'
import Test from './Test';

class BigNumberEditor extends Component {
    constructor() {
        super();
        this.state = {
            calStore: ['0.1', '+', '0.2']
        }
    }

    getBlockRender() {
        let blockRender = [];
        let self = this;
        this.state.calStore.forEach(function (eachBlockData, index) {
            blockRender.push(
                <BigNumberBlock key={index} index={index} value={eachBlockData}
                                onChange={function(value, index) {
                                    let calStore = self.state.calStore;
                                    calStore[index] = value;
                                    self.setState({
                                        calStore: calStore
                                    })}
                                }/>);
        });
        return blockRender;
    }

    getResult() {
        let calStore = this.state.calStore;
        let firNumStr = calStore[0];
        let symbol = calStore[1];
        let secNumStr = calStore[2];
        let firNum = new BigNumber(firNumStr);
        let secNum = new BigNumber(secNumStr);
        if(firNum.isValid() && secNum.isValid()) {
            switch(symbol) {
                case '+':
                    return firNum.add(secNum).toString();
                case '-':
                    return firNum.minus(secNum).toString();
                case '*':
                    return firNum.multiply(secNum).toString();
                case '/':
                    return firNum.divide(secNum).toString();
                default:
                    return '未知运算符号'
            }   
        } else {
            return "不是合法的数值";
        }
    }

    getJsResult() {
        let calStore = this.state.calStore;
        let firNumStr = calStore[0];
        let symbol = calStore[1];
        let secNumStr = calStore[2];
        let firNum = parseFloat(firNumStr);
        let secNum = parseFloat(secNumStr);
        switch(symbol) {
            case '+':
                return firNum + secNum;
            case '-':
                return firNum - secNum;
            case '*':
                return firNum * secNum;
            case '/':
                return firNum / secNum;
            default:
                return '未知运算符号，仅支持 +（加）、-（减）、*（乘）、/（除）'
        }
    }

    render() {
        return (
                <div className="editor">
                    {this.getBlockRender()}
                    <Test/>
                    <div className="result">
                        <span className="desc">类库</span>
                        <span className="symbol">=</span> {this.getResult()} </div>
                    <div className="result">
                        <span className="desc">原生</span>
                        <span className="symbol">=</span> {this.getJsResult()}</div>
                </div>
            )

    }
}

export default BigNumberEditor;
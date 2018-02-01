/**
 * Created by edeity on 2017/7/22.
 */

const nonNegativeIntReg = /^\d+$/; // 非负整数正则
const bigNumArrReg = /^(-?)(\d*)(\.?)(\d*)$/; // 所有数值

class Infinity {
    toString() {
        return "Infinity";
    }
}

class BigNumber {
    // 该值为一个数组,第一个为原字符串, 第二个为正负值, 第三个为整数值, 第四个为小数点, 第五个为浮点值
    __value = null;

    constructor(numStr) {
        numStr = ('' + numStr).trim(); // 将数值转为字符串
        this.__value = numStr.match(bigNumArrReg);
    }

    getValue() {
        return this.__value
    }
    setValue (val) {
        this.__value = val;
    }
    // 整数部分
    getIntValue() {
        return this.__value[2] === '' ? '0' : this.__value[2];
    }
    setIntValue(intArr) {
        this.__value[2] = intArr;
    }
    // 浮点部分
    getFloatValue() {
        return this.__value[4] === '' ? '0' : this.__value[4];
    }
    setFloatValue(floatArr) {
        this.__value[4] = floatArr;
    }
    // 是否为整数
    isPositive() {
        return !(this.__value[1] === '-');
    }
    setPositive(isPositive) {
        this.__value[1] = isPositive ? '' : '-';
    }
    copy() {
        return new BigNumber(this.toString());
    }
    // 获取对应数值的字符串
    toString() {
        if (this.getFloatValue() === '0') {
            this.valueStr =  this.__value[1] + this.getIntValue();
        } else {
            this.valueStr = this.__value[1] + this.getIntValue() + '.' + this.getFloatValue();
        }
        return this.valueStr;
    }
    // 放大的倍数，以10为单位，若timesNum为负数，则缩小相应的倍数
    times(timesNum) {
        let newNumber = new BigNumber("0");
        let intNum = this.getIntValue().split('');
        let firFloatNum = this.getFloatValue().split('');
        if(timesNum > 0) {
            // 扩大
            for(let i=0; i<timesNum; i++) {
                let currFirFloatBit = firFloatNum.shift() || 0;
                intNum.push(currFirFloatBit);
            }
        } else if(timesNum < 0) {
            // 缩小
            timesNum = Math.abs(timesNum);
            for(let i=0; i<timesNum; i++) {
                let currFirIntBit = intNum.pop() || 0;
                firFloatNum.unshift(currFirIntBit);
            }
        }
        // int:抹去高位为0的部分，eg："0001"，得到的结果是 "1"
        for (let i = 0, firLen = intNum.length; i < firLen; i++) {
            if (intNum[i] === '0') {
                intNum[i] = '';
            } else {
                break; // 高位存在不为零的情况，中断后续
            }
        }
        newNumber.setIntValue(intNum.join(""));
        newNumber.setFloatValue(firFloatNum.join(""));
        newNumber.setPositive(this.isPositive());
        return newNumber;
    }
    // 放大一定倍数，使成为整数
    _timesToInt(firNum, secNum, isMul) {
        // 化小数位整数
        let firIntStr = firNum.getIntValue().split('');
        let secIntStr = secNum.getIntValue().split('');
        let firFloatValue = firNum.getFloatValue();
        let secFloatValue = secNum.getFloatValue();
        let firFloatLength = firFloatValue === "0" ? 0 : firFloatValue.length;
        let secFloatLength = secFloatValue === "0" ? 0 :secFloatValue.length;
        let firFloatArr = firFloatValue.split("");
        let secFloatArr = secFloatValue.split("");
        let magnification;
        if(isMul) {
            magnification = firFloatLength + secFloatLength;
            for(let i=0; i<firFloatLength; i++) {
                firIntStr.push(firFloatArr[i] || '0');
            }
            for(let i=0; i<secFloatLength; i++) {
                secIntStr.push(secFloatArr[i] || '0');
            }
        } else {
            magnification = firFloatLength >= secFloatLength ? firFloatLength : secFloatLength;
            for (let i = 0; i < magnification; i++) {
                let tempFirValue = firFloatArr[i] || '0';
                let tempSecValue = secFloatArr[i] || '0';
                firIntStr.push(tempFirValue);
                secIntStr.push(tempSecValue);
            }
            // int:抹去高位为0的部分，eg："0001"，得到的结果是 "1"
            for (let i = 0, firLen = firIntStr.length; i < firLen; i++) {
                if (firIntStr[i] === '0') {
                    firIntStr[i] = '';
                } else {
                    break; // 高位存在不为零的情况，中断后续
                }
            }
            for (let i = 0, secLen = firIntStr.length; i < secLen; i++) {
                if (secIntStr[i] === '0') {
                    secIntStr[i] = '';
                } else {
                    break; // 高位存在不为零的情况，中断后续
                }
            }
        }

        return {
            firStr: firIntStr.join(''),
            secStr: secIntStr.join(''),
            magnification: magnification
        }
    }
    // 缩小一定倍数，使恢复从timesToInt的值
    _timesToFloat(numArray, magnification) {
        let resultLen = numArray.length;
        let intPart;
        let floatPart;
        if(magnification <= numArray.length) {
            intPart = numArray.slice(0, resultLen - magnification);
            floatPart = numArray.slice(resultLen - magnification, resultLen);
        } else {
            intPart = [];
            floatPart = numArray;
            for(let i=0, len=magnification-numArray.length; i<len; i++) {
                floatPart.unshift('0');
            }
        }
        // int:抹去高位为0的部分，eg："0001"，得到的结果是 "1"
        for (var i = 0, intLen = intPart.length; i < intLen; i++) {
            if (intPart[i] === '0' || intPart[i] === 0) {
                intPart[i] = '';
            } else {
                break; // 高位存在不为零的情况，中断后续
            }
        }
        // float:抹去低位为0的部分，eg："123.123000"，得到的记过是"123.123"
        for (var j = 0, floatLen = floatPart.length; j < floatLen; j++) {
            let currPos = floatLen - j - 1;
            if (floatPart[currPos] === '0' || floatPart[currPos] === 0) {
                floatPart[currPos] = ''
            } else {
                break; // 低位存在不为零的情况，中断后续
            }
        }
        return new BigNumber(intPart.join('') + '.' + floatPart.join(''));
    }
    isZero() {
        return this.isBigger(new BigNumber("0")) === null;
    }
    // 比较两个数的大小, 假若相等,则返回null
    isBigger(secBigNum) {
        let firPositive = this.isPositive();
        secBigNum = secBigNum instanceof BigNumber ? secBigNum : new BigNumber(secBigNum);
        let secPositive = secBigNum.isPositive();
        if(firPositive && !secPositive) {
            return true;
        } else if(!firPositive && secPositive) {
            return false;
        } else {
            let baseBigger = null;
            let firIntValue = this.getIntValue();
            let firFloatValue = this.getFloatValue();
            let secIntValue = secBigNum.getIntValue();
            let secFloatValue = secBigNum.getFloatValue();
            if(firIntValue.length > secIntValue.length) {
                baseBigger = true;
            } else if(firIntValue.length < secIntValue.length) {
                baseBigger = false;
            } else {
                let intLength = firIntValue.length;
                for(let i=0; i<intLength; i++) {
                    if(firIntValue[i] > secIntValue[i]) {
                        baseBigger = true;
                        break;
                    } else if(firIntValue[i] < secIntValue[i]) {
                        baseBigger = false;
                        break;
                    }
                }
                if(baseBigger === null) {
                    let floatLength = firFloatValue.length > secFloatValue.length
                        ? firFloatValue.length
                        : secFloatValue.length;
                    for(let i=0; i<floatLength; i++) {
                        if(firFloatValue[i] > secFloatValue[i]) {
                            baseBigger = true;
                            break;
                        } else if(firFloatValue[i] < secFloatValue[i]) {
                            baseBigger = false;
                            break;
                        }
                    }
                }
            }
            if(firPositive) {
                return baseBigger;
            }else {
                return !baseBigger;
            }
        }
    }
    max(firBigNum, secBigNum) {
        return this.isBigger(firBigNum, secBigNum) ? firBigNum : secBigNum;
    }
    min(firBigNum, secBigNum) {
        return this.isBigger(firBigNum, secBigNum) ? secBigNum : firBigNum;
    }
    // 供外界调用的加法
    add(numStr) {
        // 负责BigNumber;
        let copyFirNum = new BigNumber(this.toString());
        let copySecNum = numStr instanceof BigNumber
            ? new BigNumber(numStr.toString())
            : new BigNumber(numStr);
        let result = null;
        if (copyFirNum.isPositive()) {
            if (copySecNum.isPositive()) {
                // 正数1 + 正数2
                result = copyFirNum._baseAdd(copySecNum);
            } else {
                // 正数1 + 负数2 - > 正数1 - |负数2|
                copySecNum.setPositive(true);
                result = copyFirNum._baseMinus(copySecNum);
            }
        } else {
            if (copySecNum.isPositive()) {
                // 负数1 + 正数2 -> 正数2 - |负数1|
                copyFirNum.setPositive(true);
                result = copySecNum._baseMinus(copyFirNum);
            } else {
                // 负数1 + 负数2 -> - (|负数1| + |负数2|)
                copyFirNum.setPositive(true);
                copySecNum.setPositive(true);
                result = copyFirNum._baseAdd(copySecNum);
                result.setPositive(false);
            }
        }
        return result;
    }
    // 供外界调用的减法
    minus(numStr) {
        let copyFirNum = new BigNumber(this.toString());
        let copySecNum = numStr instanceof BigNumber
            ? new BigNumber(numStr.toString())
            : new BigNumber(numStr);
        let result = null;
        if (copyFirNum.isPositive()) {
            if (copySecNum.isPositive()) {
                // 正数 - 正数
                result = copyFirNum._baseMinus(copySecNum);
            } else {
                // 正数1 - 负数2 -> 正数1 + |负数2|
                copySecNum.setPositive(true);
                result =  copyFirNum._baseAdd(copySecNum);
                result.setPositive(true);
            }
        } else {
            if (copySecNum.isPositive()) {
                // 负数1 - 正数2 -> - （正数2 - |负数1|）
                copyFirNum.setPositive(true);
                result = copySecNum._baseAdd(copyFirNum);
            } else {
                // 负数1 - 负数2 -> |负数2| - |负数1|
                copyFirNum.setPositive(true);
                copySecNum.setPositive(true);
                result = copySecNum._baseMinus(copyFirNum);

            }
        }
        return result;
    }
    // 供外界调用的乘法
    multiply(numStr) {
        let secBigNum = numStr instanceof BigNumber ? numStr :new BigNumber(numStr);
        let result = this._baseMultiply(secBigNum);
        result.setPositive(this.isPositive() === secBigNum.isPositive()); // 符号相同即为正；
        return result;
    }
    // 供外界调用的除法
    divide(numStr, leaveBit) {
        let secBigNum = numStr instanceof BigNumber ? numStr : new BigNumber(numStr);
        if(secBigNum.isZero()) {
            return new Infinity();
        } else {
            this.setPositive(this.isPositive() === secBigNum.isPositive());
            let result = this._baseDivide(secBigNum, leaveBit);
            return result;
        }
    }
    // 两个正数的加法
    _baseAdd(secBigNum) {
        let timesResult = this._timesToInt(this, secBigNum);
        let firIntArr = timesResult.firStr.split('');
        let secIntArr = timesResult.secStr.split('');
        let magnification = timesResult.magnification;


        // 整数的加法
        let resultIntArr = [];
        let firIntLength = firIntArr.length;
        let secIntLength = secIntArr.length;
        let isFirLead = firIntLength >= secIntLength;
        let shortLen = isFirLead ? secIntLength : firIntLength; // 最短的长度，作为循环加的次数
        let longLen = isFirLead ? firIntLength : secIntLength; // 最长的长度
        let longInrArr = isFirLead ? firIntArr : secIntArr;
        let carryFlag = false; // 进位标志

        // 单字符串的相加
        for (let i = 0; i < shortLen; i++) {
            let firChar = firIntArr[firIntLength - i - 1];
            let secChar = secIntArr[secIntLength - i - 1];
            let resultValue = parseInt(firChar, 10) + parseInt(secChar, 10);
            if (carryFlag) {
                resultValue++;
            }
            // 处理结果是否仍存在进位情况
            if (resultValue >= 10) {
                resultValue -= 10;
                carryFlag = true;
            } else {
                carryFlag = false;
            }
            resultIntArr.unshift('' + resultValue);
        }

        // 补位，存在后续进位的可能
        if (longLen > shortLen) {
            for (let j = shortLen; j < longLen; j++) {
                let currValue = carryFlag
                    ? parseInt(longInrArr[longLen - j - 1], 10) + 1
                    : parseInt(longInrArr[longLen - j - 1], 10);
                if (currValue >= 10) {
                    currValue -= 10;
                    carryFlag = true;
                } else {
                    carryFlag = false;
                }
                resultIntArr.unshift('' + currValue);
            }
        }

        // 补位完毕，仍然存在进位的情况
        if (carryFlag) {
            resultIntArr.unshift(1); // 产生新的位,以1填充
        }

        // 还原
        return this._timesToFloat(resultIntArr, magnification);
    }
    // 两个正数的减法
    _baseMinus(secBigNum) {
        let timesResult = this._timesToInt(this, secBigNum);
        let firIntArr = timesResult.firStr.split('');
        let secIntArr = timesResult.secStr.split('');
        let magnification = timesResult.magnification;
        let oppositeFlag = false;

        // 正数的减法
        let resultIntArr = [];
        let firIntLength = firIntArr.length;
        let secIntLength = secIntArr.length;
        let isFirLead = firIntLength >= secIntLength;
        let shortLen = isFirLead ? secIntLength : firIntLength; // 最短的长度，作为循环加的次数
        let longLen = isFirLead ? firIntLength : secIntLength; // 最长的长度
        let longInrArr = isFirLead ? firIntArr : secIntArr;
        let abdicationFlag = false; // 退位标志


        // 假如减数大于被减数，则交换减数和被减数，oppositeFlag(证明结果为负)
        let isBigger = this.isBigger(secBigNum);
        if(isBigger === null) {
            // 相等,则直接返回
            return new BigNumber("0");
        } else if (!this.isBigger(secBigNum)) {
            let temp = firIntArr;
            firIntArr = secIntArr;
            secIntArr = temp;
            let tempLength = firIntLength;
            firIntLength = secIntLength;
            secIntLength = tempLength;
            oppositeFlag = true;
        }

        // 单字符串的相减
        for (let i = 0; i < shortLen; i++) {
            let firChar = firIntArr[firIntLength - i - 1];
            let secChar = secIntArr[secIntLength - i - 1];
            let resultValue = parseInt(firChar, 10) - parseInt(secChar, 10);
            if (abdicationFlag) {
                resultValue--;
            }
            // 处理结果是否仍存在进位情况
            if (resultValue < 0) {
                resultValue += 10;
                abdicationFlag = true;
            } else {
                abdicationFlag = false;
            }
            resultIntArr.unshift('' + resultValue);
        }

        // 补位，存在后续退位可能
        if (longLen > shortLen) {
            for (let j = shortLen; j < longLen; j++) {
                let currValue = abdicationFlag
                    ? parseInt(longInrArr[longLen - j - 1], 10) - 1
                    : parseInt(longInrArr[longLen - j - 1], 10);
                if (currValue < 0) {
                    currValue += 10;
                    abdicationFlag = true;
                } else {
                    abdicationFlag = false;
                }
                resultIntArr.unshift('' + currValue);
            }
        }
        // 补位，两数值位数相等
        else if (abdicationFlag) {
            oppositeFlag = true; // 变成了负数
        }


        let result = this._timesToFloat(resultIntArr, magnification);
        // 还原
        if (oppositeFlag) {
            result.setPositive(false);
        }
        return result;
    }
    // 两个正数的相乘
    _baseMultiply(secBigNum) {
        let timesResult = this._timesToInt(this, secBigNum, true);
        let firIntArr = timesResult.firStr.split('');
        let secIntArr = timesResult.secStr.split('');
        let magnification = timesResult.magnification;

        // 每次用被乘数 * 1位数
        let tempResultArray = [];
        let magnificationNum = 0;
        firIntArr = firIntArr.reverse();
        secIntArr = secIntArr.reverse();
        secIntArr.forEach((oneBitNum) => {
            tempResultArray.push(this._baseOneBitMultiply(firIntArr, oneBitNum, magnificationNum));
            magnificationNum++;
        });

        // 累加每次计算的结果
        let realResult = new BigNumber("0");
        tempResultArray.forEach(function (tempResult) {
            realResult = realResult.add(tempResult);
        });

        // 得到最终结果
        return this._timesToFloat(realResult.toString().split(""), magnification);
    }
    // 一个大正整数和一个一位正数的乘法
    _baseOneBitMultiply(bigNumArray, oneBitNum, timesNum) {
        var oneSecBitNum = parseInt(oneBitNum, 10);
        let carryNum = 0;
        let resultArray = [];
        bigNumArray.forEach(function (oneFirBitNum) {
            let currNum = parseInt(oneFirBitNum, 10) * oneSecBitNum + carryNum;
            carryNum = Math.floor(currNum / 10);
            resultArray.unshift(currNum % 10);
        });

        if(carryNum) {
            resultArray.unshift(carryNum);
        }

        for(let i=0; i<timesNum; i++) {
            resultArray.push("0");
        }
        return resultArray.join("");
    }
    // 两个正数除
    _baseDivide(secBigNum, leaveBit) {
        // 预处理
        let timesValue = -1;
        let tempNum = new BigNumber(this.toString());
        while(tempNum.isBigger(secBigNum) === true) {
            timesValue--;
            tempNum = tempNum.times(-1);
        }
        // 正式运算
        leaveBit = leaveBit || 16; // 默认保留的位数
        let resultArray = []; // 存储结果的集
        let isDivides = false; // 是否已经被除尽
        for(let i=0; i<leaveBit; i++) {
            for(let j=0; j<10; j++) {
                tempNum = tempNum.minus(secBigNum);
                // 当发现不再是正数，证明不可再减
                if(tempNum.toString() === "0") {
                    resultArray.push(j + 1);
                    isDivides = true;
                    break;
                } else if(!tempNum.isPositive()) {
                    resultArray.push(j);
                    tempNum = tempNum.add(secBigNum);
                    tempNum = tempNum.times(1); // 扩大10倍
                    timesValue++;
                    break;
                }
            }
            if(isDivides) {
                timesValue = timesValue + 1;
                break;
            }
        }
        return this._timesToFloat(resultArray, timesValue);
    }
    isValid() {
        return this.__value && this._isValidNumStr(this.__value[0]);
    }
    _isValidNumStr(numStr) {
        let numArray = numStr.match(bigNumArrReg);
        return numArray && numArray.length === 5 &&
            (numArray[1] === '' || numArray[1] === '-') &&
            (numArray[2] === '' || nonNegativeIntReg.test(numArray[2])) &&
            (numArray[3] === '' || numArray[3] === '.') &&
            (numArray[4] === '' || nonNegativeIntReg.test(numArray[4]));
    }
}

export default BigNumber;
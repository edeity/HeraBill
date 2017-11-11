/**
 * Created by edeity on 11/11/2017.
 */
import $ from 'jquery';

// 默认的meta
let defaultValue = {
    value: null,
    __isValidate: true
};

// 实例:用户单据
class DefaultValue {
    static createSingleValue = () => {
        let copyData = $.extend(true, {}, defaultValue);
        return copyData  
    };
    static createValue = (data, nKey) => {
        let keys = Object.keys(data);
        let copyData = $.extend(true, {}, data);
        keys.forEach((eachKey) => {
            if(nKey && nKey.includes(eachKey)) {
               delete copyData[eachKey];
            } else {
                let initData = $.extend(true, {}, defaultValue);
                initData.value = copyData[eachKey];
                copyData[eachKey] = initData;
            }
            
        });

        return copyData;
    };
    static createArrayValue = (data) => {
        let copyData = $.extend(true, [], data);
        copyData.forEach((eachData, index)=>{
            copyData[index] = DefaultValue.createValue(eachData)
        });
        return copyData;
    }
    static reduction = (data) => {
        let returnData = {};
        let keys = Object.keys(data);
        keys.forEach((key) => {
            returnData[key] = data[key].value;
        })
        return returnData;
    };
    static reductionArray = (data) => {
        let copyData = $.extend(true, [], data);
        copyData.forEach((eachData, index)=> {
            copyData[index] = DefaultValue.reduction(eachData);
        })
        return copyData;
    }
}

export default DefaultValue;
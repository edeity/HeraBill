/**
 * Created by edeity on 11/11/2017.
 */
import Type from './Type';

/**
 * 数据流动所需要的状态值,
 * 一般与显示属性有关
 * */
let defaultValue = {
    value: '',
    // 其他属性
    editable: true,
    __isValidate: true,
};

// 实例:用户单据
class DefaultValue {
    static CONSTANT = {
        VALID: '__isValidate', // 
    };
    static createValueByMeta = (meta) => {
        let keys = Object.keys(meta);
        let data = {};
        keys.forEach((eachKey) => {
            data[eachKey] = Type.extend(true, {}, defaultValue);
        })
        return data;
    }
    static createSingleValue = (value) => {
        let copyData = Type.extend(true, {}, defaultValue);
        if(typeof value !== 'undefined') {
            copyData.value = value;   
        }
        return copyData  
    };
    static createValue = (data, meta, nKey) => {
        let keys = Object.keys(data);
        let copyData = Type.extend(true, {}, data);
        keys.forEach((eachKey) => {
            if(nKey && nKey.includes(eachKey)) {
               delete copyData[eachKey];
            } else {
                let initData = Type.extend(true, {}, defaultValue);
                initData.value = copyData[eachKey];
                // 额外的属性在初始化时需要从meta中获取
                if(meta && meta[eachKey]) {
                    if(meta[eachKey].editable === false) {
                        initData.editable = false;
                    }
                    let relyKey = meta[eachKey].editableRely;
                    if(relyKey!== undefined) {
                        initData.editable = !!data[relyKey];
                    }
                }
                copyData[eachKey] = initData;
            }
        });

        return copyData;
    };
    static createArrayValue = (data, meta) => {
        let copyData = Type.extend(true, [], data);
        copyData.forEach((eachData, index)=>{
            copyData[index] = DefaultValue.createValue(eachData, meta)
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
        let copyData = Type.extend(true, [], data);
        copyData.forEach((eachData, index)=> {
            copyData[index] = DefaultValue.reduction(eachData);
        })
        return copyData;
    }
}

export default DefaultValue;
/**
 * Created by edeity on 11/11/2017.
 */
import Type from '../tools/Type';

// 实例:用户单据
class MetaValue  {
    static VALUE_KEY = '__value';
    /**
     * 每次获得一个新的默认数据
     **/
    static getDefaultMetaValue = function () {
        return {
            __value: '',
            type: 'str',
            desc: '',
            editable: true,
            validate: {
                __isValidate: true,
                matchReg: null,
                matchFun: null,
                matchTips: null,
                minLen: 0,
                maxLen: 50,
                required: true,
                isMatchWhenBlur: false
            }
        }
    }
    /**
     * 创建metaValue
     * @param metas 类DefaultMetaValue的数据结构
     * @param coverMeta 类DefaultMetaValue的数据结构
     * @returns {{}}
     */
    static createMetaValue = function(metas){
        if(!metas) {
            console.error('请传入meta信息');
        }
        let meta = null;
        let keys = Object.keys(metas);
        if(keys.length === 0) {
            console.error('单据meta信息设置错误,请确认');
        } else {
            meta = Type.extend(true, {}, metas); // 不影响metas
            keys.forEach((eachKey) => {
                if(!Type.isObject(meta[eachKey])) {
                    // 假若传入的参数不是一个对象,则默认将该值赋值给value
                    let newObject = {};
                    newObject[MetaValue.VALUE_KEY] = meta[eachKey];
                    meta[eachKey] = Type.extend(true, MetaValue.getDefaultMetaValue(), newObject);
                } else {
                    // 假若传入的参数是一个对象
                    meta[eachKey] = Type.extend(true, MetaValue.getDefaultMetaValue(), meta[eachKey]);
                }

                // let isSetting = !!settingObj;
                // if(isSetting) {
                //     let settingKeys = Object.keys(settingObj);
                //     settingKeys.forEach((eachSettingKey) => {
                //         meta[eachKey][eachSettingKey] = settingObj[settingKeys];
                //     })
                // }
            })
        }
        return meta;
    };
    /**
     * 还原metaValue
     * @param metaData 类DefaultMetaValue的数据结构
     * @returns {{}}
     */
    static reduceMetaValue = function(metaData){
        let reduceData = {};
        let metaKeys = Object.keys(metaData);
        metaKeys.forEach(function (eachMetaKey) {
            reduceData[eachMetaKey] = metaData[eachMetaKey][MetaValue.VALUE_KEY];
        });
        return reduceData;
    };
}

export default MetaValue;
import Type from '../tools/Type';
import Log from '../tools/Log';

/**
 * 用来描述一个字段的值
 */
class MetaValue  {
    static VALUE_KEY = '__value';
    /**
     * 每次获得一个新的默认数据
     **/
    static getMetaValue = function () {
        return {
            value: null,
            type: 'str',
            desc: null,
            editable: true,
            isValid: true,
            __validConfig: {
                matchReg: null,
                matchFun: null,
                matchTips: null,
                minLen: 0,
                maxLen: 50,
                required: true,
                isMatchWhenBlur: false
            },
            __renderConfig: {
                isQuery: true,
                isList: true,
                isCard: true,
            },
            __relyConfig: {
                
            }
        }
    };
    /**
     * 创建metaValue
     * @param metas 类DefaultMetaValue的数据结构
     * @param coverMeta 类DefaultMetaValue的数据结构
     * @returns {{}}
     */
    static create = function(metas){
        if(!metas) {
            Log.error('请传入meta信息');
        }
        let meta = null;
        let keys = Object.keys(metas);
        if(keys.length === 0) {
            Log.error('单据meta信息设置错误,请确认');
        } else {
            meta = Type.extend(true, {}, metas); // 不影响metas
            keys.forEach((eachKey) => {
                if(!Type.isObject(meta[eachKey])) {
                    // 假若传入的参数不是一个对象,则默认将该值赋值给value
                    let newObject = {};
                    newObject[MetaValue.VALUE_KEY] = meta[eachKey];
                    meta[eachKey] = Type.extend(true, MetaValue.getMetaValue(), newObject);
                } else {
                    // 假若传入的参数是一个对象
                    meta[eachKey] = Type.extend(true, MetaValue.getMetaValue(), meta[eachKey]);
                }
            })
        }
        return meta;
    };
    /**
     * 还原metaValue
     * @param metaData 类DefaultMetaValue的数据结构
     * @returns {{}}
     */
    static reduce = function(metaData){
        let reduceData = {};
        let metaKeys = Object.keys(metaData);
        metaKeys.forEach(function (eachMetaKey) {
            reduceData[eachMetaKey] = metaData[eachMetaKey][MetaValue.VALUE_KEY];
        });
        return reduceData;
    };
}

export default MetaValue;
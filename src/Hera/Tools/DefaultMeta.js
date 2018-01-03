/**
 * Created by edeity on 11/11/2017.
 */
import $ from 'jquery';

/**
 * 默认的meta
 * */
let defaultMeta = {
    type: 'str',
    desc: '',
    editable: true,
    validate: {
        matchReg: null,
        matchFun: null,
        matchTips: null,
        minLen: 0,
        maxLen: 50,
        required: true,
        isMatchWhenBlur: false
    },
};

// 实例:用户单据
class DefaultMeta  {
    static fillDefaultMeta = (metas, settingObj) => {
        let meta = {};
        let keys = Object.keys(metas);
        let isSetting = !!settingObj;
        if(keys.length === 0) {
            console.error('单据meta信息设置错误,请确认');
        } else {
            keys.forEach((eachKey) => {
                let initData = $.extend(true, {}, defaultMeta);
                meta[eachKey] = $.extend(true, initData, metas[eachKey]);
                if(isSetting) {
                    let settingKeys = Object.keys(settingObj);
                    settingKeys.forEach((eachSettingKey) => {
                        meta[eachKey][eachSettingKey] = settingObj[settingKeys];
                    })
                }
            })
        }
        return meta;
    };
}

export default DefaultMeta;
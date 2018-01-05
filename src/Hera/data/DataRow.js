/**
 * Created by edeity on 2018/1/4.
 */

import MetaValue from './MetaValue';

const VALUE_KEY = MetaValue.VALUE_KEY;

class DataRow {
    __id = null;
    __rowMeta = null;
    __rowMetaData = null;

    constructor(meta) {
        this.__id = Symbol();
        this.__rowMeta = meta;
        this.__rowMetaData = MetaValue.createMetaValue(meta);
    }
    setValue(field, value){
        let preMetaValue = this.__rowMetaData[field];
        preMetaValue[VALUE_KEY] = value;
    }
    getValue(field){
        return this.__rowMetaData[field][VALUE_KEY];
    }
    setSimpleData(data) {
        let dataKeys = Object.keys(data);
        dataKeys.forEach((eachDataKey) => {
            this.__rowMetaData[eachDataKey][VALUE_KEY] = data[eachDataKey];
        })
    }
    getSimpleData() {
        return MetaValue.reduceMetaValue(this.__rowMetaData);
    }
    __setData(metaData) {
        this.__rowMetaData = MetaValue.createMetaValue(this.__rowMeta);
    }
    __getData() {
        return this.__rowMetaData;
    }
}

export default DataRow;
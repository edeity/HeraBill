/**
 * Created by edeity on 2018/1/4.
 */

import MetaValue from './MetaValue';
import Type from '../tools/Type';

const VALUE_KEY = MetaValue.VALUE_KEY;

class DataRow {
    id = null;
    __rowMeta = null;
    __rowMetaValue = null;
    
    static ROW_KEY = '__rowKey';

    constructor(meta) {
        this.id = Symbol();
        this.__rowMeta = meta;
        this.__rowMetaValue = MetaValue.create(meta);
    }
    setValue(field, value){
        let preMetaValue = this.__rowMetaValue[field];
        preMetaValue[VALUE_KEY] = value;
    }
    getValue(field){
        let value = this.__rowMetaValue[field][VALUE_KEY];
        if(Type.isObject(value)) {
            return Type.extend(true, {}, value);
        } else if(Type.isArray(value)){
            return Type.extend(true, [], value);
        } else {
            return  value;
        }
    }
    getMetaValue(field) {
        if(field) {
            let value = this.__rowMetaValue[field];
            if(Type.isObject(value)) {
                return Type.extend(true, {}, value);
            } else if(Type.isArray(value)) {
                return Type.extend(true, [], value);
            } else {
                return value;
            }
        } else {
            return Type.extend(true, {}, this.__rowMetaValue);
        }
    }
    setSimpleData(data) {
        let dataKeys = Object.keys(data);
        dataKeys.forEach((eachField) => {
            this.__rowMetaValue[eachField][VALUE_KEY] = data[eachField];
        })
    }
    getSimpleData() {
        let simpleData = MetaValue.reduce(this.__rowMetaValue);
        return Type.extend(true, {}, simpleData);
    }
    __getSimpleDataWithRowKey() {
        let data = this.getSimpleData();
        data[DataRow.ROW_KEY] = Math.random();
        return data;
    }
}

export default DataRow;
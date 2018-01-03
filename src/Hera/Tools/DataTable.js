/**
 * Created by edeity on 2018/1/2.
 */
// import dv from '../Tools/DefaultValue';

class DataTable {
    constructor() {
        this.__headData = {};
        this.__bodyData = [];
        this.__headAttr = {};
        this.__bodyAttr = [];
    }

    __emptyData() {
        this.__headData = {};
        this.__bodyData = {};
    }

    __getChangedHeadData() {
        return this.__headData;
    }

    __getChangedBodyData() {
        return this.__bodyData;
    }

    __getChangedHeadAttr() {
        return this.__headAttr;
    }

    setHeadValue(key, value) {
        this.__headData[key] = value;
    }

    setHeadAttr(key, valueObj) {
        this.__headAttr[key] = valueObj;
    }

    setBodyValue(key, value, index) {
        this.__bodyData[index] = this.__bodyData[index] || {};
        this.__bodyData[index][key] = value;
    }
    // getHeadValue(key) {
    //     return dv.reduction(self.state.editData[key]);
    // }
    //
    // getBodyValue(key, index) {
    //     return dv.reduction(self.editBodyData[index][key]);
    // }
}

export default DataTable;

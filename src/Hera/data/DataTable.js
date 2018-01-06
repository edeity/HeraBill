/**
 * Created by edeity on 2018/1/4.
 */

import DataRow from './DataRow';
import MetaValue from './MetaValue';
import Type from '../tools/Type';
import Log from '../tools/Log';

class DataTable {
    
    __meta = null;
    __currRow = null;
    __dataRows = new Set();
    
    constructor(meta) {
        if(Type.isObject(meta)) {
            this.__meta = MetaValue.create(meta);
        } else {
            Log.error('meta should be object, not ' + typeof meta)
        }
        // this.createEmptyRow();
    }
    setValue(field, value){
        let currRow = this.getCurrentRow();
        if(!(currRow instanceof DataRow)) {
            currRow = this.createEmptyRow();
        }
        currRow.setValue(field, value);
        return this;
    }
    getValue(field){
        return this.getCurrentRow().getValue(field);
    }
    setSimpleData(data) {
        this.removeAllRows();
        if(!Type.isArray(data)) {
            let tempRow = this.createEmptyRow();
            tempRow.setSimpleData(data);
        } else {
            data.forEach((eachData) => {
                let tempRow = this.createEmptyRow();
                tempRow.setSimpleData(eachData);
            });
        }
        return this;
    }
    getSimpleData() {
        let reduceData = [];
        let tempAllRows = this.getAllRows();
        for(let eachRow of tempAllRows) {
            reduceData.push(eachRow.getSimpleData());
        }
        return reduceData;
    }
    __getSimpleDataWithRowKey() {
        let reduceData = [];
        let tempAllRows = this.getAllRows();
        for(let eachRow of tempAllRows) {
            reduceData.push(eachRow.__getSimpleDataWithRowKey());
        }
        return reduceData;
    }
    getAllRows() {
        return this.__dataRows;
    }
    getCurrentRow() {
        return this.__currRow;
    }
    createEmptyRow() {
        let tempRow = new DataRow(this.__meta);
        this.getAllRows().add(tempRow);
        this.__setCurrentRow(tempRow);
        return tempRow;
    }
    removeAllRows() {
        this.__dataRows = new Set();
        return this;
    }
    removeRow(row) {
        let tempAllRow = this.getAllRows();
        for(let eachRow of tempAllRow) {
            if(eachRow.id === row.id) {
                tempAllRow.delete(row);
                break;
            }
        }
        return this;
    }
    getRowByIndex(index) {
        if(Type.isNumber(index)) {
            let row = null;
            let i = 0;
            for(let eachRow of this.__dataRows) {
                if(i === index) {
                    row = eachRow;
                    break;
                } else {
                    i ++;
                }
            }
           return row;
        } else {
            Log.error('getRowByIndex(index): index seems not a number');
        }
    }
    getMeta() {
        return Type.extend(true, {}, this.__meta);
    }
    getMetaValue() {
        let tableMetaValue = [];
        for(let eachRow of this.__dataRows) {
            tableMetaValue.push(eachRow.getMetaValue())
        }
        return tableMetaValue;
    }
    __getMetaValueWithRowKey() {
        let tableMetaValue = [];
        for(let eachRow of this.__dataRows) {
            let eachRowMetaValue = eachRow.getMetaValue();
            eachRowMetaValue[DataRow.ROW_KEY] = Math.random();
            tableMetaValue.push(eachRowMetaValue);
        }
        return tableMetaValue;
    }
    __setCurrentRow(row) {
        if(!(row instanceof DataRow)) {
            Log.error('__setCurrentRow(params): params must be DataRow')
        }
        this.__currRow = row;
        return this;
    }
}

export default DataTable;
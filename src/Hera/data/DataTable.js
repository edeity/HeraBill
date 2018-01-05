/**
 * Created by edeity on 2018/1/4.
 */
    
import MetaValue from './MetaValue';   
import DataRow from './DataRow';
import Type from '../tools/Type';
    
const VALUE_KEY = MetaValue.VALUE_KEY;

class DataTable {
    
    __meta = null;
    __currRow = null;
    __dataRows = new Set();
    
    constructor(meta) {
        if(Type.isObject(meta)) {
            this.__meta = meta;
        } else {
            console.error('meta should be object, not ' + typeof meta)
        }
    }
    setValue(field, value){
        let currRow = this.getCurrentRow();
        if(!(currRow instanceof DataRow)) {
            currRow = this.createEmptyRow();
        }
        currRow.setValue(field, value);
    }
    getValue(field){
        return this.getCurrentRow().getValue(field);
    }
    setSimpleData(data) {
        if(!Type.isArray(data)) {
            console.error('data error: setSimpleData(params) params must be array')
        }
        this.removeAllRows();
        data.forEach((eachData) => {
            let tempRow = this.createEmptyRow();
            tempRow.setSimpleData(eachData);
        })
    }
    getSimpleData() {
        let reduceData = [];
        let tempAllRows = this.getAllRows();
        for(let eachRow of tempAllRows) {
            reduceData.push(eachRow.getSimpleData());
        }
        return reduceData;
    }
    __setData(metaData) {

    }
    __getData() {

    }
    getAllRows() {
        return this.__dataRows;
    }
    __setCurrentRow(row) {
        if(!(row instanceof DataRow)) {
            console.error('__setCurrentRow(params): params must be DataRow')
        }
        this.__currRow = row;
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
    }
    removeRow(row) {
        let tempAllRow = this.getAllRows();
        for(let eachRow of tempAllRow) {
            if(eachRow.id === row.id) {
                tempAllRow.delete(row);
                break;
            }
        }
    }
}

export default DataTable;
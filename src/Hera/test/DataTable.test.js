/**
 * Created by edeity on 2018/1/5.
 */
import chai from 'chai';
import DataTable from '../data/DataTable';

let expect = chai.expect;

describe('DataTable', function () {

    it('new DataTable DataTable', function () {
        let testTable = new DataTable({test: 'test', another: 'another'});
        expect(testTable).to.be.an.instanceof(DataTable);
    });

    it('setValue 设置的值应该生效', function () {
        let testTable = new DataTable({test: 'test', another: 'another'});
        let randomNum = Math.random;
        testTable.setValue('test', randomNum);
        expect(testTable.getValue('test')).to.equal(randomNum);
    });

    it('setSimpleData 将会保留构建时的默认值', function () {
        let testTable = new DataTable({test: 'test', another: 'another'});
        let simValue = [{'test': 'test1'}];
        testTable.setSimpleData(simValue);
        expect(testTable.getSimpleData()).to.deep.equal([{'test': 'test1', another: 'another'}]);
    });


    it('setSimpleData(obj)中, obj的值和getSimpleData()的值是独立的', function () {
        let testTable = new DataTable({test: 'test', another: 'another'});
        let changeValue = [{test: 'change', another: 'another'}];
        testTable.setSimpleData(changeValue);
        changeValue[0].test = 'newChange';
        expect(testTable.getSimpleData()[0].test).to.equal('change');
    })
});
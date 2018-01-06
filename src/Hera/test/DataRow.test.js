/**
 * Created by edeity on 2018/1/5.
 */
/**
 * Created by edeity on 2018/1/4.
 */
import chai from 'chai';
import DataRow from '../data/DataRow';

let expect = chai.expect;

describe('DataRow', function () {

    it('new DataRow 得到的是DataRow的实例', function () {
        let testRow = new DataRow({test: 'test', another: 'another'});
        expect(testRow).to.be.an.instanceof(DataRow);
    });

    it('setValue 设置的值应该生效', function () {
        let testRow = new DataRow({test: 'test', another: 'another'});
        let randomNum = Math.random;
        testRow.setValue('test', randomNum);
        expect(testRow.getValue('test')).to.equal(randomNum);
    });

    it('setSimpleData 将会保留构建时的默认值', function () {
        let testRow = new DataRow({test: 'test', another: 'another'});
        let simValue = {'test': 'test'};
        testRow.setSimpleData(simValue);
        expect(testRow.getSimpleData()).to.have.all.keys('test', 'another')
        expect(testRow.getSimpleData().another).to.equal('another');
    });

    it('setSimpleData 将会覆盖原有值', function () {
        let testRow = new DataRow({test: 'test', another: 'another'});
        let preValue = {'test': 'pre'};
        let afterValue = {'test': 'after'};
        testRow.setSimpleData(preValue);
        testRow.setSimpleData(afterValue);
        expect(testRow.getSimpleData()).to.contains(afterValue);
    });

    it('setSimpleData(obj)中, obj的值和getSimpleData()的值是独立的', function () {
        let testRow = new DataRow({test: 'test', another: 'another'});
        let changeValue = {'test': 'change'};
        testRow.setSimpleData(changeValue);
        changeValue.test = 'newChange';
        expect(testRow.getSimpleData()).to.not.contains(changeValue);
    });

    it('当value为复杂对象时, getValue得到的应是复杂对象的副本', function () {
        let testRow = new DataRow({test: {}});
        testRow.setSimpleData({test: {test: '123'}});
        let data = testRow.getSimpleData();
        data.test.test = '345';
        expect(testRow.getSimpleData().test.test).to.equal('123');
    })
});
/**
 * Created by edeity on 2018/1/4.
 */
import chai from 'chai';
import MetaValue from '../data/MetaValue';

let expect = chai.expect;

describe('MetaValue', function () {
    let obj = {test: 'test1'};
    let metaValue = MetaValue.create(obj);
    let pureValue = MetaValue.reduce(metaValue);
    it('create 应包含额外的属性', function () {
        expect(metaValue.test).to.have.all
            .keys('value', 'type', 'desc', 'editable', 'isValid', '__validConfig', '__renderConfig', '__relyConfig');
    });
    it('reduce 应只包含自身属性', function () {
        expect(pureValue).to.have.all.keys('test');
    });
    it('create 和 reduce 操作应该是自反的', function () {
        expect(obj).to.deep.equal(pureValue);
    })
});
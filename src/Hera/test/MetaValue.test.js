/**
 * Created by edeity on 2018/1/4.
 */
import chai from 'chai';
import MetaValue from '../data/MetaValue';

let expect = chai.expect;

describe('MetaValue', function () {
    let obj = {test: 'test1'};
    let metaObj = {
        test: {
            __value: 'test1',
            type: 'str',
            desc: '',
            editable: true,
            validate: {
                __isValidate: true,
                matchReg: null,
                matchFun: null,
                matchTips: null,
                minLen: 0,
                maxLen: 50,
                required: true,
                isMatchWhenBlur: false
            }
        }
    };
    let metaValue = MetaValue.createMetaValue(obj);
    let pureValue = MetaValue.reduceMetaValue(metaValue);
    it('createMetaValue 应包含额外的属性', function () {
        expect(metaValue.test).to.have.all.keys('__value', 'type', 'desc', 'editable', 'validate');
    });
    it('reduceMetaValue 应只包含自身属性', function () {
        expect(pureValue).to.have.all.keys('test');
    });
    it('create 和 reduce 操作应该是自反的', function () {
        expect(obj).to.deep.equal(pureValue);
    })
});
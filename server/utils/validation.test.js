/**
 * Created by nirmal on 5/14/17.
 */
var expect=require('expect');
var {isRealString}=require('./validation');

describe('generateMessage',()=>{
    it('should reject non-string values',()=>{
        var name=123;

        var res=isRealString(name);

        expect(res).toBe(false);
    });

    it('should reject string with only spaces',()=>{

        var res=isRealString('  ');

        expect(res).toBe(false);
    });

    it('should all string with  non-space characters',()=>{

        var res=isRealString(' Nirmal ');

        expect(res).toBe(true);
    });
});

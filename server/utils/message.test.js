/**
 * Created by nirmal on 5/11/17.
 */

var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from='Jen';
        var text='Some message';

        var message=generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from='Jen';
        var latitude='15';
        var longitude='9';
        var url='https://www.google.com/maps?q=15,9';
9
        var message=generateLocationMessage(from,latitude,longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
});
/**
 * Created by nirmal on 5/11/17.
 */
var generateMessage=(from,text)=>{
    return {
        from,
        text,
        createdAt:new Date().getTime()
    };
};


module.exports={generateMessage};
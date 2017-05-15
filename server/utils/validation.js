/**
 * Created by nirmal on 5/14/17.
 */
var isRealString=(str)=>{
    return typeof str === 'string' && str.trim().length>0;
};

module.exports={isRealString};
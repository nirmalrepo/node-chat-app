/**
 * Created by nirmal on 5/12/17.
 */
var moment=require('moment');

var date=moment();

// date.add(100,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
// 6:02 am
console.log(date.format('h:mm a'));

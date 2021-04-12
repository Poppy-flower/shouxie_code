/**
 * from liqi
 * 1. 群
 */

//1. 格式化金额 123456789 --> 123,456,789
function format(str){
    return str.replace(/\B(?=(\d{3})+\b)/g, ',');
}

format('123456789');

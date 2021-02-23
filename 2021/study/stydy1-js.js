/**
 * 第一天： 学习 75个js面试题
 * 链接： https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247485867&idx=1&sn=c2eac5806013044b7dff8ec5ca79fc11&chksm=9782c722a0f54e3467df280aff694da23fa439140ec488a32e93c2fde7308f4e0b32f501b94a&scene=0&xtrack=1#rd
 */

//1. 手动实现 `Array.prototype.map 方法`
function myMap(arr, mapCallback) {

    if(!Array.isArray(arr) || !arr.length || (typeof mapCallback !== 'function')) {
        return [];
    }

    let result = [];
    for(let i=0, l=arr.length; i<l; i++){
        result.push(mapCallback(arr[i], i, arr));
    }
    return result;
}

// 2. 手动实现`Array.prototype.filter`方法
function myFilter(arr, filterCallback){

    if(!Array.isArray(arr) || !arr.length || (typeof filterCallback !== 'function')){
        return [];
    }

    let result = [];
    for(let i=0, l=arr.length; i<l; i++){
        if(filterCallback(arr[i], i, arr)){
            result.push(arr[i]);
        }
    }
    return result;
}

//3. 手动实现`Array.prototype.reduce`方法
function myReduce(arr, reduceCallback, initValue){
    if(!Array.isArray(arr) || !arr.length || (typeof reduceCallback !== 'function')){
        return [];
    }

    let hasInitValue = (initValue !== undefined);
    let value = hasInitValue? initValue : arr[0];

    for(let i = hasInitValue?0:1, l=arr.length; i<l; i++){
        value = reduceCallback(value, arr[i], i, arr);
    }
    return value;
}


//4. 检查NaN--2种方法
Number.isNaN(value);

function checkIsNaN(value){
    return value!==value;
}

//5. 检查是数组--2种方法
Array.isArray(value);

function checkIsArray(value){
    return Object.prototype.toString.call(value) === '[object Array]';
}

// 6. 如何在不使用`%`模运算符的情况下检查一个数字是否是偶数？--2种方式：与1运算；递归运算
function isEven(value){
    if(value & 1){
        return false;
    }
    return true;
}

function isEven2(value){
    if(value<0 || value === 1) {
        return false;
    }
    if(value === 0){
        return true;
    }
    return isEven2(value-2);
}

//7. 实现memorize函数-- 单个参数、多个参数
//1）单个参数的
function memorize(fn){
    let cache = {};

    return function(params){
        if(cache[params]){
            console.log('有缓存值');
            return cache[params];
        }else {
            console.log('没有缓存值');
            return cache[params] = fn(params);
        }
    }
}

const toUpperCase = (str = '') => {return str.toUpperCase()};

let memorizedToUpperCase = memorize(toUpperCase);
memorizedToUpperCase('abce345sss');
memorizedToUpperCase('abce345sss');

//2）多个参数的
function memorize2(fn){
    let cache = {};

    return (...args) => {
        let key = Array.prototype.slice.call(args);

        if(cache[key]){
            console.log('有缓存值');
            return cache[key];
        }else {
            console.log('没有缓存值');
            return cache[key]=fn(...args);
        }
    }
}

const getFullName = (firstName, lastName) => {return firstName+lastName};

let memorizedGetFullName = memorize2(getFullName);
memorizedGetFullName('chen', 'hong');
memorizedGetFullName('chen', 'hong');

//8.冻结-- 没有深冻结  深冻结
// 没有深冻结
let person = {
    name: 'chenhong',
    profession: {
        name: 'developer'
    }
};

Object.freeze(person);
person.profession.name = 'doctor';
console.log(person);

//深冻结
function deepFreeze(object){
    let keys = Object.getOwnPropertyNames(object);

    for(let key of keys){
        let value = object[key];

        object[key] = (value && typeof value === 'object') ?  deepFreeze(value) : value;
    }

    return Object.freeze(object);
}

deepFreeze(person);
person.profession.name = 'doctor';
console.log(person);






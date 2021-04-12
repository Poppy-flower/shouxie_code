/**
 * Object.assign
 */
//第一步
let a = {
    name: 'a',
    age: 18,
};

let b = {
    book: {
        price: 45,
        title: 'you dont know js',
    }
};

let c = Object.assign(a, b);
console.log(a);
console.log(c === a);

//第二步
b.name = 'b';
b.book.price = 55;

console.log(a);


//-------------------------------
//string symbol 都会被拷贝 null undefined 也会被拷贝
// 第一步
let c = {
    name: 'c',
    age: 18,
};

let d = {
    d1: Symbol('d1'),
    d2: null,
    d3: undefined
};

let e = Object.assign(c, d);

/**
 * Object.assign模拟实现
 * 用法：Object.assign(target, ...source)
 *
 * 大致思路如下：
 * 1. 判断原生 Object是否支持该函数，如果不存在的话，创建一个函数assign，并且使用 Object.defineProperty将该函数绑定到Object上。
 * 2. 判断参数是否正确；
 *        目标对象不能是空的，（我们可以直接设置{},但是得传）
 * 3. 使用Object 将target 转换成对象，并且保存为to,最后返回
 * 4. 使用 for...in... 遍历对象，遍历出所有可枚举的属性，并且复制给目标对象 （用Object.hasOwnProperty获取自有属性，即非原型链上的属性）
 *
 * 此次模拟，不支持symbol 属性，因为ES5根本没有 symbol
 */

{
    if(typeof Object.assign !== function){
        Object.defineProperty(Object, assign, {
            value: function(target){
                'use strict';

                if(target === null){
                    throw new Error('cannot convert undefined or null to Object');
                }

                var to = Object(target);

                for(var index = 1; index < arguments.length; index++){
                    var nextSource = arguments[index];

                    if(nextSource !== null){
                        for(var nextKey in nextSource){
                            if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)){
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        })
    }
}


for(var i in Object){
    console.log('i', i);
    console.log('Object[i]', Object[i]);
}

Object.keys(Object);
console.log(Object.keys(Object));



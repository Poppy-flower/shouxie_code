/**
 * 学习兆秋给的资料
 *
 */

// 排序 位运算 链表 数组

// 排序----
// 1. 冒泡排序
function bubbleSort(arr) {
    for(let i=arr.length; i>0; i--){
        let isOk = true;
        for(let j=0; j<i-1; j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                isOk = false;
            }
        }
        if(isOk){
            break;
        }
    }
    return arr;
}

// 2. 快排
function quickSort(arr){
    if(arr.length <=1) return arr;

    let midIndex = Math.floor(arr.length/2);
    let mid = arr.splice(midIndex, 1)[0];

    let left = [], right = [];
    arr.forEach(item => {
        if(item < mid){
            left.push(item);
        }else {
            right.push(item);
        }
    });

    return [...quickSort(left), mid, ...quickSort(right)];
}

// 位运算----
// 3. 判断一个数字，二进制位 1的个数
function getOneCount(n){
    let count = 0;
    while(n!==0){
        if(n%2 !== 0){
            count++;
        }
        n = n >> 1;
    }
    return count;
}

// 4.只出现一次的数字
var singleNumber = function(nums) {
    let single = 0;
    nums.map(item => {
        single = single ^ item;
    })
    return single;
};

// 5. 求两个整数之和，不能用加减乘除运算
var getSum = function(a, b) {
    while (b) {
        sum = a ^ b;
        b = (a & b) << 1;
        a = sum;
    }
    return sum
};

// 链表----
// 6. 线性链表 循环右移n位  先把链表形成一个环，然后尾指针移动，最后从尾处断开即可
function rotateRight(head, n){
    if(head === null || head.next === null || n===0) return head;

    let tail = head, length=0;
    while(tail.next){
        ++length;
        tail = tail.next;
    }

    tail.next = head;
    n = n%length;

    for(let i=0; i<length-n; i++){
        tail = tail.next;
    }

    head = tail.next;
    tail.next = null;
    return head;
}

// 数组--顺时针填写N阶矩阵
{
    const N = 4; //N阶矩阵
    var data = new Array(N);
    for(let i=0; i<N; i++){
        data[i] = new Array();  //声明data 二维数组
    }

    function fill(number, size, begin){
        let i, j, k; //i表示行，j表示列

        //size ===0 || size === 1 递归结束
        if(size === 0){
            return;
        }
        if(size === 1){
            data[begin][begin] = number;
            return;
        }

        //初始化左上角下标
        i= begin;
        j= begin;
        //填写 上右下左
        for(k=0; k<size;k++){
            data[i][j++] = number++;
        }
        for(k=0; k<size;k++){
            data[i++][j] = number++;
        }
        for(k=0; k<size;k++){
            data[i][j--] = number++;
        }
        for(k=0; k<size;k++){
            data[i--][j] = number++;
        }
        fill(number, size-2, begin+1); //递归求解，左上角下标为begin+1
    }
}


//----from js---start
//1. 自己实现 instanceOf
function myInstanceOf(left, right) {
    // 获得类型的原型
    let protoType = right.prototype;
    // 获得对象的原型
    left = left.__proto__;

    //判断 对象的原型 是否等于类型的原型
    while(true){
        if(left === null){
            return false;
        }
        if(left === protoType){
            return true;
        }
        left = left.__proto__;
    }
}

// 2. 模拟call
function.prototype.myCall = function(context){
    var context = context || window;

    context.fn = this;  // 给context 添加一个属性， getValue.call(a, 'ch', 24)  => a.getValue('ch', 24);

    var args = [...arguments].slice(1);  // 取出来函数调用 传递的参数
    var result = context.fn(...args);

    delete context.fn;  // 删除fn

    return result;
}

// 3. 模拟 apply
function.prototype.mpApply = function(context){
    var context = context || window;

    context.fn = this;

    var result;
    if(!!arguments[1]){
        result = context.fn(...arguments[1]);
    }else {
        result = context.fn();
    }
    delete context.fn;

    return result;
}

//4. 模拟实现bind
/**
 *  bind返回新函数
 *  1、原函数和新函数 共享一样的代码 作用域，但是this不同
 *  2、 通过bind绑定之后，创建永久的上下文链接，不能再通过this、call 改变
 */
function.prototype.myBind = function(context){
    if(typeof this !== 'funxtion'){
        throw new TypeError('Error');
    }

    var _this = this;  //存一下this，后面获取函数方便；
    var args = [...arguments].slice(1);// 存一下，绑定this，传入的参数

    return function F(){
        // 因为返回了一个函数，我们可以 new F()当构造函数调用，所以我们需要加一个判断
        if(this instanceof F){
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, [...args, ...arguments]);
    }
}

// 浅拷贝
/**
 * 1、Object.assign()
 * 2、扩展运算符
 * 3、$.extend()jQuery.extend() 函数用于将一个或多个对象的内容合并到目标对象。
 * 简单的自己实现
 */
function clone(target){
    let cloneTarget = Array.isArray(target) ? [] : {};

    for(const key in target){
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
}

// 深拷贝
/**
 * 1、JSON.parse(JSON.stringify(target))
 *          会忽略 undefined、symbol、function；
 *          日期会转换成字符串、正则会转换成空对象；
 *          会抛弃对象的constructor，所有的构造函数会指向Object；
 *          存在循环引用会报错；
 * 2、$.extend(trye, {}, target)
 * 3、lodash _clone(true, target)  _cloneDeep(target)
 */
// 简单的深拷贝--递归，直到属性为原始值
function clone(target){
    if(typeof target === 'object'){
        let cloneTarget = Array.isArray(target) ? []:{};
        for(const key in target){
            cloneTarget[key] = clone(target[key])
        }
        return cloneTarget;
    }else {
        return target;
    }
}

//考虑循环引用
function clone(target, map = new Map()){
    if(typeof target === 'object'){
        let cloneTarget = Array.isArray(target) ? [] : {};
        if(map.get(target)){
            return map.get(target);
        }
        map.set(target, cloneTarget);

        for(const key in target){
            cloneTarget[key] = clone(target(key), map);
        }

        return  cloneTarget;
    }else{
        return target;
    }
}

//优化，用weakMap 创建弱引用关系，垃圾回收会回收内存
function clone(target, map = new WeakMap()){
    if(typeof target === 'object'){
        let cloneTarget = Array.isArray(target) ? [] : {};
        if(map.get(target)){
            return map.get(target);
        }
        map.set(target, cloneTarget);

        for(const key in target){
            cloneTarget[key] = clone(target(key), map);
        }

        return  cloneTarget;
    }else{
        return target;
    }
}

//数据类型，获取类型
function getType(target){
    return Object.prototype.toString.call(target);
}

/**
 * 数据类型，
 *  可遍历的:map、set、array、obj、args
 *  不可遍历的:number、string、bool、   date、error、reg、symbol、func
 *
 *  手写深拷贝全部代码：
 */

{
    //可遍历的数据类型
    const mapTag = '[object Map]';
    const setTag = '[object Set]';
    const arrayTag = '[object Array]';
    const objectTag = '[object Object]';
    const argsTag = '[object argumnets]';

    //不可继续遍历的数据类型
    const boolTag = '[object Boolean]';
    const dateTag = '[object Date]';
    const numberTag = '[object Number]';
    const stringTag = '[object String]';
    const errorTag = '[object Error]';
    const symbolTag = '[object Symbol]';
    const regexpTag = '[object RegExp]';
    const funcTag = '[object Function]';

    const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

    //工具函数-通用while循环
    function forEach(array, iteratee){
        let index = -1;

        let length = array.length;
        while(++index < length){
            iteratee(array[index], index);
        }
        return array;
    }

    //工具函数-判断是否为引用类型
    function isObject(target){
        const type = typeof target;
        return (type === 'object' || type==='function') && (target !==null);  //type===object引用类型  function也是引用类型  但是不能是null（排除一下）
    }

    //工具函数-获取实际类型
    function getType(target){
        return Object.prototype.toString.call(target);
    }

    //工具函数-初始化被克隆的对象
    function getInitTarget(target){
        const Ctor = target.constructor;
        return new Ctor();
    }

    //工具函数-克隆Symbol
    function cloneSymbol(target){
        return Object(Symbol.prototype.valueOf.call(target));
    }

    //工具函数-克隆正则
    function cloneRegExp(target){
        const reFlags = /\w*$/;
        const result = new target.constructor(target.source, reFlags.exec(target));
        result.lastIndex = target.lastIndex;
        return result;
    }

    //工具函数-克隆函数
    function cloneFunction(func){
        const funcString = func.toString();
        const paramReg = /(?<=\(),+(?<=\)\s+{)/;
        const bodyReg = /(?<=\{)(.|\n)+(?=})/m;

        if(func.prototype){
            const param = paramReg.exec(funcString);
            const body = bodyReg.exec(funcString);

            if(body){
                if(param){
                    const paramArr = param[0].split(',');
                    return new Function(...paramArr, body[0]);
                }else{
                    return new Function(body[0]);
                }
            }else{
                return null;
            }
        }else{
            return eval(funcString);
        }
    }

    //工具函数-克隆不可遍历的对象
    function cloneOtherType(target){
        const Ctor = target.constructor;
        switch(type){
            case boolTag:
            case numberTag:
            case stringTag:
            case errorTag:
            case dateTag:
                return new Ctor(target);
            case regexpTag:
                return cloneRegExp(target);
            case symbolTag:
                return cloneSymbol(target);
            case funcTag:
                return cloneFunction(target);
            default:
                return null;
        }
    }

    /**
     * 克隆函数
     *  1. 原始类型，直接返回
     *  2. 根据不同类型，处理不同操作（可遍历的、不可遍历的）
     *  3. 处理循环引用
     *  4. 处理set map
     *  5. 处理对象和数组
     */
    function clone(target, map=new WeakMap()){
        //1. 原始类型，直接返回
        if(!isObject(target)){
            return target;
        }

        //2. 根据不同类型，处理不同操作（可遍历的、不可遍历的）
        let type = getType(target);
        let cloneTarget;
        if(deepTag.includes(type)){
            cloneTarget = getInitTarget(target);
        }else{
            return cloneOtherType(target);
        }

        //3. 处理循环引用
        if(map.get(target)){
            return map.get(target);
        }
        map.set(target, cloneTarget);

        //4. 处理set 和 map
        if(type === setTag){
            target.forEach(value => {
                cloneTarget.add(value);
            })
            return cloneTarget;
        }
        if(type === mapTag){
            target.forEach((value, key) => {
                cloneTarget.set(key, clone(value));
            })
            return cloneTarget;
        }

        //5. 处理对象和数组
        const keys = type === arrayTag? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if(keys){
                key = value
            }
            cloneTarget[key] = clone(target[key], map);
        })
        return cloneTarget;
    }
}



//防抖  多次点击的函数，变成只有最后一次执行，设置一个标志位，一段时间内再触发，不执行，重新计时
const debounce = (func, wait = 50) => {
    //缓存一个定时器id
    let timer = 0;
    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout((...args) => {
            func.apply(this, args);
        }, wait);
    }
};

//节流是将多次执行变成每隔一段时间执行
const throttle = (func, wait = 50) => {
    let canRun = true;   //通过闭包保存一个标记
    return function(...args){
        if(!canRun) return;
        canRun = false;

        setTimeout(() => {
            func.apply(this, args);
            canRun = true;
        }, wait)
    }
}


// 数组去重12种方案

//数组降维
function flattenDeep(arr){
    return Array.isArray(arr)? arr.reduce((res, item) => {
        return [...res, ...flattenDeep(item)]
    }, []):[arr];
}

//数组降维并排序
[...new Set(arr.toString().split(','))].sort((a, b) => {return a-b;});

/**
 * Promise
 * all 接收数组，全部成功才resolve，结果是所有的结果数组；有一个失败，就返回失败，只返回失败任务的结果
 * race 接收数组，返回最先返回结果的，不管是成功还是失败
 */
// all原理  接收数组，全部成功才resolve，结果是所有的结果数组；有一个失败，就返回失败，只返回失败任务的结果
Promise.all = function(values){
    return new Promise((resolve, reject) => {
        let result = [];
        let i = 0;

        //辅助函数-处理数据
        const processData = (itemRes, i) => {  //处理数据
            result[i] = itemRes;

            if(++i === values.length){  //成功个数 === 参数个数，说明已经完事儿了，将结果返回即可
                resolve(result);
            }
        };

        //依次执行参数
        for(let i=0; i<values.length; i++){
            let current = values[i];

            //判断是不是promise
            if((typeof current !== null && typeof current === 'object') || typeof current === 'function'){
                // 如果是promise
                if(typeof current.then === 'function'){
                    current.then(res => {
                        processData(res, i);
                    }, reject);
                }else{
                    processData(current, i);
                }
            }else{
                processData(current, i);
            }
        }
    });
}

//race 原理： 接收数组，返回最先返回结果的，不管是成功还是失败
Promise.race = function(values){
    return new Promise((resolve, reject) => {
        for(let i=0; i<values.length; i++){
            let current = values[i];

            //判断是不是promise
            if((typeof current !== null && typeof current === 'object') || typeof current === 'function'){
                // 如果是promise
                if(typeof current.then === 'function'){
                    current.then(resolve, reject);
                }else{
                    resolve(current);
                }
            }else{
                resolve(current);
            }
        }
    });
}

//Promise 源码




// 深度优先遍历
function dfs(node){
    if(node === null) return;
    console.log(node.value);
    if(node.children){
        node.children.forEach(itemNode => {
            console.log(itemNode);
            dfs(itemNode.children);
        });
    }
}
// 广度优先遍历


// 解析url上的参数为对象
function parseUrl(url){
    let str = url.split('?')[1];
    let paramsArr = str.split('&');
    let res = {};
    paramsArr.forEach(item => {
        let key = item.split('=')[0];
        let value = item.split('=')[1];
        res[key] = value;
    });
    return res;
}

//----from js---end





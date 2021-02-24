/**
 * 学习图解前端
 * 链接：
 * https://lucifer.ren/fe-interview/#/?id=javascript-%f0%9f%97%92%ef%b8%8f
 */

// 1. 自己实现new
/**
 * new的原理：
 * 1. 引擎内部新建一个空对象；
 * 2. 对象的proto 指向 构造函数的prototype。
 * 3. 调用构造函数，去填充空对象
 * 4. 最后将this 指向我们刚刚创建的新对象
 */
function myNew(constructor, ...args){
    let obj = {};
    obj.__proto__ = constructor.prototype;
    let res = constructor.call(obj, ...args);
    return (res instanceof Object)? res: obj;
}

//-----经典手写题  start -----
//1. 大数相加
function bigNumberSum(a, b){
    //先处理两个字符串为相同的长度，短的前面补上0;  来一个指针，while遍历一遍
    let cur = 0;
    while(cur<a.length || cur <b.length){
        if(!a[cur]){
            a = '0' + a;
        }
        if(!b[cur]){
            b = '0' + b;
        }
        cur++;
    }

    //处理相加逻辑， 用一个进位的变量 保存进位； 每次计算出进位，计算出当前位置的值； 最后在处理进位
    let carried = 0;
    let res = [];
    for(let i=a.length-1; i>-1; i--){
        let sum = (a[i]-0) + (b[i]-0) + carried;  //千万不要忘记取出来的每一位变成整数啊
        if(sum>9){
            carried = 1;
        }else{
            carried = 0;
        }
        res[i] = sum%10;
    }

    if(carried === 1){
        res.unshift(carried);
    }
    return res.join('');
}

//2. 手写Function.prototype.bind
Function.prototype.myBind = function(ctx, ...args){
    return (...innerArgs) => this.call(ctx, ...args, ...innerArgs);
}

//3. 实现加法，要求不能用四则运算
function twoSum(a, b){
    if(a === 0) return b;
    if(b === 0) return a;

    let res = a^b; //(异或操作 不同得1)

    return twoSum(res, (a & b) << 1)  //与操作，都为1得1
}

//4. 实现curry 入参是一个多元函数，出参是一个函数（可以分一次执行，也可以分多次执行）
function curry(fn){
    const ctx = this;
    function inner(...args) {
        if(args.length === fn.length){
            return fn.call(ctx, ...args);
        }else {
            return (...innerArgs) => inner.call(ctx, ...args, ...innerArgs);
        }
    }
    return inner;
}

//5. 实现compose
function compose(...fns){
    return (...args) => {
        return fns.reduceRight((acc, cur) => cur(acc), ...args);
    }
}



//-----经典手写题  end -----




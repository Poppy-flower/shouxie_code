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


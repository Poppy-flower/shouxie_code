//深度克隆
/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const clone_single = parent => {
    // 判断类型
    const isType = (obj, type) => {
        if (typeof obj !== "object") return false;
        const typeString = Object.prototype.toString.call(obj);
        let flag;
        switch (type) {
            case "Array":
                flag = typeString === "[object Array]";
                break;
            case "Date":
                flag = typeString === "[object Date]";
                break;
            case "RegExp":
                flag = typeString === "[object RegExp]";
                break;
            default:
                flag = false;
        }
        return flag;
    };

    // 处理正则
    const getRegExp = re => {
        var flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
    };
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];

    const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== 'object') return parent;

        let child, proto;

        if (isType(parent, 'Array')) {
            // 对数组做特殊处理
            child = [];
        } else if (isType(parent, 'RegExp')) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (isType(parent, 'Date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }

        // 处理循环引用
        const index = parents.indexOf(parent);

        if (index != -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);

        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }

        return child;
    };
    return _clone(parent);
};
//函数的克隆
Function.prototype.clone = function() {
    var fct = this;
    var clone = function() {
        return fct.apply(this, arguments);
    };
    clone.prototype = fct.prototype;
    for (property in fct) {
        if (fct.hasOwnProperty(property) && property !== 'prototype') {
            clone[property] = fct[property];
        }
    }
    return clone;
};
Function.prototype.clone=function(){
    return eval( '('+this.toString()+')' );
}
//判断对象是否相等
function isObjectValueEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i]

        var propA = a[propName]
        var propB = b[propName]
        if ((typeof (propA) === 'object')) {
            if (this.isObjectValueEqual(propA, propB)) {
                // return true     这里不能return ,后面的对象还没判断
            } else {
                return false
            }
        } else if (propA !== propB) {
            return false
        } else { }
    }
    return true
}
//判断循环引用
function fn() {
    // JSON.stringify //抛出Uncaught TypeError: Converting circular structure to JSON。
    var stack = [];
    function fn(obj) {
        var len;
        for (len = stack.length; len--;) {
            if (stack[len] === obj) throw TypeError()
        }
        stack.push(obj);
        for (let k in obj) {
            const value = obj[k]
            if (typeof value === 'object') fn(value);
        }
    }
}
//拆解因数
function dismant(num,arr=[]){
    //所有因数都从2开始
    let i = 2
    //如果num是1、2、3没有因数直接返回
    if(num <= 3){
        arr.push(num)
        return arr
    }
    //这个是核心：如果num从2开始找因数 一直找到自己的一半还没找到那么就证明它没有因数了。
    for(i; i < num/2 ; i++){
        if(num % i === 0){
            //存储最小的因数
            arr.push(i)
            //除以因数后 递归执行
            return dismant(num/i,arr)
        }
    }
    // 最后num既不是123，又找不到因数
    arr.push(num)
    return arr
}
//单例模式--闭包
var Single = (function () {
    var instance; // 声明一个instance对象
    function SingleClass() {
        this.say = function () {
            console.log('single')
        }
    }; // 声明SingleClass对象，无法在外部直接调用
    return function () {
        if (instance) { // 如果已存在 则返回instance
            return instance;
        }
        instance = new SingleClass() // 如果不存在 则new一个
        return instance;
    }
})();
//单例模式--构造函数
function Single() {
    if(typeof  Single.instance === 'object'){
        return Single.instance
    }
    //否则正常创建实例
    this.say = function () {
        console.log('single')
    }
    // 缓存
    Single.instance =this
    return this
}

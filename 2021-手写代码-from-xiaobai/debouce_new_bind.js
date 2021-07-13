//防抖
function debounce(fn, wait) {
    //触发事件，n秒后才执行，
    //如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，
    //总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行
    var timer = null;
    return function () {
        var self = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(self, args)
        }, wait)
    }
}
//节流
function throttle() {
    function throttle1(fn, wait) {
        //设置一个定时器，触发事件的时候，如果定时器存在，就不执行，
        //定时器不存在，执行定时器，然后执行函数，清空定时器，这样就可以设置下个定时器
        var timer = null;
        return function () {
            var self = this;
            var args = arguments;
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    fn.apply(self, args)
                },wait)
            }
        }

    }
    function throttle2(fn, wait) {
        var flag = true;
        return function () {
            if (!flag) return;    //工作时间，直接return，不执行
            var self = this;
            var args = arguments;
            flag = false;        //把标志位设为工作时间
            setTimeout(() => {
                    fn.apply(self, args)
                    flag = true;
                },
                wait
            )
        }

    }
    function throttle3(fn, wait) {
        //取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )
        //如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳
        //如果小于，就不执行。
        var startTime = 0;
        return function () {
            var self = this;
            var args = arguments;
            var now = +new Date();
            if (now - startTime > wait) {
                fn.apply(self, args)
                startTime = now;
            }
        }
    }
}
//柯里化 实现add(1)(2)(3)(4)=10   是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
function add() {
    var args = [].slice.call(arguments);    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _add = function () {                // 在内部声明一个函数，利用闭包的特性保存args并收集所有的参数值
        args.push(...arguments);
        return _add;
    }
    _add.toString = function () {           // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
        return args.reduce((a, b) => {
            return a + b;
        })
    }
    return _add
}
//封装柯里化
function curry(fn,...args){
    var self = this;
    var len = fn.length;
    var args = args || [];

    return function () {
        var _args = [].slice.call(arguments);
        args.push(_args);
        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return curry.call(self, fn, _args)
        }
        // 参数收集完毕，则执行fn
        return fn.apply(this, _args)
    }
}
//模拟new
function myNew(Parent,...rest){
    var child = Object.create(Parent.prototype);    // 1.以构造器的prototype属性为原型，创建新对象；
    var res = Parent.apply(child, rest);             // 2.将this和调用参数传给构造器执行
    return typeof res === 'object' ? res : child;   // 3.如果构造器没有手动返回对象，则返回第一步的对象
}
//模拟instanceOf
function instance_of(L, R) {
    //L 表示左表达式，R 表示右表达式
    var O = R.prototype; // 取 R 的显示原型
    L = L.__proto__; // 取 L 的隐式原型
    while (true) {
        if (L === null) return false;
        if (O === L)
            // 这里重点：当 O 严格等于 L 时，返回 true
            return true;
        L = L.__proto__;
    }
}
//模拟Object.create
function create(o) {
    function T() {};
    T.prototype = o;
    return new T();
}
//apply call bind
Function.prototype._call = function (obj) {
    obj = obj ? Object(obj) : window;   // 如果没有传或传的值为空对象 指向window
    obj.fn = this;                      //添加一个方法 指向this
    var args = [...arguments].slice(1);
    var res = obj.fn(...args);
    delete obj.fn;
    return res;
}
Function.prototype._apply = function (obj, args) {
    obj = obj ? Object(obj) : window;
    obj.fn = this;
    var res;
    if (args) {
        res = obj.fn(...args);
    } else {
        res = obj.fn();
    }
    delete obj.fn;
    return res;
}
Function.prototype.bind1 = function (context) {
    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }
}
Function.prototype._bind = function (context) {
    //防止Function.prototype.bind.call(obj,param)这种调用改变this
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
//数组扁平化
function flatten() {
    arr.flat(Infinity)
    function flatten1(arr) {
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (Array.isArray(item)) {
                res = res.concat(flatten(item))
            } else {
                res.push(item)
            }
        }
        return res;

    }
    function flatten2(arr) {
        return arr.reduce((pre, next) = > {
            return pre.concat(Array.isArray(next) ? flatten(next) : next)
        }, []
    )
    }
    function flatten3(arr, depth = 1) {
        let res = [];
        arr.forEach(item = > {
            if(Array.isArray(item) && depth > 0{
            res.push(...flatten(item, --depth))
        }else{
            res.push(item)
        }
    })
        return res;
    }
}
//数组去重（包含NaN 各种类型的一个去重，就是每一项可能是NaN，可能是数组，也可能是对象）
function uniq() {
    Array.prototype.uniq = function () {
        var arr = [];
        var flag = true;
        this.forEach(function(item) {
            // 排除 NaN (重要！！！) NaN 和自身不相等
            // 除了NaN 其他数据 和 自己都 相等
            if (item != item) {
                // 只有第一次找到NaN 把他放进数组里面
                flag && arr.indexOf(item) === -1 ? arr.push(item) : '';
                flag = false;
            } else  {
                arr.indexOf(item) === -1 ? arr.push(item) : ''
            }
        });
        return arr;
    }
    // Es6 一行代码搞定
    var uniqueArr2 = Array.from(new Set(arr));
}
//数组乱序
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}
//添加for of 迭代器 iterator
function addIterator(obj) {
    obj[Symbol.iterator] = ()=> {
        let keys = Object.keys(obj);
        let len = keys.length;
        let n = 0;
        return {
            next(){
                if(n<length){
                    return {
                        done:false,
                        value:obj[keys[n++]]
                    }
                }else{
                    return {
                        done: true,
                    }
                }

            }
        }
    }
}
// 实现let
(function () {
    var a = 1;
    console.log(a); // 1
})();
//实现const
function _const(key, value) {
    window[key] = value;
    Object.defineProperty(window, key, {
        enumerable: false,
        configurable: false,
        get: function () {
            return value;
        },
        set: function (newValue) {
            if (newValue !== value) {
                throw TypeError("只读变量，不可修改");
            } else {
                return value;
            }
        },
    });
}
//实现forEach
function forEach(obj, fn) {
    // 循环变量为空时，直接return
    if (obj === null || typeof obj === 'undefined') {
        return;
    }

    // 如果 obj 不可遍历，则强制转为数组
    if (typeof obj !== 'object') {
        obj = [obj];
    }

    if (Array.isArray(obj)) {
        // 遍历数组
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // 遍历对象
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

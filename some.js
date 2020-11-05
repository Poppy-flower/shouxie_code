//防抖
function debounce(fn, wait) {
    //触发事件，n秒后才执行，
    //如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，
    //总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行
    var timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
                fn.apply(this, arguments)
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
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                fn.apply(this, arguments);
            },
                wait
            )
            }
        }

    }
    function throttle2(fn, wait) {
        var flag = true;
        return function () {
            if (!flag) return;    //工作时间，直接return，不执行
            flag = false;        //把标志位设为工作时间
            setTimeout(() => {
                fn.apply(this, arguments);
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
            var now = +new Date();
            if (now - startTime > wait) {
                fn.apply(this, arguments);
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
//apply call bind
Function.prototype._call = function (obj) {
    obj = obj ? Object(obj) : window;   // 如果没有传或传的值为空对象 指向window
    obj.fn = this;                      //添加一个方法 指向this
    var args = [...arguments
    ].
    slice(1);
    var res = obj.fn(...args
    )
    ;

    delete obj.fn;
    return res;
}
Function.prototype._apply = function (obj, args) {
    obj = obj ? Object(obj) : window;
    obj.fn = this;
    var res;
    if (args) {
        res = obj.fn(..args
    )
        ;
    } else {
        res = obj.fn();
    }
    delete obj.fn;
    return res;
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
//手写promise
class Promise{
    constructor(executor){
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        // 成功存放的数组
        this.onResolvedCallbacks = [];
        // 失败存放法数组
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                // 一旦resolve执行，调用成功数组的函数
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        };
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                // 一旦reject执行，调用失败数组的函数
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        };
        try{
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulfilled,onRejected) {
        if (this.state === 'fulfilled') {
            onFulfilled(this.value);
        };
        if (this.state === 'rejected') {
            onRejected(this.reason);
        };
        // 当状态state为pending时
        if (this.state === 'pending') {
            // onFulfilled传入到成功数组
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value);
        })
            // onRejected传入到失败数组
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason);
        })
        }
    }
}
//promise all
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let done = gen(promises.length, resolve);
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}
function gen(length, resolve) {
    let count = 0;
    let values = [];
    return function(i, value) {
        values[i] = value;
        if (++count === length) {
            console.log(values);
            resolve(values);
        }
    }
}
//promise race
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then(resolve, reject);
        });
    });
}
//promist finally
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
//深度克隆
/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const clone = parent => {
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
//实现双向绑定
function shuangxiangbangding() {
    //proxy
    const data = { count: 0 };
    const proxy = new Proxy(data, {
        get(target, property) {
            return target[property];
        },
        set(target, property, value) {
            target[property] = value;
            console.log(value);
        }
    });

    //defineProperty
    const obj = {};

    let initValue = 1;

    Object.defineProperty(obj, 'name', {
        set: function(value) {
            console.log('set方法被执行了');
            initValue = value;
        },
        get: function() {
            return initValue;
        }
    });
    console.log(obj.name);
}
//实现EventEmeitter
function fn() {
    class EventEmeitter {
        constructor() {
            this._events = this._events || new Map(); // 储存事件/回调键值对
            this._maxListeners = this._maxListeners || 10; // 设立监听上限
        }
    }
    // 触发名为type的事件
    EventEmeitter.prototype.emit = function(type, ...args) {
        let handler;
        // 从储存事件键值对的this._events中获取对应事件回调函数
        handler = this._events.get(type);
        if (args.length > 0) {
            handler.apply(this, args);
        } else {
            handler.call(this);
        }
        return true;
    };
    // 监听名为type的事件
    EventEmeitter.prototype.addListener = function(type, fn) {
        // 将type事件以及对应的fn函数放入this._events中储存
        if (!this._events.get(type)) {
            this._events.set(type, fn);
        }
    };
    // 触发名为type的事件
    EventEmeitter.prototype.emit = function(type, ...args) {
        let handler;
        handler = this._events.get(type);
        if (Array.isArray(handler)) {
            // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
            for (let i = 0; i < handler.length; i++) {
                if (args.length > 0) {
                    handler[i].apply(this, args);
                } else {
                    handler[i].call(this);
                }
            }
        } else {
            // 单个函数的情况我们直接触发即可
            if (args.length > 0) {
                handler.apply(this, args);
            } else {
                handler.call(this);
            }
        }

        return true;
    };

    // 监听名为type的事件
    EventEmeitter.prototype.addListener = function(type, fn) {
        const handler = this._events.get(type); // 获取对应事件名称的函数清单
        if (!handler) {
            this._events.set(type, fn);
        } else if (handler && typeof handler === "function") {
            // 如果handler是函数说明只有一个监听者
            this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
        } else {
            handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
        }
    };

    EventEmeitter.prototype.removeListener = function(type, fn) {
        const handler = this._events.get(type); // 获取对应事件名称的函数清单

        // 如果是函数,说明只被监听了一次
        if (handler && typeof handler === "function") {
            this._events.delete(type, fn);
        } else {
            let postion;
            // 如果handler是数组,说明被监听多次要找到对应的函数
            for (let i = 0; i < handler.length; i++) {
                if (handler[i] === fn) {
                    postion = i;
                } else {
                    postion = -1;
                }
            }
            // 如果找到匹配的函数,从数组中清除
            if (postion !== -1) {
                // 找到数组对应的位置,直接清除此回调
                handler.splice(postion, 1);
                // 如果清除后只有一个函数,那么取消数组,以函数形式保存
                if (handler.length === 1) {
                    this._events.set(type, handler[0]);
                }
            } else {
                return this;
            }
        }
    }

}
//发布订阅模式 EventEmitter
class EventEmitter {
    constructor() {
        // 事件对象，存放订阅的名字和事件  如:  { click: [ handle1, handle2 ]  }
        this.events = {}
    }
    // 订阅事件的方法
    on(eventName, callback) {
        if (!this.events[eventName]) {
            // 一个名字可以订阅多个事件函数
            this.events[eventName] = [callback]
        } else {
            // 存在则push到指定数组的尾部保存
            this.events[eventName].push(callback)
        }
    }
    // 触发事件的方法
    emit(eventName,rest){
        // 遍历执行所有订阅的事件
        this.events[eventName] &&
        this.events[eventName].forEach(f => f.apply(this, rest))
    }

    // 移除订阅事件
    remove(eventName, callback) {
    if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter(f => f != callback)
    }
}
    // 只执行一次订阅的事件，然后移除
    once(eventName, callback) {
        // 绑定的时fn, 执行的时候会触发fn函数
        const fn = () => {
            callback() // fn函数中调用原有的callback
            this.remove(eventName, fn) // 删除fn, 再次执行的时候之后执行一次
        }
        this.on(eventName, fn)
}
}
//实现hook
function hook() {
    // 通过数组维护变量
    let memoizedState  = [];
    let currentCursor = 0;

    function useState(initVal) {
        memoizedState[currentCursor] = memoizedState[currentCursor] || initVal;
        function setVal(newVal) {
            memoizedState[currentCursor] = newVal;
            render();
        }
        // 返回state 然后 currentCursor+1
        return [memoizedState[currentCursor++], setVal];
    }

    function useEffect(fn, watch) {
        const hasWatchChange = memoizedState[currentCursor]
            ? !watch.every((val, i) => val === memoizedState[currentCursor][i])
    : true;
        if (hasWatchChange) {
            fn();
            memoizedState[currentCursor] = watch;
            currentCursor++; // 累加 currentCursor
        }
    }
}
// 编写自定义useHook，名字以use开头
function useCounter(initialValue) {
    const [count, changeCount] = useState(initialValue);

    const decrease = () => {
        changeCount(count - 1);
    };

    const increase = () => {
        changeCount(count + 1);
    };

    const resetCounter = () => {
        changeCount(0);
    };

    // 返回包含了更多逻辑的 state 以及改变 state 方法的钩子
    return [count, { decrease, increase, resetCounter }];
}
//HOC
function HOCFactoryFactory(...params){
    // do something with params
    return function HOCFactory(WrappedComponent) {
        return class HOC extends React.Component {
            render() {
                return <WrappedComponent {...this.props}/>
            }
        }
    }
}
//express get
function nodeGet() {
    var express = require('express');
    app.get('/',function(req,res) {
        var url = req.query.url;
        var name = req.query.name;
        console.log(url, name);
    });
//node http get
    var http = require('http');
    var options = {
        hostname: '127.0.0.1',
        port: 10086,
        path: '/pay/pay_callback?time=123'
        method: 'GET'
    };
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();
}
//node http post
function nodePost() {
    var http =  require('http');
    var querystring = require('querystring');

    var contents = querystring.stringify({
        name:'byvoid',
        email:'byvoid@byvoid.com',
        address:'Zijing'
    });
    var options = {
        host:'www.byvoid.com',
        path:'/application/node/post.php',
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':contents.length
        }
    }

    var req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data',function(data){
            console.log("data:",data);   //一段html代码
        });
    });

    req.write(contents);
    req.end;
}
//js 实现一个hash-router
class Router{
    constructor(){
        this.routes = {};//用来保存路由
        this.curUrl = ''; //获取当前的hash
    }
    init(){
        window.addEventListener( 'hashchange', this.reloadPage.bind(this) );
    }
    reloadPage(){
        this.curUrl = location.hash.substring(1) || '/';
        this.routes[this.curUrl]();
    }
    map( key, callback ){ //保存路由对应的函数
        this.routes[key] = callback;
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
//promise 并发
function PromisePool() {
    class PromisePool {
        constructor(max, fn) {
            this.max = max; // 最大并发数
            this.fn = fn;   // 自定义的请求函数
            this.pool = []; // 并发池
            this.urls = []; // 剩余的请求地址
        }

        start(urls) {
            this.urls = urls;
            // 先循环把并发池塞满
            while (this.pool.length < this.max) {
                let url = this.urls.shift();
                this.setTask(url);
            }
            // 利用Promise.race 方法来获得并发池中某任务完成的信号
            let race = Promise.race(this.pool);
            return this.run(race);
        }

        run(race) {
            race
                .then(res => {
                // 每当并发池跑完一个任务，就再塞入一个任务
                let url = this.urls.shift();
            this.setTask(url);
            return this.run(Promise.race(this.pool));
        });
        }
        setTask(url) {
            if (!url) return;
            let task = this.fn(url);
            this.pool.push(task); // 将该任务推入pool并发池中
            console.log(`\x1B[43m ${url} 开始，当前并发数：${this.pool.length}`);
            task.then(res => {
                // 请求结束后将该Promise任务从并发池中移除
                this.pool.splice(this.pool.indexOf(task), 1);
            console.log(`\x1B[43m ${url} 结束，当前并发数：${this.pool.length}`);
        });
        }
    }

// test
    const URLS = [
        'bytedance.com',
        'tencent.com',
        'alibaba.com',
        'microsoft.com',
        'apple.com',
        'hulu.com',
        'amazon.com'
    ];
// 自定义请求函数
    var requestFn = url => {
        return new Promise(resolve => {
                setTimeout(_ => {
                resolve(`任务 ${url} 完成`);
    }, 1000*dur++)
    }).then(res => {
            console.log('外部逻辑 ', res);
    })
    }

    const pool = new PromisePool(3, requestFn); // 并发数为3
    pool.start(URLs);
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

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
    let memoizedState = []; // hooks 存放在这个数组
    let cursor = 0; // 当前 memoizedState 下标

    function useState(initialValue) {
        memoizedState[cursor] = memoizedState[cursor]
            || initialValue;
        const currentCursor = cursor; // currentCursor形成闭包
        function setState(newState) {
            memoizedState[currentCursor] = newState;
            render();
        }
        return [memoizedState[cursor++], setState];
        // 返回当前 state，并把 cursor 加 1
    }

    function useEffect(callback, depArray) {
        const hasNoDeps = !depArray;
        const deps = memoizedState[cursor];
        const hasChangedDeps = deps
            ? !depArray.every((el, i) => el === deps[i])
            : true;
        if (hasNoDeps || hasChangedDeps) {
            callback();
            memoizedState[cursor] = depArray;
        }
        cursor++;
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
function useAxios(url) {
    const [loading,setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        setLoading(true);
        axios.get(url)
            .then(res => setState(res)
                .catch(err => setError(err)
                    .finally(() => {setLoading(false)}
    }, [url])

    return [loading, data, error];
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
// 模拟实现一个 localStorage
function localStorageFn() {
    const localStorageMock = (function(){
        let store = {};
        return {
            getItem(key){
                if(store[key] && store[key+'time']){
                    const date = new Date().valueOf();
                    if(date>store[key+'time']){ // 过期了
                        this.removeItem(key);
                        return '已经过期了';
                    }
                }
                return store[key] || null;
            },
            setItem(key,value,time){
                store[key] = value.toString();
                if(time)store[key+'time'] = time; // 设置过期时间
            },
            removeItem(key){
                delete store[key]
            },
            clear(){
                store = {};
            }
        }
    })()
    Object.defineProperty(window,'localS',{
        value:localStorageMock
    })
    localS.setItem('test','test');
    console.log(localS.getItem('test'))
}

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
    let count = 0;
    let len = promises.length;
    let res = new Array(len);
    return new Promise(function(resolve, reject) {
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then((data)=> {
                count++;
                res[index] = data;
                if (count === len) {
                    return resolve(res);
                }
            }, (err)=> {
                return reject(err);
            });
        })
    });
};
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
// promise 超时处理
function fn() {
    const timeout = (times) =>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                reject('请求超时，请重试');   // 【2】
            },times)
        })
    }
    const ajaxRequest = (url) => {
        return new Promise((resolve,reject)=>{
            axios.get(url)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    const handle = (url, times)=>{
        return new Promise.race([ajaxRequest(url), timeout(tiems)]);
    }
}
//promise 并发
function PromisePool(){
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
    pool.start(URLS);
}
//Promise.all处理多次reject/最多n次reject
const p1 = new Promise((res, rej) => {
    setTimeout(() =>{
        res(1)
    }, 1000)
})
const p2 = new Promise((res, rej) => {
    setTimeout(() =>{
        rej('err 2')
    }, 2000)
})
const p3 = new Promise((res, rej) => {
    setTimeout(() =>{
        res(3)
    }, 3000)
})
let promises = [p1, p2, p3];
function PromiseCountError(promises, count = 3) {
    let errorCount = 0 // 失败的次数
    let thenHandler =  (res) => {
        return {
            res: res,
            status: 'success'
        }
    }
    let catchHandler = (err) =>{
        errorCount++
        if (errorCount >= count) {
            return Promise.reject(`catch 超过了${count}次`) // reject的内容可以自定义
        } else {
            return {
                err: err,
                status: 'failed'
            }
        }
    }
    let transferedPromises = (promises) => { // 返回一个处理之后的promise数组
        return promises.map(promise => {
            return promise.then(thenHandler).catch(catchHandler)
        })
    }
    let promiseArr = transferedPromises(promises)
    Promise.all(promiseArr).then(res => {
        console.log('success：', res)
    }, err => {
        console.log('err：', err)
    })
}

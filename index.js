//Object.is
if (!Object.is) {
    Object.defineProperty(Object, "is", {
        value: function (x, y) {
            // SameValue algorithm
            if (x === y) { // Steps 1-5, 7-10
                // Steps 6.b-6.e: +0 != -0
                return x !== 0 || 1 / x === 1 / y;
            } else {
                // Step 6.a: NaN == NaN
                return x !== x && y !== y;
            }
        }
    });
}

/**
 *
 * @param fn {Function} 实际要执行的函数
 * @param delay {Number} 延迟时间，也就是阈值，单位是毫秒（ms）
 *
 * @return {Function} 返回一个“去弹跳”了的函数
 */
export const debounce = (fn, delay) => {
    // 定时器，用来 setTimeout
    let timer;
    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {
        // 保存函数调用时的上下文和参数，传递给 fn
        const context = this;
        const args = arguments;
        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        timer && clearTimeout(timer);
        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(() => {
            fn && fn.apply(context, args);
        }, delay);
    };
};
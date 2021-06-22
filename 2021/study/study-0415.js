/**
 * 5. 请实现一个cacheRequest(url, callback)请求缓存方法，保证当使用ajax时，对于同一个API实际在网络层只发出一次请求以节省网络流量
     （假设已存在request底层方法用于封装ajax请求，调用格式为：request(url, data => {})

  比如调用方代码如下

  // a.js
  cacheRequest('/user', data => {
      console.log('我是从A中请求的user，数据为' + data);
  })
  // b.js
  cacheRequest('/user', data => {
      console.log('我是从B中请求的user，数据为' + data);
  }
 */
function cacheRequest(url, callback) {
  
}


 /**
  * 6. 实现一个函数getNextValue(arr, n), 返回在“有序”数组arr中比n大的最小值。
    如getNextValue([1,2,2,3,3,3,7,9], 2), 返回3
  */

    /**
     * 声明两个指针，左指针，右指针
     *
     * 当left<right时，执行循环体
     *
     * 中间值
     * 1. 中间值如果大于给定的值，区间缩小到左边；
     *      更新right指针；
     *      更新最小值为右侧指针对应的值；
     * 2. 中间值如果小于给定的值，区间缩小到右边；
     *      更新left指针；
     *
    */
function getNextValue(arr, n) {
  // 边界条件判断
  if (n >= arr[arr.length-1]) {
    return undefined;
  }

  let l = 0,
      r = arr.length - 1;

  while (l < r) {
    let m = Math.floor((l + r)/2);
    if (arr[m] > n) {
      r = m;
    } else{
      l = m+1;
    }
  }

  return arr[r];
}

let res = getNextValue([1, 2, 2, 3, 3, 3, 7, 9], 2);
console.log(res);



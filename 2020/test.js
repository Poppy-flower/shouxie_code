/**
 * Created by xiaobai on 2020/5/16.
 */
//字符串反转，如将 '12345678' 变成 '87654321'
str = str.split('').reverse().join('');
//生成5个不同的随机数
function getNum() {
    var num = [];
    var count = 5;
    var obj = {};
    for (var i = 0; i < 5; i++) {
        let temp = getRndInteger();
        if (!obj[temp]) {
            obj[temp] = 1;
            num.push(temp)
        } else {
            i--;
        }
    }
}
function getRndInteger(min=1, max=100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//将数字 12345678 转化成 RMB形式 如： 12,345,678
function checkNum(num) {
    //判断非法
    if (typeof num !== 'number') {
        return '非法数字';
    }
    //先将数字转为字符
    num += '';
    //判断小数、负数、0开头、0x开头;
    if (num.indexOf('.') > -1) {
        return '存在小数';
    }
    if (num.indexOf('-') > -1) {
        return '负数';
    }
    console.log(transNum(num))
}
function transNum(num) {
    //先将数字转为字符
    num += '';
    var len = num.length;
    var str = '';
    while (len > 3) {
        str = ',' + num.substring(len - 3, len) + str;
        len -= 3;
    }
    str = num.substring(0, len) + str;
    return str;
}

//斐波拉契数列
function fn(n){
    return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}
//阶乘函数
function fn(n){
    var res = 1;
    for(var i = 1;i<=n;i++){
        res *=i;
    }
    return res;
}
//将'abc-def'变成驼峰式写法'abcDef'
function fn(str){
    var arr = str.split('-');
    var new_arr = arr.map((a,index,arr)=>{
            return a.charAt(0).toUpperCase() + a.substring(1)
        })
    return new_arr.join('');
}
//倒计时功能
function leftTimer(storptimes) {
    var newtime = new Date() //获取当前时间
    var storptime = new Date(storptimes) //获取截止时间

    var mistiming = storptime.getTime() - newtime.getTime();
    var days = Math.floor(mistiming / 1000 / 60 / 60 / 24); //获取天数
    var hours = Math.floor(mistiming / 1000 / 60 / 60 % 24); // 获取小时
    var minutes = Math.floor(mistiming / 1000 / 60 % 60); //获取分钟数
    var seconds = Math.floor(mistiming / 1000 % 60); //获取秒数

    var rels = `${days}天${hours}时${minutes}分${seconds}秒`;
    // 判断时间差是不是正数，就是截止时间是不是比现在的时间晚
    var mis = mistiming > 0? rels:"请输入正确的时间"
    return  mis
}
setInterval(function(){
    console.log(leftTimer('2020-3-23 18:56:02'))
},1000)
//使用setTimeout实现setInterval
function timerFun(){
    console.log('要执行的操作');
    let timer=setTimeout(function(){
        timerFun();
        clearTimeout(timer)
    },1000);
}
//LazyMan
class LazyManClass{
    constructor(name){
        this.name = name;
        this.taskList = [];
        console.log(`Hi I am ${this.name}`)
        setTimeout(()=>{
            this.next();
    },0)
    }
    eat(name){
        var fn = ()=>{
            console.log(`I am eating ${name}`)
            this.next()
        }
        this.taskList.push(fn);
        return this;

    }
    sleepFirst(time){
        var fn = ()=>{
            setTimeout(()=>{
                console.log(`等待了${time}秒`);
            this.next()
        },time*1000)
        }
        this.taskList.unshift(fn);
        return this;
    }
    sleep(time){
        var fn = ()=>{
            setTimeout(()=>{
                console.log(`等待了${time}秒`);
            this.next()
        },time*1000)
        }
        this.taskList.push(fn);
        return this;

    }
    next(){
        var fn = this.taskList.shift();
        fn && fn()
    }
}
function LazyMan(name) {
    return new LazyManClass(name)
}
LazyMan('Tony').sleep(10).eat('lunch');

//返回能组合成实际金额的最大值
let arr = [30, 50, 100];
function maxQ(arr, n) {
    let rArr = arr.map(v => {
        if (n < v) return 0;
        return maxQ(arr, n - v) + v
    });
    return Math.max(...rArr);
}

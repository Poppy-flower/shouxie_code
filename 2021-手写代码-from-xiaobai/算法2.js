//爬楼梯
var climbStairs = function(n) {
    // 求第n步 所以索引到n
    var dp = new Array(n+1);
    if(n <= 3){
        return n;
    }
    dp[1] = 1;
    dp[2] = 2;
    for(var i = 3;i<=n;i++){
        dp[i] = dp[i-2] + dp[i-1];
    }
    return dp[n];
};
//最大连续子序和
var maxSubArray = function(nums) {
    let num = [nums[0]]
    let result = nums[0]
    const len = nums.length;
    for (var i = 1; i < len; i++) {
        num[i] = Math.max(nums[i], nums[i] + num[i-1])
        result = Math.max(num[i], result)
    }
    return result
};
//给定一个非空数组，返回此数组中第三大的数。
var thirdMax = function(nums) {
    let first = -Infinity, second = -Infinity, third = -Infinity
    for (const num of nums) {
        if ([first, second, third].includes(num)) continue
            ;[first, second, third] = [
            Math.max(num, first),
            num < second ? second : Math.min(first, num),
            num > second ? second : Math.max(third, num)
        ]
    }
    return isFinite(third) ? third : first
};
//零钱兑换
var coinChange = function(coins, amount) {
    let dp = new Array( amount + 1 ).fill( Infinity );
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}
//反转数组|字符串
var reverseString = function(s) {
    let oldL=s.length
    for(let len=s.length,i=len-1;i>=0;i--){
        let item=s[i]
        s.push(item)
    }
    s.splice(0,oldL);
    return s;
};
//判断回文字符串
var validPalindrome = function(s) {
    let left = 0;
    let right = s.length -1;

    while(left < right){
        if(s[left] !== s[right]){
            let str = s.split("");
            let strRight = s.split("");
            str.splice(left,1)
            strRight.splice(right,1)

            return str.join("") === str.reverse().join("") || strRight.join("") === strRight.reverse().join("")
        }
        left++
        right--
    }
    return true
};
// 返回参数范围内的所有质数，默认边界 100
function fn() {
    function getPrime (limit = 100) {
        let n = 1, numArr = []
        while(n++ < limit) numArr.push(n)
        return numArr.filter(isPrime)
    }

    function isPrime (v) {
        let i = 2, len = Math.sqrt(v)
        for (; i <= len; i++) {
            if (v % i === 0) return false
        }
        return true
    }
}
// 最长不含重复字符的子字符串
var lengthOfLongestSubstring = function(s) {
    const len = s.length;
    let res = 0;
    let temp = '';
    for(let i = 0; i < len; i ++) {
        if(temp.indexOf(s[i]) === -1) {
            temp += s[i];
            res = Math.max(res, temp.length);
        } else {
            temp = temp.slice(temp.indexOf(s[i]) + 1);
            temp += s[i];
        }
    }
    return res;
};
// 两数之和
function twoSum(nums, target) {
    //遍历数组每个元素
    for(let i = 0;i < nums.length; i++){
        //判断数组中存在需要满足和为target的另一个元素，如果存在，返回下标
        let anothernum=target - nums[i];
        let targetindex = nums.indexOf(target - nums[i]);
        if(targetindex!=-1){
            //找到符合条件的元素下标
            if(targetindex===i){
                //num[i]的值正好是target的1/2
                for(let j = i+1;j < nums.length; j++){
                    if(nums[j]==target/2){
                        return[i,j]
                    }
                }
            }else{
                return [i,targetindex]
            }
        }
    }
};
//连续子数组的最大和
function FindGreatestSumOfSubArray(array) {
    let maxSum = array[0]
    let curSum = 0
    for(let i=0;i<array.length;i++){
        if(curSum>=0){
            curSum+=array[i]
        }else{
            curSum=array[i]
        }
        if(curSum>maxSum){
            maxSum = curSum
        }
    }
    return maxSum
}
//剪绳子
function cutRope(number) {
    if(number<2 || number>60){
        return 0;
    }
    if(number==2){
        return 1;
    }
    if(number==3){
        return 2;
    }
    let arr=new Array(number+1);
    arr[0]=0;
    arr[1]=1;
    arr[2]=2;
    arr[3]=3;
    for(let i=4;i<=number;i++){
        let max=0;
        //由于arr[1]*arr[3]与arr[3]*arr[1]一样，所以j<=i/2;
        for(let j=1;j<=i/2;j++){
            let mul=arr[j]*arr[i-j];
            if(mul>max){
                max=mul;
            }
        }
        arr[i]=max;
    }
    return arr[number];
}
//和为S的连续正数序列
function findSum() {
    //输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序
    /*滑动窗口思想
    start和end分布表示序列最小值和最大值。分别初始化为1，2，start的值不能大于sum的一半
    如果从start到end的和大于sum，从序列中去掉最小的值（增大start），反之增大end
    终止条件：start增大到sum的一半且end小于sum为止。*/
    function FindContinuousSequence(sum) {
        let res=[];
        let start=1;
        let end=2;
        let mid=Math.floor((1+sum)/2);
        if(sum<3){
            return res;
        }
        while(start<mid){
            let s=getSum(start,end);
            if(s===sum){
                res.push(getSequence(start,end));
                end++;
            }else if(s<sum){
                end++;
            }else if(s>sum){
                start++;
            }
        }
        return res;
    }

    function getSum(start,end){
        let sum=0;
        for(let i=start;i<=end;i++){
            sum += i;
        }
        return sum;
    }

    function getSequence(start,end){
        let singleRes=[];
        for(let i=start;i<=end;i++){
            singleRes.push(i);
        }
        return singleRes;
    }
}
//不用加减乘除做加法-位运算
function Add(num1, num2) {
    // write code here
    while(num2!=0){
        let temp = num1^num2; //异或求相加不进位部分
        num2 = (num1&num2)<<1;//与操作后左移一位求进位分布
        num1=temp;
    }
    return num1;
}
//扑克牌顺子
function IsContinuous(numbers) {
    // write code here
    let len=numbers.length;
    let numOfZero=0;
    let numOfInterval=0;
    if(len!==5){
        return false;
    }
    numbers.sort(function(a,b){
        return a-b;
    });
    for(let i=0;i<len-1;i++){
        if(numbers[i]===0){
            numOfZero++;
            continue;
        }
        if(numbers[i]===numbers[i+1]){
            return false;
        }
        numOfInterval += numbers[i+1] - numbers[i] -1;
    }
    if(numOfZero>=numOfInterval){
        return true;
    }
    return false;
}
//岛屿的最大面积 DFS(深度优先搜索)
function maxAreaOfIsland(grid) {
    /*我们想知道网格中每个连通形状的面积，然后取最大值。
      如果我们在一个土地上，以 4 个方向探索与之相连的每一个土地（以及与这些土地相连的土地），那么探索过的土地总数将是该连通形状的面积。
      为了确保每个土地访问不超过一次，我们每次经过一块土地时，将这块土地的值置为 0。这样我们就不会多次访问同一土地。
        1.遍历grid得到每个位置岛屿?面积的最大值，返回一个maxArea
        2.搜索函数-递归实现dfs函数
        3.判断边界，若不在边界内，返回0;否则为1，递归计算上下左右是否为1，area计算岛屿面积；
        4.判断完每个位置需要将其置0(gridi=0)
    */
    var maxArea = 0; //记录保持者
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                maxArea = Math.max(maxArea, dfs(grid, i, j)); //更新记录
            }
        }
    }
    function dfs(grid, i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === 0) {
            return 0; //递归出口边界
        }
        grid[i][j] = 0; //避免重复计算，沉岛策略
        var area = 1;
        area += dfs(grid, i + 1, j); //上面的1
        area += dfs(grid, i - 1, j); //下面的1
        area += dfs(grid, i, j + 1); //左面的1
        area += dfs(grid, i, j - 1); //右面的1
        return area
    }
    return maxArea //返回最大面积
};

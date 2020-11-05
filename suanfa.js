//冒泡
function bubbleSort(arr){
    for(let i = arr.length;i>0;i--){
        let isOk = true;
        for(let j = 0;j<i-1;j++){
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
                isOk = false;
            }
        }
        if(isOk){
            break;
        }
    }
    return arr
}
//快排
function quickSort(arr) {
    if(arr.length <=1)return arr;
    let midIndex = Math.floor(arr.length/2);
    let mid = arr.splice(midIndex,1)[0];
    let left = [],right = [];
    arr.forEach((item)=>{
        if(item < mid){
        left.push(item)
    }else{
        right.push(item)
    }
})

    return [...quickSort(left),mid,...quickSort(right)]
}
//二分查找-递归实现
function binarySearch(data, dest, start, end){
    var end = end || data.length - 1,
        start = start || 0,
        m = Math.floor((start + end) / 2);
    if(data[m] == dest){
        return m;
    }
    if(dest < data[m]){
        return binarySearch(data, dest, 0, m-1);
    }else{
        return binarySearch(data, dest, m+1, end);
    }

    return false;
}
//list 转成树形结构
function convert(list) {
    let res = [];
    let obj = {};
    list.forEach((item)=>{
        obj[item.id] = item;
})
    list.forEach((item)=>{
        if(item.parentId !== 0){
        obj[item.parentId]['children'] ? obj[item.parentId]['children'].push(item) : obj[item.parentId]['children'] = [item]
    }else{
        res.push(item)
    }
})
    return res
}
//深度优先遍历的递归写法 DFC
function deepTraversal(node){
    let nodes=[];
    if(node!=null){
        nodes.push[node];
        let childrens=node.children;
        for(let i=0;i<childrens.length;i++)
            deepTraversal(childrens[i]);
    }
    return nodes;
}
//广度优先遍历的递归写法 BFC
function wideTraversal(node){
    let nodes=[],i=0;
    if(node!=null){
        nodes.push(node);
        wideTraversal(node.nextElementSibling);
        node=nodes[i++];
        wideTraversal(node.firstElementChild);
    }
    return nodes;
}
//一位数组的有序合并
function mergeArray(arr1,arr2){
    var ind1=0; //标记arr1的对比元素的初始索引值
    var ind2=0; //标记arr2的对比元素的初始索引值
    var arr=[]; //作为输出的新数组
    while(ind1<arr1.length && ind2<arr2.length){ //当arr1和arr2元素均未全部存入arr中，则从第一个元素开始进行比较，将较小的那个元素存入arr
        if(arr1[ind1]<=arr2[ind2]){
            arr.push(arr1.slice(ind1,ind1+1)[0]); //若arr1的对比元素小于arr2的对比元素，则将arr1的对比元素存入arr中
            ind1++;
        }else{
            arr.push(arr2.slice(ind2,ind2+1)[0]);
            ind2++;
        }
    }
    while(ind1<arr1.length){ //当arr2的元素已全部存入arr中，则直接将arr1剩余的所有元素依次存入arr
        arr.push(arr1.slice(ind1,ind1+1)[0]);
        ind1++;
    }
    while(ind2<arr2.length){ //当arr1的元素已全部存入arr中,则直接将arr2剩余的所有元素依次存入arr
        arr.push(arr2.slice(ind2,ind2+1)[0]);
        ind2++;
    }
    return arr;
}
//单向链数据结构
class Node {
    constructor(value, next) {
        this.value = value
        this.next = null
    }
}
class LinkList {
    constructor() {
        this.head = null
    }

    find(value) {
        let curNode = this.head
        while (curNode.value !== value) {
            curNode = curNode.next
        }
        return curNode
    }

    findPrev(value) {
        let curNode = this.head
        while (curNode.next!==null && curNode.next.value !== value) {
            curNode = curNode.next
        }
        return curNode
    }

    insert(newValue, value) {
        const newNode = new Node(newValue)
        const curNode = this.find(value)
        newNode.next = curNode.next
        curNode.next = newNode
    }

    delete(value) {
        const preNode = this.findPrev(value)
        const curNode = preNode.next
        preNode.next = preNode.next.next
        return curNode
    }
}
//单链表反转
var reverseList = function(head) {
    //时间复杂度O(n),空间复杂度O(1)。
    let prev = null;
    let curr = head;
    while (curr !== null) {
        let cnext = curr.next;
        if (prev === null) {
            curr.next = null;
        } else {
            curr.next = prev;
        }
        prev = curr;
        curr = cnext;
    }
    return prev
};
//两两交换链表中的节点  both O(n)
var swapPairs = function(head) {
    if(head == null || head.next == null){
        return head;
    }
    // 获得第 2 个节点
    let next = head.next;
    // next.next = head.next.next
    // 第1个节点指向第 3 个节点，并从第3个节点开始递归
    head.next = swapPairs(next.next);
    // 第2个节点指向第 1 个节点
    next.next = head;
    // 或者 [head.next,next.next] = [swapPairs(next.next),head]
    return next;
};
//合并两个有序链表
function fn() {
    //双指针法 非递归 时间复杂度：O(a+b)
    var mergeTwoLists = function(l1, l2) {
        var prevHead = new ListNode(-1);
        var prevNode = prevHead;
        while (l1 != null && l2 != null) {
            if(l1.val <= l2.val){
                prevNode.next = l1;
                l1 = l1.next
            }else{
                prevNode.next = l2;
                l2 = l2.next;
            }
            prevNode = prevNode.next;
        }
        prevNode.next = l1 ? l1 :l2;
        return prevHead.next;
    };
    //递归 时间复杂度：O(n)
    var mergeTwoLists = function(l1, l2) {
        if(l1 == null){
            return l2;
        }
        if(l2 == null){
            return l1;
        }
        if(l1.val <= l2.val){
            l1.next = mergeTwoLists(l1.next,l2);
            return l1;
        }else{
            l2.next = mergeTwoLists(l1,l2.next);
            return l2;
        }
    }
}
//二叉树-广度优先遍历-二维数组
function levelOrder(root){
    if(root == null) return [];
    var arr = [root];
    var res = [];
    while (arr.length > 0){
        var len=arr.length
        var now=[];
        while (len>0){
            var node=arr.shift();
            now.push(node.val);
            if(node.left!=null)arr.push(node.left)
            if(node.right!=null)arr.push(node.right)
            len--;
        }
        res.push(now);
    }
    return res;
}
//二叉树-广度优先遍历-一维数组  层序遍历：从上到下，同层节点从左到右。
function levelTraversal(root){
    if ( !root ) return false;//如果头结点为空、返回假
    var result = []; //创建一个数组存放结果
    var tree = []; //创建一个数组存放二叉树
    tree.push(root); //先传入头结点

    // 当tree数组长度不为空
    while( tree.length ){
        var node = tree.shift();    // 将数组第一个结点放到node中
        result.push(node.val); //将node结点的值压入result数组中
        //如果node结点左子树不为空
        if( node.left ){
            tree.push(node.left); // 将node结点的左子树结点的值压入tree数组中
        }

        //如果node结点又子树不为空
        if( node.right ) {
            tree.push(node.right); //将node结点的右子树结点的值压入tree数组中
        }
    }
    return result; //返回result数组
}
//二叉树-深度优先遍历-非递归
function dfs (nodes) {
    let result = [];
    let stack = [];
    stack.push(nodes);
    while(stack.length) { // 等同于 while(stack.length !== 0) 直到栈中的数据为空
        let node = stack.pop(); // 取的是栈中最后一个j
        result.push(node.val);
        if(node.right) stack.push(node.right); // 先压入右子树
        if(node.left) stack.push(node.left); // 后压入左子树
    }
    return result;
}
//二叉树遍历
function fn() {
    //节点结构
    /* function TreeNode(x) {
     this.val = x;
     this.left = null;
     this.right = null;
     } */
    //1、前序遍历 根、左、右；--深度优先遍历 递归
    function DLR(root){
        console.log(root.val);
        if(root.left){
            DLR(root.left);
        }
        if(root.right){
            DLR(root.right);
        }
    }
    //2、中序遍历 左、根、右；
    function LDR(root){
        if(root.left){
            LDR(root.left);
        }
        console.log(root.val);
        if(root.right){
            LDR(root.right);
        }
    }
    //3、后序遍历 左、右、根；
    function LRD(root){
        if(root.left){
            LRD(root.left);
        }
        if(root.right){
            LRD(root.right);
        }
        console.log(root.val);
    }
    //根据二叉树的前序遍历和中序遍历的结果，重建出该二叉树。
    function reConstructBinaryTree(pre, vin){
        var res = null;
        if(pre.length===1){
            res = {
                val: pre[0],
                left: null,
                right: null,
            }
        }else if(pre.length >1){
            var root = pre[0];
            var rootIndex = vin.indexOf(root);  //记录根节点在中序遍历中的位置
            var vinLeft = vin.slice(0,rootIndex);  //分割中序遍历得到左子树
            var vinRight = vin.slice(rootIndex+1,vin.length);  //分割中序遍历得到右子树
            pre.shift();    //去掉pre第一个元素并返回该元素。
            var preLeft = pre.slice(0,vinLeft.length);
            var preRight = pre.slice(vinLeft.length,pre.length);
            res = {
                val: root,
                left: reConstructBinaryTree(preLeft,vinLeft),
                right: reConstructBinaryTree(preRight,vinRight),
            }
        }
        return res;
    }
}
//二叉树z形遍历
var zigzagLevelOrder = function(root) {
    const printArr = []
    if (!root) return printArr
    const list = []
    list.push({ level: 0, node: root })
    while(list.length > 0) {
        const { level, node } = list.shift()
        if (!printArr[level]) {
            printArr[level] = []
        }

        if (level % 2 === 0) {
            printArr[level].push(node.val)
        } else {
            printArr[level].unshift(node.val)
        }

        node.left && list.push({ level: level + 1, node: node.left })
        node.right && list.push({ level: level + 1, node: node.right })
    }

    return printArr
}
//二叉树的深度
var maxDepth = function(root) {
    if(!root) return 0
    let max = 0
    function deepFun(node,d){
        if(!node.left&&!node.right){
            if(max<d+1) max = d+1
        }
        if(node.left) deepFun(node.left,d+1)
        if(node.right) deepFun(node.right,d+1)
    }
    deepFun(root,0)
    return max
};
//判断另一颗树的子结构
function fn() {
    //两树同为 null 则相同；一个 null 一个不是，则不同；
    //两个树都不为 null，则判断左右子树是否相同，这里也用到递归。
    var isSubtree = function (s, t) {
        if (s == null) {
            return false
        }
        if (isSameTree(s, t)) {
            return true
        }
        return isSubtree(s.left, t) || isSubtree(s.right, t)
    };
    //判断相同的树
    function isSameTree(s, t) {
        if (s == null && t == null) return true
        if (s == null || t == null) return false
        return s.val === t.val &&
            isSameTree(s.left, t.left) &&
            isSameTree(s.right, t.right)
    }
    //var isSubtree = (s, t) => (JSON.stringify(s).indexOf(JSON.stringify(t)))>-1?true:false
}
//实现栈
function Stack (){
    let items = []

    this.push = function(element){
        items.push(element)
    }
    this.pop = function(){
        return items.pop()
    }
    this.peek = function(){
        return items[items.length - 1]
    }
    this.isEmpty = function(){
        return items.length === 0
    }
    this.size = function(){
        return items.length
    }
    this.clear = function(){
        items = []
    }
    this.print = function(){
        console.log(items.toString())
    }
}
//栈排序
class SortedStack {
    constructor() {
        this.stack1 = []
        this.stack2 = []
    }
    push(val) {
        if(this.isEmpty()) this.stack1.push(val)
        else{
            while(!this.isEmpty()&&this.peek()<val){
                this.stack2.push(this.pop())
            }
            this.stack1.push(val)
            while(this.stack2.length){
                this.stack1.push(this.stack2.pop())
            }
        }
    }
    pop() {
        return this.isEmpty() ? null : this.stack1.pop()
    }
    peek() {
        return this.isEmpty() ? -1 : this.stack1.slice(-1)[0]
    }
    isEmpty() {
        return this.stack1.length == 0
    }
}
//实现队列
function ArrayQueue(){
    var arr = [];
    //入队操作
    this.push = function(element){
        arr.push(element);
        return true;
    }
    //出队操作
    this.pop = function(){
        return arr.shift();
    }
    //获取队首
    this.getFront = function(){
        return arr[0];
    }
    //获取队尾
    this.getRear = function(){
        return arr[arr.length - 1]
    }
    //清空队列
    this.clear = function(){
        arr = [];
    }
    //获取队长
    this.size = function(){
        return length;
    }
}
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
//回文字符串
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

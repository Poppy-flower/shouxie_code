//diff 两个虚拟DOM， 创建出补丁， 再根据补丁 去更新DOM


/**
 * diff
 */
function diff(oldTree, newTree){
    let patches = {};  //声明变量patches用来存放补丁的对象
    let index = 0;  // 第一次比较的应该是树的第0个索引
    walk(oldTree, newTree, index, patches);  // 递归树，比较后的结果放到补丁里
    return patches;
}

// 辅助函数
/**
 * 1. 每个元素都有一个补丁
 * 2. 新节点没有，标记删除；
 *    两个都是文本节点，且不同，标记文本节点，更新
 *
 *    两个节点相同,
 *     判断属性，计算属性的补丁
 *     判断孩子，计算孩子的补丁
 */
function walk(oldNode, newNode, index, patches){
    let current = [];
    if(!newNode){
        current.push({type: 'REMOVE', index});
    }else if(isString(oldNode) && isString(newNode)){
        if(newNode !==  oldNode){
            current.push({type: 'TEXT', text: newNode});
        }
    }else if(oldNode.type === newNode.type){
        //比较属性是否有更改
        let attr = diffAttr(oldNode.props, newNode.props);
        if(Object.keys(attr).length >0){
            current.push({type: 'ATTR', attr});
        }
        //如果有子节点，diff子节点
        diffChildren(oldNode.children, newNode.children, patches);
    } else{
        current.push({type: 'REPLACE', newNode});
    }
    if(current.length >0){
        patches[index] = current;
    }
    return patches;
}

//辅助函数-判断是字符串
function isString(target){
    return typeof target === 'string';
}

//辅助函数-diff属性
function diffAttr(oldAttrs, newAttrs){

    let patch = {};
    //判断老属性和新属性的关系
    for(let key in oldAttrs){
        if(oldAttrs[key] !== newAttrs[key]){
            patch[key] = newAttrs[key]; //有可能还是undefined
        }
    }

    //判断老属性没有，新属性新增的
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

//都基于一个序号来实现
let num = 0;
//辅助函数-diff children
//@todo 新增的孩子 没法diff出来
function diffChildren(oldChidren, newChildren, patches){
    oldChidren.forEach((child, index) => {
        walk(child, newChildren[index], ++num, patches);
    })
}

export default diff;


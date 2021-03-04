// patch补丁更新
import {Element, render, setAttr} from './element';

let allPatches;
let index = 0;  // 默认那个需要打补丁

function patch(node, patches){
    allPatches = patches;

    walk(node);  //给某个元素打补丁
}

function walk(node){
    let current = allPatches[index++];
    let childNodes = node.childNodes;  //取子节点，依次在遍历子节点

    //先序深度，继续遍历递归子节点
    childNodes.forEach(child => walk(child));

    if(current){  //补丁存在，打上补丁
        doPatch(node, current);
    }
}

function doPatch(node, patches){
    //遍历的补丁
    patches.forEach(patch => {
        switch(patch.type){
            case 'ATTR':
                for(let key in patch.attr){
                    let value = patch.attr[key];
                    if(value){
                        setAttr(node, key, value);
                    }else{
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = patch.newNode;
                newNode = (newNode instanceof Element)? render(newNode): document.createTextNode(newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parent.removeChild(node);
                break;
            default:
                break;

        }
    })
}

export default patch;


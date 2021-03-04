// element.js

// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class Element {
    constructor(type, props, children){
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

//创建虚拟DOM，返回虚拟节点（object）
function createElement(type, props, children){
    return new Element(type, props, children);
}

//render方法 可以将虚拟DOM渲染成真实DOM
/**
 * 1. 根据type 创建DOM
 * 2. 遍历属性对象，设置属性
 * 3. 设置children
 *       如果是虚拟DOM节点，就递归渲染；
 *       如果是文本，就直接插入；
 */
function render(domObj){
    let el = document.createElement(domObj.type);

    for(let key in domObj.props){
        setAttr(el, key, domObj.props[key]);
    }

    domObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        el.appendChild(child);
    });

    return el;
}

//辅助函数-设置属性
/**
 * 区分特殊的 value style
 * 1. key === value时，只特殊处理 input textarea;否则走默认的
 * 2. key === style时，直接写成行内样式
 */
function setAttr(node, key, value){
    switch(key){
        case 'value':
            if(node.tagName.toLowerCase() === 'input' ||
               node.tagName.toLowerCase() === 'textarea') {
                node.value = value;
            }else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

// 将元素插入到页面内
function renderDom(el, target) {
    target.appendChild(el);
    console.log(target);
}

export {
    Element,
    createElement,
    render,
    setAttr,
    renderDom
}

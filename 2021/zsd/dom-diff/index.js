import {createElement, render, renderDom} from "./element";
import diff from './diff';
import patch from './patch';

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])
]);

let virtualDom2 = createElement('ul', {class: 'listhaha'}, [
    createElement('li', {class: 'item active'}, ['周杰伦2']),
    createElement('li', {class: 'item'}, ['林俊杰4']),
    createElement('li', {class: 'item'}, ['王力宏5'])
]);

console.log('virtualDom', virtualDom);

//+++
let el = render(virtualDom);
console.log('el', el);
renderDom(el, document.getElementById('root'));

let patches = diff(virtualDom, virtualDom2);
console.log('patches', patches);

patch(el, patches);

//+++

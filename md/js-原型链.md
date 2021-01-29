<!--
 * @Author: tangdaoyong
 * @Date: 2021-01-29 09:22:42
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-01-29 11:29:30
 * @Description: 原型及原型链
-->
# 原型及原型链

[MDN 原型及原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

![原型链](./imgs/原型链.jpeg)

当你执行：

var o = new Foo();
JavaScript 实际上执行的是：

var o = new Object();
o.__proto__ = Foo.prototype;
Foo.call(o);

原生原型不应该被扩展，除非它是为了与新的 JavaScript 特性兼容。
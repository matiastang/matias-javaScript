<!--
 * @Author: tangdaoyong
 * @Date: 2021-01-29 09:22:42
 * @LastEditors: matiastang
 * @LastEditTime: 2023-07-26 14:25:47
 * @Description: 原型及原型链
-->
# 原型及原型链

[MDN 原型及原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

![原型链](./imgs/原型链.jpeg)

当你执行：
```js
var o = new Foo();
```
`JavaScript` 实际上执行的是：
```js
var o = new Object();
o.__proto__ = Foo.prototype;
Foo.call(o);
```
原生原型不应该被扩展，除非它是为了与新的 `JavaScript` 特性兼容。

## instanceof

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在`某个实例对象`的原型链上。

语法：`object instanceof constructor`
`object`：某个实例对象
`constructor`：某个构造函数
用来检测  `constructor.prototype` 是否存在于参数  `object` 的原型链上。

**备注**：遵循 `ECMAScript` 标准，`someObject.[[Prototype]]` 符号是用于指向 `someObject` 的原型。从 `ECMAScript 6` 开始，`[[Prototype]]` 可以通过 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 访问器来访问。这个等同于 `JavaScript` 的非标准但许多浏览器实现的属性 `__proto__`。

但它不应该与构造函数 `func` 的 `prototype` 属性相混淆。被构造函数创建的实例对象的 `[[Prototype]]` 指向 `func` 的 `prototype` 属性。`Object.prototype` 属性表示 `Object` 的原型对象。
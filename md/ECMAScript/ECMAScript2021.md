<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 09:23:54
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 09:47:27
 * @Description: ECMAScript 2021 新特性
-->
<!-- TOC -->

- [ECMAScript 2021](#ecmascript-2021)
    - [介绍](#介绍)
    - [新特性](#新特性)
        - [String.prototype.replaceAll](#stringprototypereplaceall)
        - [Promise.any](#promiseany)
        - [WeakRef](#weakref)
        - [逻辑赋值运算符](#逻辑赋值运算符)
        - [数字分隔符](#数字分隔符)

<!-- /TOC -->
# ECMAScript 2021

## 介绍

`ECMAScript 2021`简称`ES2021`是 `2021` 年的 `ECMAScript` 版本。

## 新特性

`ES2021` 有如下新特性：

* `String.prototype.replaceAll`
* `Promise.any`
* `WeakRef`
* `逻辑赋值运算符`
* `数字分隔符`

### String.prototype.replaceAll

在 `ES2021` 之前，要替换掉一个字符串中的所有指定字符，我们可以使用正则：
```js
const fruits = '🍎+🍐+🍓+';
const fruitsWithBanana = fruits.replace(/\+/g, '🍌');
console.log(fruitsWithBanana); //🍎🍌🍐🍌🍓🍌
```
**回顾**[String.prototype.replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。**如果pattern是字符串，则仅替换第一个匹配项**。

`ES2021` 则提出了 `replaceAll` 方法，并将其挂载在 `String` 的原型上，可以这么用：
```js
const fruits = '🍎+🍐+🍓+';
const fruitsWithBanana = fruits.replaceAll('+', '🍌');
console.log(fruitsWithBanana); //🍎🍌🍐🍌🍓🍌
```
`replaceAll`相与扩展了`replace`，使其没有**如果pattern是字符串，则仅替换第一个匹配项**的限制，而是替换所有。

### Promise.any

`Promise.any` 方法和 `Promise.race` 类似——只要给定的迭代中的一个 `promise` 成功，就采用第一个 `promise` 的值作为它的返回值，但与 `Promise.race` 的不同之处在于：它会等到所有 `promise` 都失败之后，才返回失败的值：

```js
const myFetch = url => setTimeout(() => fetch(url), Math.floor(Math.random() * 3000));
const promises = [
  myFetch('/endpoint-1'),
  myFetch('/endpoint-2'),
  myFetch('/endpoint-3'),
];
// 使用 .then .catch
Promise.any(promises) // 任何一个 promise 成功。
       .then(console.log) // 比如 ‘3’
       .catch(console.error); // 所有的 promise 都失败了
// 使用 async-await
try {
  const first = await Promise.any(promises); // 任何一个 promise 成功返回。
 console.log(first);
}catch (error) { // 所有的 promise 都失败了
  console.log(error);
}
```

### WeakRef

`WeakRef` 提案主要包含两个新功能：

1. 可以通过 `WeakRef` 类来给某个对象创建一个弱引用
2. 可以通过 `FinalizationRegistry` 类，在某个对象被垃圾回收之后，执行一些自定义方法
上述两个新功能可以同时使用，也可以单独使用，取决于你的需求。

一个 `WeakRef` 对象包含一个对于某个对象的弱引用，被称为 `目标` 或 `引用`。通过弱引用一个对象，可以让该对象在没有其它引用的情况下被垃圾回收机制回收。

`WeakRef` 主要用来 `缓存` 和 `映射` 一些大型对象，当你希望某个对象在不被其它地方引用的情况下及时地被垃圾回收，那么你就可以使用它。
```js
function toogle(element) {
  const weakElement = new WeakRef(element);
  let intervalId = null;

  function toggle() {
    const el = weakElement.deref();
    if (!el) {
       return clearInterval(intervalId);
   }
   const decoration = weakElement.style.textDecoration;
   const style= decoration === 'none' ? 'underline' : 'none';
   decoration = style;
  }
  intervalId = setInterval(toggle, 1000);
}
const element = document.getElementById("link");
toogle(element);
setTimeout(() => element.remove(), 10000);
```
`FinalizationRegistry` 接收一个注册器回调函数，可以利用该注册器为指定对象注册一个事件监听器，当这个对象被垃圾回收之后，会触发监听的事件，具体步骤如下。

首先，创建一个注册器：
```js
const registry = new FinalizationRegistry(heldValue => {
  // ....
});
```
接着注册一个指定对象，同时也可以给注册器回调传递一些参数：
```js
registry.register(theObject, "some value");
```

### 逻辑赋值运算符

逻辑赋值运算符结合了 `逻辑运算符` 和 `赋值表达式`。逻辑赋值运算符有两种：

1. 或等于（||=）
2. 且等于（&&=）
```js
// 或等于
|   a   |   b   | a ||= b | a (运算后) |
| true  | true  |   true  |        true         |
| true  | false |   true  |        true         |
| false | true  |   true  |        true         |
| false | false |   false |        false        |
a ||= b
// 等同于:
a || (a = b);

// 且等于
|   a   |   b   | a &&= b | a (运算后) |
| true  | true  |   true  |        true         |
| true  | false |   false |        false        |
| false | true  |   false |        false        |
| false | false |   false |        false        |
a &&= b
// 等同于:
a && (a = b);
```

### 数字分隔符

通过这个功能，我们利用 `（_，U+005F）` 分隔符来将数字分组，提高数字的可读性：
```js
1_000_000_000           // 十亿
101_475_938.38          // 亿万

const amount = 12345_00;  // 12,345
const amount = 123_4500;  // 123.45 (保留 4 位小数)
const amount = 1_234_500; // 1,234,500

0.000_001 // 百万分之一
1e10_000  // 10^10000

const binary_literals = 0b1010_0001_1000_0101;
const hex_literals = 0xA0_B0_C0;
const bigInt_literals = 1_000_000_000_000n;
const octal_literal = 0o1234_5670;
```
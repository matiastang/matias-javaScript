<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 14:56:01
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 15:02:55
 * @Description: Array
-->
# Array

[MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 介绍

## 使用

### 属性

### 方法

#### Array.from()

`Array.from()` 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
```js
Array.from(arrayLike[, mapFn[, thisArg]])
```
* `arrayLike`
想要转换成数组的伪数组对象或可迭代对象。
* `mapFn` 可选
如果指定了该参数，新数组中的每个元素会执行该回调函数。
* `thisArg` 可选
可选参数，执行回调函数 `mapFn` 时 `this` 对象。
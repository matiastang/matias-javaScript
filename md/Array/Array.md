<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 14:56:01
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-15 11:16:25
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

#### flat

[flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

该`flat()`方法创建一个`新数组`，其中所有子数组元素以递归方式连接到指定深度。

```js
flat(depth)
```
* `depth` 可选的:指定嵌套数组结构应展平的深度的深度级别。默认为 1。

#### some

[some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

该some()方法测试数组中是否至少有一个元素通过了提供的函数实现的测试。如果在数组中找到一个元素，提供的函数为其返回真，则返回真；否则返回false。它不会修改数组。
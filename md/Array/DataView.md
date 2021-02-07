<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 14:25:38
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 14:39:22
 * @Description: DataView
-->
# DataView

[MDN DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## 介绍

`DataView` 视图是一个可以从 二进制`ArrayBuffer` 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的`字节序`问题。

```js
// create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

// Create a couple of views
const view1 = new DataView(buffer);
const view2 = new DataView(buffer, 12, 4); //from byte 12 for the next 4 bytes
view1.setInt8(12, 42); // put 42 in slot 12

console.log(view2.getInt8(0));
// expected output: 42
```

## 使用

```js
new DataView(buffer [, byteOffset [, byteLength]])
```
### 参数

#### buffer

一个 已经存在的`ArrayBuffer` 或 `SharedArrayBuffer` 对象，`DataView` 对象的数据源。

#### byteOffset 可选

此 `DataView` 对象的第一个字节在 `buffer` 中的字节偏移。如果未指定，则默认从第一个字节开始。

#### byteLength 可选

此 `DataView` 对象的字节长度。如果未指定，这个视图的长度将匹配`buffer`的长度。
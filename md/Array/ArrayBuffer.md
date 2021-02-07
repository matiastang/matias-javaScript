<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 14:03:45
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 14:23:53
 * @Description: ArrayBuffer
-->
# ArrayBuffer

[MDN ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

## 介绍

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区。它是一个字节数组，通常在其他语言中称为`byte array`。
你不能直接操作 `ArrayBuffer` 的内容，而是要通过`类型数组对象`或 `DataView` 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

## 使用

```js
new ArrayBuffer(length)
```
**注意**如果 `length` 大于 `Number.MAX_SAFE_INTEGER`（>= `2 ** 53`）或为负数，则抛出一个  `RangeError`  异常。
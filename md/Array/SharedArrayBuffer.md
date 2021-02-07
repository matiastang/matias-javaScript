<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 14:04:09
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 14:15:50
 * @Description: SharedArrayBuffer
-->
# SharedArrayBuffer

[SharedArrayBuffer](https://cloud.tencent.com/developer/section/1192073)

## 介绍

## 使用

## 属性

### byteLength

byteLength访问器属性表示以字节为单位的一个SharedArrayBuffer的长度。
byteLength只可以被读取，不可以被赋值。这个变量会在array创建的时候生成，且无法更改。
```js
var sab = new SharedArrayBuffer(1024);
sab.byteLength; // 1024
```

## SharedArrayBuffer.prototype

### SharedArrayBuffer.prototype.byteLength

数组的大小（以字节为单位）。这是在数组构建时建立的，并且不能被改变。**只读**。

### SharedArrayBuffer.prototype.slice(begin, end)

返回一个新`SharedArrayBuffer`的内容，这个新的内容是这个`SharedArrayBuffer`的一个副本。如果其中之一`begin`或者`end`是负数，则表示从数组末尾开始的索引，而不是从开头开始。

```js
sab.slice()
sab.slice(begin)
sab.slice(begin, end)
```
begin基于零的索引开始提取。可以使用负索引，指示从序列末尾开始的偏移量。
slice(-2)提取序列中的最后两个元素。如果begin未定义，slice则从索引开始0。
end可选的基于零的索引，在此之前结束提取。
slice提取到end但不包括end。例如，slice(1,4)提取第二个元素到第四个元素（索引为1,2和3的元素）。可以使用负索引，指示从序列末尾的偏移。slice(2,-1)如果end省略，则slice通过序列的结尾（sab.byteLength）提取第三个元素。
```js
var sab = new SharedArrayBuffer(1024);
sab.slice();    // SharedArrayBuffer { byteLength: 1024 }
sab.slice(2);   // SharedArrayBuffer { byteLength: 1022 }
sab.slice(-2);  // SharedArrayBuffer { byteLength: 2 }
sab.slice(0, 1); // SharedArrayBuffer { byteLength: 1 }
```
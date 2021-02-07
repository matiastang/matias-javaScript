<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 14:43:09
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 15:03:26
 * @Description: TypedArray
-->
# TypedArray

[MDN TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

## 介绍

`类型化数组（TypedArray）`对象描述了一个底层的`二进制数据缓冲区（binary data buffer）`的一个类数组视图（`view`）。事实上，没有名为 `TypedArray` 的全局属性，也没有一个名为 `TypedArray` 的构造函数。相反，有许多不同的全局属性，它们的值是特定元素类型的类型化数组构造函数，如下所示。在下面的页面中，你会发现一些，与包含任何类型的元素的任意类型化数组一起使用的通用属性和方法。

## 创建

```js
// 下面代码是语法格式，不能直接运行，
// TypedArray 关键字需要替换为底部列出的构造函数。
new TypedArray(); // ES2017中新增
new TypedArray(length);
new TypedArray(typedArray);
new TypedArray(object);
new TypedArray(buffer [, byteOffset [, length]]);

// TypedArray 指的是以下的其中之一：

Int8Array();
Uint8Array();
Uint8ClampedArray();
Int16Array();
Uint16Array();
Int32Array();
Uint32Array();
Float32Array();
Float64Array();
```

### 参数

#### length

当传入 length 参数时，一个内部的数组缓冲区会被创建在内存中，该缓存区的大小（类型化数组中 byteLength 属性的值）是传入的 length 乘以数组中每个元素的字节数（BYTES_PER_ELEMENT），每个元素的值都为0。(译者注：每个元素的字节数是由具体的构造函数决定的，比如 Int16Array() 的每个元素的字节数为 2，Int32Array() 的每个元素的字节数为 4)

#### typedArray

当传入一个任意类型化数组对象作为 typedArray 参数时（比如 Int32Array），typedArray 会被复制到一个新的类型数组中。typedArray 中的每个值在被复制到新的数组之前，会被转化为相应类型的构造函数。新的生成的类型化数组对象将会有跟传入的数组相同的长度（译者注：比如原来的类型化数组的 length==2，那么新生成的数组的 length 也是 2，只是数组中的每一项进行了转化）。

#### object

当传入一个 object 作为参数时，就像通过 TypedArray.from() 方法创建一个新的类型化数组一样。

#### buffer, byteOffset, length

当传入一个 buffer 参数，或者再另外加上可选参数 byteOffset 和 length 时，一个新的类型化数组视图将会被创建，并可用于呈现传入的 ArrayBuffer 实例。byteOffset 和length 参数指定了类型化数组视图将要暴露的内存范围。如果两者都未传入，那么整个buffer 都会被呈现；如果仅仅忽略 length，那么 buffer 中偏移了 byteOffset 后剩下的 buffer 将会被呈现。

## 使用

### 属性

### 方法

#### TypedArray.from()

使用类数组(array-like)或迭代对象创建一个新的类型化数组.参见 `Array.from()`.

#### TypedArray.of()

通过可变数量的参数创建新的类型化数组.参见 `Array.of()`.

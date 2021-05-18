<!--
 * @Descripttion: 
 * @version: 
 * @Author: matias tang
 * @Date: 2020-09-17 17:18:36
 * @LastEditors: matias tang
 * @LastEditTime: 2020-09-17 17:21:12
-->
<!-- TOC -->

- [forEach和map区别](#foreach和map区别)
  - [forEach()](#foreach)
  - [map()](#map)
  - [$.each()](#each)
  - [区别：](#区别)

<!-- /TOC -->
# forEach和map区别

forEach()和map()两个方法都是ECMA5中Array引进的新方法，主要作用是对数组的每个元素执行一次提供的函数。
jQuery也有一个方法$.each(),长得和forEach()有点像，功能也类似。但是从本质上还是有很大的区别。

## forEach()

```js
//forEach
array.forEach(callback(currentValue, index, array){
    //do something
}, this)
 
//或者
array.forEach(callback(currentValue, index, array){
    //do something
})
```

## map()
```js
//map:
var new_array = arr.map(callback[, thisArg])　
```

## $.each()

```js
//$.each()
$(selector).each(function(index,element))  //注意参数的顺序
```

## 区别：

1、forEach()返回值是undefined，不可以链式调用。
2、map()返回一个新数组，原数组不会改变。
3、没有办法终止或者跳出forEach()循环，除非抛出异常，所以想执行一个数组是否满足什么条件，返回布尔值，可以用一般的for循环实现，或者用Array.every()或者Array.some();
4、$.each()方法规定为每个匹配元素规定运行的函数，可以返回 false 可用于及早停止循环。
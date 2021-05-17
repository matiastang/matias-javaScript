<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-17 17:54:43
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-17 18:03:58
 * @Description: 增删class
-->
# 增删class

## 介绍

`增加`和`删除`元素的`class`的方式有如下几种：

1. `DOM`操作
2. `JS`处理
3. `jquery`处理

## `DOM`操作

使用[classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)来增加和删除元素的`class`。

```js
const div = document.createElement('div');
div.className = 'foo';


// 删除
div.classList.remove("foo");
// 添加
div.classList.add("anotherclass");
```

*注意*`classList`属性`IE`暂时不支持。

## `JS`处理

使用`js`获取`class`，然后修改，设置。

```js

// 添加
let classAtr = document.getElementById("id").getAttribute("class");
let newClass = classAtr.concat("  red");// 在原来clas的基础上增加
document.getElementById("id").setAttribute("class", newClass);

// 删除
let classAtr = document.getElementById("id").getAttribute("class");
let newClass = classAtr.replace("red","");
document.getElementById("id").setAttribute("class", newClass);
```

## `jquery`处理

```js
// 添加
$("#id").addClass("red");

// 移除
$("#id").removeClass("red");
```
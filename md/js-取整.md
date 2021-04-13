<!--
 * @Author: tangdaoyong
 * @Date: 2021-04-13 13:40:04
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-13 13:44:00
 * @Description: js取整
-->
# 取整

## 直接取整

### parseInt(number)

这大概是取整最常用的方法了，因为parseInt()不是只能处理Number类型，还可以处理字符串类型的。
parseInt()处理在处理字符串时，会从第一个不是空格的字符开始处理。如果第一个不是数字字符或者负号，则返回NaN；如果是数字字符，则会一直处理到不是数字字符为止。
注意，parseInt()可以识别各种整数格式（十进制，八进制和十六进制）。
```js
var num1 = parseInt("2015nov"),  //2015
    num2 = parseInt(""),  //NaN
    num3 = parseInt("0xA"),  //10(十六进制)
    num4 = parseInt(20.15),  //20
    num5 = parseInt(-20.15),  //-20
    num6 = parseInt("070");  //56(八进制数)
```

### ~~number

所有取整之中最快的，位运算，一如既往的快。
```js
var num1 = ~~20.15,  //20
    num2 = ~~(-20.15);  //-20
```
### number^0

```js
var num1 = 20.15^0,  //20
    num2 = (-20.15)^0;  //-20
```
### number<<0

```js
var num1 = 20.15 << 0,  //20
    num2 = (-20.15) << 0,  //-20
```

## 计算取整

### 四舍五入Math.round(number)
Math.round()是Math对象中的一个函数，将数值四舍五入为最接近的整数。现实中很少有用到负数的四舍五入的，但是我们也可以看几个负数的例子。
```js
var num1 = Math.round(20.1),  //20
    num2 = Math.round(20.5),  //21
    num3 = Math.round(20.9),  //21
    num4 = Math.round(-20.1),  //-20
    num5 = Math.round(-20.5),  //-20 注意这里是-20而不是-21
    num6 = Math.round(-20.9);  //-21
```
### 向上取整Math.ceil(number)
Math.ceil()取向上最接近的整数。
```js
var num1 = Math.ceil(20.1),  //21
    num2 = Math.ceil(20.5),  //21
    num3 = Math.ceil(20.9),  //21
    num4 = Math.ceil(-20.1),  //-20
    num5 = Math.ceil(-20.5),  //-20
    num6 = Math.ceil(-20.9);  //-20
```
### 向下取整Math.floor(number)
Math.floor()`取向下最接近的整数。
```js
var num1 = Math.floor(20.1),  //20
    num2 = Math.floor(20.5),  //20
    num3 = Math.floor(20.9),  //20
    num4 = Math.floor(-20.1),  //-21
    num5 = Math.floor(-20.5),  //-21
    num6 = Math.floor(-20.9),  //-21
```
<!--
 * @Author: tangdaoyong
 * @Date: 2021-01-22 14:49:34
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-01-22 14:51:07
 * @Description: 判断数组
-->
# 判断数组

## 方法一
使用`instanceof`:
```js
[2,3] instanceof Array === true
```
## 方法二
使用`constructor`:
```js
[2,3].constructor === Array
```
## 方法三
使用`prototype`:
```js
Object.prototype.toString.call([2,3]) === "[object Array]"
```
## 方法四
使用`es6`:
```js
Array.isArray([2,3]) === true
```
<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-03 17:21:24
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-03 17:23:20
 * @Description: uniqBy
-->
# uniqBy

[lodash uniqBy](http://lodash.think2011.net/uniqBy)

## 介绍

_.uniqBy(array, [iteratee=_.identity])
这个方法类似 _.uniq，除了它接受一个 iteratee 调用每一个数组和值来计算唯一性。iteratee 会传入一个参数：(value)。

参数
array (Array)
需要处理的数组

[iteratee=_.identity] (Function|Object|string)
这个函数会处理每一个元素

返回值 (Array)
返回不重复的数组

示例
_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]

// 使用了 `_.property` 的回调结果
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```jsx
uniqBy([...selectedList, ...res.data], 'id')// 合并去重
```
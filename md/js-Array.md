<!--
 * @Author: tangdaoyong
 * @Date: 2021-04-13 13:46:02
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-13 13:53:21
 * @Description: Array
-->
# Array

[MDN JS Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 参数

## 方法

## 是否改变原数组

### 改变原数组

#### pop():

删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不 改变数组，并返回 undefined 值。arrayObject.pop() 

#### push():

push() 方法可把它的参数顺序添加到 arrayObject 的尾部。它直接修改 arrayObject，而不是创建一个新的数组，arrayObject.push(newelement1,newelement2,….,newelementX) 

#### reverse():

该方法会改变原来的数组----将原来的数组倒序，而不会创建新的数组。arrayObject.reverse() 

#### shift():

删除数组的第一个元素，并返回第一个元素的值,如果数组是空的，那么 shift() 方法将不进行任何操作.

#### unshift():
unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。arrayObject.unshift(newelement1,newelement2,….,newelementX)返回arrayObject 的新长度

#### sort():
对数组的引用。请注意，数组在原数组上进行排序，不生成副本。arrayObject.sort(sortby) (如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。 
如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下： 
若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。 
若 a 等于 b，则返回 0。 
若 a 大于 b，则返回一个大于 0 的值。) 

#### splice()

splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。 如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组 arrayObject.splice(index,howmany,item1,…..,itemX) 

### 不改变原数组

#### concat()：

用于连接两个或多个数组，仅会返回被连接数组的一个副本，arrayObject.concat(arrayX,arrayX,……,arrayX) 

#### join()

返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来,arrayObject.join(separator) 

#### slice()
arrayObject.slice(start,end)返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

#### filter()
Array.prototype.filter()
将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
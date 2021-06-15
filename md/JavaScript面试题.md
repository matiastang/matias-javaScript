<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-11 14:04:07
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-15 11:23:27
 * @Description: JavaScript题
-->
# JavaScript题

**如果你觉得一个概念很复杂，那么很可能是你理解错了。**

[JavaScript题](https://mp.weixin.qq.com/s/uksNM7creuzY3xLRAklLrQ)

## 事件流

事件流是网页元素接收事件的顺序，"DOM2级事件"规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的事件捕获，为截获事件提供机会。然后是实际的目标接受事件。最后一个阶段是时间冒泡阶段，可以在这个阶段对事件做出响应。虽然捕获阶段在规范中规定不允许响应事件，但是实际上还是会执行，所以有两次机会获取到目标对象。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件冒泡</title>
</head>
<body>
    <div>
        <p id="parEle">我是父元素    <span id="sonEle">我是子元素</span></p>
    </div>
</body>
</html>
<script type="text/javascript">
var sonEle = document.getElementById('sonEle');
var parEle = document.getElementById('parEle');

parEle.addEventListener('click', function () {
    alert('父级 冒泡');
}, false);
parEle.addEventListener('click', function () {
    alert('父级 捕获');
}, true);

sonEle.addEventListener('click', function () {
    alert('子级冒泡');
}, false);
sonEle.addEventListener('click', function () {
    alert('子级捕获');
}, true);

</script>
```
当容器元素及嵌套元素，即在捕获阶段又在冒泡阶段调用事件处理程序时：事件按DOM事件流的顺序执行事件处理程序：
* 父级捕获
// 目标阶段-start
* 子级冒泡
* 子级捕获
// 目标阶段-end
* 父级冒泡
且当事件处于**目标阶段**时，**事件调用顺序决定于绑定事件的书写顺序**，按上面的例子为，先调用冒泡阶段的事件处理程序，再调用捕获阶段的事件处理程序。依次alert出“子集冒泡”，“子集捕获”。

## IE 兼容

attchEvent('on' + type, handler)
detachEvent('on' + type, handler)

## 事件是如何实现的？

基于`发布订阅模式`，就是在浏览器加载的时候会读取事件相关的代码，但是只有实际等到具体的事件触发的时候才会执行。
比如点击按钮，这是个事件（Event），而负责处理事件的代码段通常被称为事件处理程序（Event Handler），也就是「启动对话框的显示」这个动作。
在 Web 端，我们常见的就是 DOM 事件：
* `DOM0 级事件`，直接在 html 元素上绑定 on-event，比如 onclick，取消的话，dom.onclick = null，同一个事件只能有一个处理程序，后面的会覆盖前面的。
* `DOM2 级事件`，通过 addEventListener 注册事件，通过 removeEventListener 来删除事件，一个事件可以有多个事件处理程序，按顺序执行，捕获事件和冒泡事件
* `DOM3级事件`，增加了事件类型，比如 UI 事件，焦点事件，鼠标事件

## 闭包产生的本质

当前环境中存在指向父级作用域的引用
## 闭包是什么？

[JS 中的闭包是什么？](https://zhuanlan.zhihu.com/p/22486908)

维基百科上对闭包的解释就很经典：

`在计算机科学中，闭包（Closure）是词法闭包（Lexical Closure）的简称，是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。所以，有另一种说法认为闭包是由函数和与其相关的引用环境组合而成的实体。`

Peter J. Landin 在1964年讲述语闭包定义为：`一种包含环境成分和控制成分的实体`。

`「函数」`和`「函数内部能访问到的变量」（也叫环境）`的总和，就是一个`闭包`。
`闭包`是指有权访问`另外一个函数作用域中的变量`的`函数`。
由于 `JS `的函数内部可以使用函数外部的变量，所以这段代码正好符合了闭包的定义。而不是 `JS` 故意要使用闭包。

### 闭包的作用

闭包常常用来`「间接访问一个变量」`。换句话说，`「隐藏一个变量」`。

### 手写 bind、apply、call
```js
// call

Function.prototype.call = function (context, ...args) {
  context = context || window;
  
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  
  context[fnSymbol](...args);
  delete context[fnSymbol];
}
// apply

Function.prototype.apply = function (context, argsArr) {
  context = context || window;
  
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  
  context[fnSymbol](...argsArr);
  delete context[fnSymbol];
}
// bind

Function.prototype.bind = function (context, ...args) {
  context = context || window;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  
  return function (..._args) {
    args = args.concat(_args);
    
    context[fnSymbol](...args);
    delete context[fnSymbol];   
  }
}
```

### 创建一个包含当前URL参数的对象

```js
// ES6
const mtGetURLParameters = url => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),{});

const mtGetURLParameters = (url) => {
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => {
        ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a)
    }, {})
}
```
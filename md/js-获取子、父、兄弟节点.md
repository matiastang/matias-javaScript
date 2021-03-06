<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-18 10:29:12
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-18 10:36:36
 * @Description: js-获取子、父、兄弟节点
-->
# js-获取子、父、兄弟节点

《JavaScript操作DOM技巧总结》、《JavaScript页面元素操作技巧总结》、《JavaScript错误与调试技巧总结》、《JavaScript数据结构与算法技巧总结》、《JavaScript遍历算法与技巧总结》及《JavaScript数学运算用法总结》

## js获取子节点的方式

1. 通过获取dom方式直接获取子节点

其中test的父标签id的值，div为标签的名字。getElementsByTagName是一个方法。返回的是一个数组。在访问的时候要按数组的形式访问。
```js
var a = document.getElementById("test").getElementsByTagName("div");
```

2. 通过childNodes获取子节点

使用childNodes获取子节点的时候，childNodes返回的是子节点的集合，是一个数组的格式。他会把换行和空格也当成是节点信息。

```js
var b =document.getElementById("test").childNodes;
```

为了不显示不必须的换行的空格，我们如果要使用childNodes就必须进行必要的过滤。通过正则表达式式取掉不必要的信息。下面是过滤掉

```js
//去掉换行的空格
for(var i=0; i<b.length;i++){
  if(b[i].nodeName == "#text" && !/\s/.test(b.nodeValue)){
    document.getElementById("test").removeChild(b[i]);
  }
}
//打印测试
for(var i=0;i<b.length;i++){
  console.log(i+"---------")
  console.log(b[i]);
}
//补充 document.getElementById("test").childElementCount; 可以直接获取长度 同length
```

4. 通过children来获取子节点

利用children来获取子元素是最方便的，他也会返回出一个数组。对其获取子元素的访问只需按数组的访问形式即可。
```js
var getFirstChild = document.getElementById("test").children[0];
```
5. 获取第一个子节点

firstChild来获取第一个子元素，但是在有些情况下我们打印的时候会显示undefined，这是什么情况呢？？其实firstChild和childNodes是一样的，在浏览器解析的时候会把他当换行和空格一起解析，其实你获取的是第一个子节点，只是这个子节点是一个换行或者是一个空格而已。那么不要忘记和childNodes一样处理呀。
```js
var getFirstChild = document.getElementById("test").firstChild;
```

6. firstElementChild获取第一个子节点

使用firstElementChild来获取第一个子元素的时候，这就没有firstChild的那种情况了。会获取到父元素第一个子元素的节点 这样就能直接显示出来文本信息了。他并不会匹配换行和空格信息。

```js
var getFirstChild = document.getElementById("test").firstElementChild;
```

7. 获取最后一个子节点

lastChild获取最后一个子节点的方式其实和firstChild是类似的。同样的lastElementChild和firstElementChild也是一样的。不再赘余。
```js
var getLastChildA = document.getElementById("test").lastChild;
var getLastChildB = document.getElementById("test").lastElementChild;
```

## js获取父节点的方式

1. parentNode获取父节点

获取的是当前元素的直接父元素。parentNode是w3c的标准。

```js
var p = document.getElementById("test").parentNode;
```

2. parentElement获取父节点

parentElement和parentNode一样，只是parentElement是ie的标准。

```js
var p1 = document.getElementById("test").parentElement;
```

3. offsetParent获取所有父节点

一看offset我们就知道是偏移量 其实这个是与位置有关的上下级 ，直接能够获取到所有父亲节点， 这个对应的值是body下的所有节点信息。
```js
var p2 = document.getElementById("test").offsetParent;
```

## js获取兄弟节点的方式

1. 通过获取父亲节点再获取子节点来获取兄弟节点
```js
var brother1 = document.getElementById("test").parentNode.children[1];
```

2. 获取上一个兄弟节点

在获取前一个兄弟节点的时候可以使用previousSibling和previousElementSibling。他们的区别是previousSibling会匹配字符，包括换行和空格，而不是节点。previousElementSibling则直接匹配节点。

```js
var brother2 = document.getElementById("test").previousElementSibling;
var brother3 = document.getElementById("test").previousSibling;
```

3. 获取下一个兄弟节点

同previousSibling和previousElementSibling，nextSibling和nextElementSibling也是类似的。
```js
var brother4 = document.getElementById("test").nextElementSibling;
var brother5 = document.getElementById("test").nextSibling;
```
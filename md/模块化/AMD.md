<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-18 14:39:58
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-18 16:06:20
 * @Description: AMD
-->
# AMD

`AMD`加载器`RequireJS`

AMD
AMD (Asynchronous Module Definition) 原本是从 CommonJs 规范中分化出来的几个分支之一，但由于种种原因，AMD 规范一直没有被 CommonJS 社区认同。

2011年5月 AMD 从 CommonJS 社区独立出去，单独成立了 [AMD 社区](https://github.com/amdjs/amdjs-api/wiki/AMD)。脱离了 CommonJS 社区的 AMD 规范，后来逐渐演化成了 RequireJS 的附属品，以至于很多人认为AMD是RequireJS的产物。

规范要求
简单地说，ADM的规范为：

AMD规范只定义了一个函数 “define”，它是全局变量。

define(id?, dependencies?, factory);
id
第一个参数，id，是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。

dependencies
第二个参数，dependencies，是个定义中模块所依赖模块的数组。依赖模块必须根据模块的工厂方法优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。

factory
第三个参数，factory，为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次，并且该函数按照依赖声明的顺序，接收依赖作为参数。如果是对象，此对象应该为模块的输出值。
如果工厂方法返回一个值（对象，函数，或任意强制类型转换为true的值），应该为设置为模块的输出值。

AMD规定义了三种特殊的依赖关键字：“require”, “exports” 和 “module”。
AMD中可以使用”require”加载模块。同样也可以选择完全不使用“require”。

更详细的规范内容可以在AMD 社区网站查看。
```js
基本用法
// index.html
<script src="js/require.js"></script>
<script>
  require(['a'], function(f) {
    console.log(f);
  })
</script>
// a.js
define(function() {
  const func1 = function() {
    console.log('I am a.');
  }
  return func1;
})
```
主流的实现
AMD的主流实现有 [require.js](https://github.com/requirejs/requirejs)、[curl.js](https://github.com/cujojs/curl) 等。

## 特点
是一种在线编译（runtime）模块的方案。
AMD 优先照顾浏览器的模块加载场景，使用了异步加载和回调的方式。
使用时需要先在浏览器端注入js脚本加载器，比如require.js。
AMD可以作为CommonJS模块一个中转的版本只要CommonJS没有被用作同步的require调用。使用同步require调用的CommonJS代码可以被转换为使用回调风格的AMD模块加载器。

## 核心实现逻辑
动态创建script脚本插入HTML
利用浏览器的加载能力，异步加载模块
监听每个脚本的load事件
如果依赖的所有脚本都加载完了，执行回调
回调中拿到的依赖模块靠define注入
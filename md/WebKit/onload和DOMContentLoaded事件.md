<!--
 * @Author: tangdaoyong
 * @Date: 2021-04-27 14:33:20
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-27 14:38:52
 * @Description: onload 或者 DOMContentLoaded事件
-->
# onload 或者 DOMContentLoaded事件

网页在加载和被渲染完毕的这一段过程会相继发出`DOMContent`事件和`onload`事件，分别表示`DOM`树构建完毕以及`DOM`树及其所有依赖的资源都加载完毕。一般来说`DOMContent`事件会先于`onload`事件发生。

## DOMContentLoaded事件

DomContentLoad是Dom加载完成后执行，不必等待样式脚本和图片加载
DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片(譬如如果有async加载的脚本就不一定完成)
*注意*这个要IE9以上才兼容
```js
document.addEventListener("DOMConetentLoaded", function() {
    var span = document.querySelector("span");
    console.log(span, "DOMConetentLoaded");
});
```

## onload事件

onLoad是的在页面所有文件加载完成后执行
load事件触发时，页面上所有的DOM，样式表，脚本，图片都已经加载完成了
```js
window.onload = function() {
    var span = document.querySelector("span");
    console.log(span,"onload");
};
```

## 原理：

如果是webkit引擎则轮询document的readyState属性，当值为loaded或者complete时则触发DOMContentLoaded事件，对webkit525之后版本直接可以注册DOMContentLoaded事件
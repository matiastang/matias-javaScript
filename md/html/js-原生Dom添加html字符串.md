<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-05 14:43:37
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-05 14:49:33
 * @Description: js 原生Dom添加字符串
-->
# js 原生Dom添加字符串

[小tip: DOM appendHTML实现及insertAdjacentHTML](https://www.zhangxinxu.com/wordpress/2013/05/js-dom-basic-useful-method/)


`jQuery`  `append()` 方法中可以直接添加字符，如：`$("p").append(" <b>Hello world!</b>");`

怎么用js实现呢：

* appendHTML:
```js
HTMLElement.prototype.appendHTML = function(html) {
    var divTemp = document.createElement("div"), nodes = null
        // 文档片段，一次性append，提高性能
        , fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
       fragment.appendChild(nodes[i].cloneNode(true));
    }
    this.appendChild(fragment);
    // 据说下面这样子世界会更清净
    nodes = null;
    fragment = null;
};
```

* prependHTML:
```js
var prependHTML = function(el, html) {
    var divTemp = document.createElement("div"), nodes = null
        , fragment = document.createDocumentFragment();

    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
       fragment.appendChild(nodes[i].cloneNode(true));
    }
    // 插入到容器的前面 - 差异所在
    el.insertBefore(fragment, el.firstChild);
    // 内存回收？
    nodes = null;
    fragment = null;
};
```

对于`DOM`节点插入，大家应该都熟知“文档片段优化法”。具体来讲，就是使用`document.createDocumentFragment()`创建一个文档片段，然后，把节点一个一个`append`到这个片段中，回到页面上的时候，直接`append`这个文档片段就可以了-只有一次。
<!--
 * @Author: matiastang
 * @Date: 2022-07-21 16:41:40
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-21 16:47:31
 * @FilePath: /matias-javaScript/md/WebKit/影子(Shadow)DOM.md
 * @Description: 
-->
# 影子（Shadow）DOM
影子DOM主要解决了一个HTML文档中可能需要大量交互的多个DOM建立和维护各自功能边界的问题。影子DOM 为Web组件中的DOM和CSS提供了封装，使得这些东西与主文档的DOM保持分离，也可以在一个Web组件外部使用影子DOM本身。

1. 什么是Shadow DOM
想象一下网页的基础库开发者想要开发这样一个用户界面的控件：

这个控件可能由一些HTML元素组成，
这些元素可以组成一颗DOM树的子树，
这个控件可以被到处使用。
问题随之而来，每个使用控件的地方都会知道这个子树的结构。当网页的开发者需要访问网页DOM的时候，这些控件内部的DOM子树就会暴露出来，这些控件内部的节点不仅可能会给DOM的遍历带来麻烦，而且也可能因为无意中被CSS选中而改变样式。


于是W3C提出了Shadow DOM，它可以使得一些DOM节点在特定的范围内可见，而在网页的DOM树中却不可见。这使得封装组件变得容易很多。当使用JavaScript代码访问HTML文档的DOM树的时候，普通的接口是不能直接访问到Shadow DOM中的节点的，JavaScript需要特殊的接口才能访问。具体可以看一下

HTML5中有很多新特性，例如视频音频，我们会发现这些元素都会比较复杂，但是在DOM树中就只会看见audio和video标签，这其实就是使用了Shadow DOM的思想。


既然Shadow DOM在整个网页DOM树中不可见，那么事件如何处理呢？事件中需要包含事件目标，这个目标当然不能是不可见的节点，所以事件目标其实就是包含Shadow DOM子树的节点对象。事件捕获的逻辑没有变化，在Shadow DOM子树内也会继续传递。当Shadow DOM子树中事件向上冒泡的时候，Webkit会同时向整个文档的DOM上传递该事件，以避免一些奇怪的行为。
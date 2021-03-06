<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-18 14:24:00
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-18 14:25:02
 * @Description: 模块化历史
-->
# 模块化历史

前言
前端模块化已经不是什么新鲜概念了，这年头提到前端开发，模块化、组件化开发谁不是张口就来，但是你真的彻底了解前端模块化吗？我想有一大部分人可能未必。如果你就是其中之一，那么我这篇文章可能对你有帮助。

一、什么是模块化？
模块化是指解决一个复杂问题时自顶向下逐层把整体划分成若干组成部分的过程。模块化是一种管理方式，是一种生产方式，一种解决问题的方案。

放在开发场景中，模块化就是有组织地把一个大文件拆成独立并互相依赖的多个小文件。在这里模块化是一种代码管理方式。

二、什么是模块？
模块就是完成特定功能的单元。

模块具有以下几个基本属性：功能、接口、状态、逻辑。功能、接口与状态反映模块的外部特性，逻辑反映它的内部特性。

在开发场景中，一个模块就是实现特定功能的文件。

三、模块化的目的
模块化的目的在于最大化的设计重用，以最少的模块、零部件，更快速的满足更多的个性化需求。

四、什么是模块化开发？
模块化开发是一种开发思想。简单的说就是程序的编写不是开始就着手实现功能细节，而是首先用主程序、子程序、子过程把软件的主要结构和流程描述出来，并定义和调试好各个框架之间的输入、输出连接关系。逐步求解的结果是得到一系列以功能块为单位的算法描述。

以功能块为单位进行程序设计、实现其求解算法的过程称为模块化开发。

五、前端模块化的历程
前面说了，模块化开发是一种思想，要实现这种思想，需要语言的支持，或者当语言支持的脚步赶不上我们的需求的时候，我们可以自定义一个模块化规范，然后再实现一个预编译器（或者浏览器端的加载器），将模块化代码转换成语言能识别的语法，这样我们就可以使用模块化的方式开发了。

1. 一开始没有模块化概念
JavaScript当时被设计出来只是用来实现一些简单的交互，所以JavaScript一开始并没有模块化的概念。

2. 冲突和依赖管理问题需要被解决，自执行函数的模式已不够用
在Ajax被提出，前端拥有向后端异步请求数据的能力后，前端逻辑越来越复杂，代码越来越庞大，网页也越来越像桌面APP。为了维护的方便，我们不停地把不同功能的js抽取出来作为独立的js文件。然而当项目变得复杂，一个HTML页面可能需要加载十几甚至几十个js文件时，全局变量污染、函数名冲突，依赖关系不好处理等问题随之而来。

不像Java，可以把不同功能的文件放在不同的package中，需要某个函数或功能的时候只需import相关的包而无需担心变量冲突等问题。当时，变量污染和冲突问题我们可以利用JavaScript的函数作用域特性，用自执行函数来解决（比如JQuery的做法）。但是依赖关系问题依然没有很好的解决：js文件的加载靠的是浏览器的加载能力，默认是阻塞式的加载，async 异步加载顺序没有保证，defer 异步加载虽然可以保证加载顺序，但是依赖的维护仍全靠手动很不灵活。

3. 社区涌现第三方模块化规范
为此 JavaScript 社区做了很多努力，2009年，Rayn Dahl 在他创造的 node.js 项目中使用了 CommonJS 模块规范，从此 JavaScript 模块化开发正式拉开序幕。并且带来了npm生态，以及一大批前端构建工具grunt、gulp、browserify，webpack等等。随后，社区又出现了 AMD、CMD 等优秀的模块化规范，以及requirejs、curljs 和 seajs等前端模块加载器。

4. ES6模块化规范
2016年，ES6的出现，JavaScript语言终于有了原生模块（module）体系。这意味着，不使用第三方模块化规范也可以用模块化方式进行开发了。

篇幅原因，CommonJS、AMD、CMD、ESmodule 的详细分析将另起篇幅来写。
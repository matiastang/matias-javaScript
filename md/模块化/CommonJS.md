<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-18 14:39:34
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-18 15:43:09
 * @Description: CommonJS
-->
# CommonJS

在ES6没有出来之前，Javascript 自身是不支持模块化开发的，不过得益于社区的努力，我们仍然可以享受模块化开发的体验，只是在进行模块化开发时需要遵循特定的模块化规范。

一、什么是模块化规范
模块化规范，也就是模块定义规范（Module Definition Specification），是对模块代码书写格式和交互(模块间的互相引用)规则的详细描述。

我们熟知的 CommonJS、AMD、CMD 就是三个比较主流的第三方（即来自社区的）模块化规范。ES6中的模块化是ECMA标准，目前只有部分高版本的浏览器实现了ESmodule的支持，但是这是未来的模块化趋势。

CommonJs
CommonJs 原来叫做 ServerJS，是 Mozilla 的工程师在2009年发起的一个项目。这个项目的目的是让浏览器端之外（比如服务器端或者桌面端）使用 JavaScript 语言开发的项目能够通过模块化的方式来开发和协作。

当 ServerJS 推出的 [Modules 1.0 规范](http://wiki.commonjs.org/wiki/Modules/1.0) 在 Node.js 等环境下取得了很不错的实践后，Mozilla 的工程师们想把 ServerJS 的成功经验进一步推广到浏览器端，于是在2009年下半年，社区改名为 CommonJs。

规范要求
简单地说，CommonJs规定：

一个模块就是一个文件
每个模块内有两个变量可以使用：require 和 module
通过require加载模块
通过module.exports或者exports导出模块（为了方便，Node.js 在实现 CommonJS 规范时，为每个模块提供一个 exports 的私有变量，指向 module.exports）
具体详细的规范内容可以在官方网站查看：

CommonJS 社区规范： [Modules 1.1.1](http://wiki.commonjs.org/wiki/Modules/1.1.1)
NodeJS 的模块规范： [Modules](https://nodejs.org/api/modules.html)
使用示例
// m1.js
var m = require('./m2');
p.say('hi');
// m2.js
function _say(str) {
  console.log(str);
}
exports.say = _say; // 或者 module.exports = {say: _say}
主流的实现
CommonJs的主流实现有 node.js、webpack、babel 等。

## 特点

* 在 Node.js 中模块加载的方式是同步的，因为在服务器端所有文件都存储在本地的硬盘上，传输速率快而且稳定。
* CommonJS 模块输出的值，对于基本数据类型，是复制，对于复杂数据类型，是浅拷贝。
* CommonJS 模块输出的是值的缓存，不存在动态更新，当使用require命令加载某个模块时，就会运行整个模块的代码,然后在内存生成一个对象。Require 命令加载同一个模块，不会再执行，而是取缓存之中的值。即，commonjs模块无论加载多少次，都只会在第一次加载的时候运行一次，以后再加载，就返回第一次运行的结果。除非手动清除系统缓存。
* Requirejs循环加载时候，属于加载时执行。即脚本在require的时候，就会全部执行。一旦出现某个模块
被循环加载，就只输出已经执行的部分，还未执行的部分不会输出。
* Require是动态加载，这意味着require语句可写在任何位置，同时也意味着commonjs模块只能在运行时才能确定模块的依赖关系。

## 核心实现逻辑
解析模块路径
同步从本地读取模块文件内容，得到文本字符串
将字符串包裹成自执行函数的前半部分
使用vm沙箱将字符串转换成函数（vm是node.js的虚拟沙箱模块，vm.runInThisContext方法可以接受一个字符串，并将它转换成一个函数返回）
执行函数（将关键变量传入进去：exports、require、module、__filename、__dirname）
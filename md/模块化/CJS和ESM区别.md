<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-18 14:41:03
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-18 14:42:46
 * @Description: CJS和ESM区别
-->
# ESM&CJS

[ES6 模块与 CommonJS 模块的差异](https://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)

## Node.js 的模块加载方法

JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS。

CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。语法上面，两者最明显的差异是，CommonJS 模块使用require()和module.exports，ES6 模块使用import和export。

它们采用不同的加载方案。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。

如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。
```
{
   "type": "module"
}
```
一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。
```
# 解释成 ES6 模块
$ node my-app.js
```
如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。

总结为一句话：`.mjs`文件总是以 `ES6` 模块加载，`.cjs`文件总是以 `CommonJS` 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。

注意，ES6 模块与 CommonJS 模块尽量不要混用。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。

## CJS

`CJS` 采用的是动态同步加载，也就是说运行的时候确定加载的文件，很明显这样做有一个好处就是灵活，但是缺点就是无法很好的处理循环引用的问题。而且是同步加载，这会导致加载速度过慢。

## ESM

`ESM` 采用的是静态异步加载，最大的区别便是采用了静态分析。大家都知道 `import` 必须要写在文件的顶层，这也就是为了能够静态分析你需要加载的模块。首先他能很好的解决循环依赖的问题。
其次是异步加载。在 `CJS` 中，`JS` 的加载是同步进行的，也就是说我必须要等待上一个 `JS` 加载完成，才能够加载下一个 `JS`，大家也懂得，这样很明显浪费了 `Node` 异步的有点。这也就会导致如果 `JS` 文件过多，系统的启动时间会被大大加长。
```
import {firstName, lastName, year} from './main.js';
import 'lodash'；
import {default as foo} from 'modules';
import * as circle form './circle';  //引入circle文件内所有的方法，集成在circle下面
//export default 默认输出
var a = 1;
export default a;
import _ from 'lodash'; //因为lodash默认输出的是_
import _,{each, forEach } from 'lodash';  //可以同时输入默认方法和其他接口
import React, { Component } from 'react'; //说明react中默认输出方法是React，里面包含Component类的接口输出。
```

### ESM原理
模块开发时，其实是构建依赖关系图的过程，模块之间的依赖通过import导入语句找到其所依赖的其他代码文件，依赖关系会指定一个入口文件。
![ESM1](./images/ESM1.webp)
但是浏览器并不能直接使用这些代码，需要进行解析所有文件，并把它们变成一种模块记录（Module Record）的数据结构，解析后再变成模块实例，模块实例会包含代码+状态，其实就是指令+变量值的结合。
对于模块而言，真正需要的是模块实例。
模块加载从入口文件开始，最终生成完整的模块实例关系图。过程包含：
1，构建：查找，下载，然后把所有文件解析成module record。
2，实例化：为模块分配内存空间，依照导入，导出语句把模块指向对应内存地址。
3，运行：把内存空间填充为真实值。
![ESM2](./images/ESM2.webp)
ESM规范是异步的，上面三个阶段可以独立进行。
webpack打包原理就是将模块化代码怎么在客户端浏览器进行运行的过程。

### AMD相对于CMD是一次性加载所有。
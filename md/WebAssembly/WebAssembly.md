<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 11:57:42
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 11:57:57
 * @Description: WebAssembly
-->
# WebAssembly

[MDN WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)

## 介绍

WebAssembly是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如C / C ++等语言提供一个编译目标，以便它们可以在Web上运行。它也被设计为可以与JavaScript共存，允许两者一起工作。

对于网络平台而言，WebAssembly具有巨大的意义——它提供了一条途径，以使得以各种语言编写的代码都可以以接近原生的速度在Web中运行。在这种情况下，以前无法以此方式运行的客户端软件都将可以运行在Web中。

WebAssembly被设计为可以和JavaScript一起协同工作——通过使用WebAssembly的JavaScript API，你可以把WebAssembly模块加载到一个JavaScript应用中并且在两者之间共享功能。这允许你在同一个应用中利用WebAssembly的性能和威力以及JavaScript的表达力和灵活性，即使你可能并不知道如何编写WebAssembly代码。
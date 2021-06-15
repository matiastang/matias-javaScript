<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-15 10:49:02
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-15 10:53:49
 * @Description: 事件循环机制 （Event Loop）
-->
# 事件循环机制 （Event Loop）

`事件循环机制`从整体上告诉了我们 `JavaScript` 代码的执行顺序 `Event Loop` 即事件循环，是指`浏览器`或`Node`的一种解决`javaScript`单线程运行时`不会阻塞`的一种机制，也就是我们经常使用`异步`的原理。
先执行同步代码(栈中的代码)，然后执行`微任务队列`，最后执行`宏任务队列`，然后开始下一轮事件循环(每完成一个`宏任务`都会去检查`微任务队列`)，继续先执行`微任务队列`，再执行`宏任务队列`。

* 宏任务：script/setTimeout/setInterval/setImmediate/ I/O / UI Rendering
* 微任务：process.nextTick()/Promise

上诉的 `setTimeout` 和 `setInterval` 等都是宏任务源，真正进入任务队列的是他们分发的任务。
优先级

setTimeout = setInterval 一个队列
setTimeout > setImmediate
process.nextTick > Promise
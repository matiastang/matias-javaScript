<!--
 * @Author: matiastang
 * @Date: 2022-07-18 10:30:01
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-18 10:35:11
 * @FilePath: /matias-javaScript/md/js宏微任务.md
 * @Description: 
-->
## 概念

1. 宏任务`宿主（浏览器、Node）发起的任务`：当前调用栈中执行的代码成为宏任务。（主代码快，定时器等等）。 
2. 微任务`JS引擎发起的任务`： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务,可以理解为回调事件。（promise.then，proness.nextTick等等）。 
3. 宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。

## 运行机制

1. 在执行栈中执行一个宏任务。 
2. 执行过程中遇到微任务，将微任务添加到微任务队列中。
3. 当前宏任务执行完毕，立即执行微任务队列中的任务。 
4. 当前微任务队列中的任务执行完毕，检查渲染，GUI线程接管渲染。 
5. 渲染完毕后，js线程接管，开启下一次事件循环，执行下一次宏任务（事件队列中取）。

微任务：`process.nextTick`、`MutationObserver`、`Promise.then catch finally`

宏任务：`I/O`、`setTimeout`、`setInterval`、`setImmediate`、`requestAnimationFrame`

js执行顺序，（先执行宏任务列，微任务队列）
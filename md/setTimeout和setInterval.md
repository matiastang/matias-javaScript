<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-01 09:42:25
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-01 09:49:53
 * @Description: setTimeout和setInterval
-->
# setTimeout和setInterval

## 介绍

定时器指定的时间间隔，表示的是何时将定时器的代码添加到消息队列，而不是何时执行代码。所以真正何时执行代码的时间是不能保证的，取决于何时被主线程的事件循环取到，并执行。
`setTimeout`和`setInterval`都是`宏任务`。

## setTimeout

## setInterval

## setTimeout和setInterval的区别

每个 `setTimeout` 产生的任务会直接 `push` 到任务队列中；而 `setInterval` 在每次把任务 `push` 到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)。

## 用 setTimeout 模拟 setInterval

[为什么用 setTimeout 模拟 setInterval ？](https://mp.weixin.qq.com/s/xQUCJ7r9HkBx6TogJ4yfsw)

1.写一个 interval 方法
```js
let timer = null
interval(func, wait){
    let interv = function(){
        func.call(null);
        timer=setTimeout(interv, wait);
    };
    timer= setTimeout(interv, wait);
}
```
2.和 setInterval() 一样使用它
```js
interval(function() {}, 20);
```
3.终止定时器
```js
if (timer) {
  window.clearSetTimeout(timer);
  timer = null;
}
```
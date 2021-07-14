<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-28 11:47:03
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-07-07 23:46:58
 * @Description: requestIdleCallback
-->
# requestIdleCallback

[requestIdleCallback MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
[【重要】requestIdleCallback](https://zhuanlan.zhihu.com/p/60189423)
[requestIdleCallback polyful](https://link.zhihu.com/?target=https%3A//github.com/facebook/react/blob/master/packages/scheduler/src/forks/SchedulerHostConfig.default.js)
[【非常重要】requestIdleCallback和requestAnimationFrame详解](https://www.jianshu.com/p/2771cb695c81?tt_from=weixin)

## requestIdleCallback

React 调度算法 与 requestIdleCallback 这个 api 息息相关。requestIdleCallback 的作用是是在浏览器一帧的剩余空闲时间内执行优先度相对较低的任务, 其用法如下:
```js
var tasksNum = 10000

requestIdleCallback(unImportWork)

function unImportWork(deadline) {
  while (deadline.timeRemaining() && tasksNum > 0) {
    console.log(`执行了${10000 - tasksNum + 1}个任务`)
    tasksNum--
  }

  if (tasksNum > 0) { // 在未来的帧中继续执行
    requestIdleCallback(unImportWork)
  }
}
```
deadline 有两个参数

timeRemaining(): 当前帧还剩下多少时间
didTimeout: 是否超时
另外 requestIdleCallback 后如果跟上第二个参数 {timeout: ...} 则会强制浏览器在当前帧执行完后执行。

## requestIdleCallback 的缺陷
requestIdleCallback is called only 20 times per second - Chrome on my 6x2 core Linux machine, it's not really useful for UI work。—— from Releasing Suspense
也就是说 requestIdleCallback 的 FPS 只有 20, 这远远低于页面流畅度的要求！(一般 FPS 为 60 时对用户来说是感觉流程的, 即一帧时间为 16.7 ms), 这也是 React 需要自己实现 requestIdleCallback 的原因。

## requestHostCallback

requestHostCallback(也就是 requestIdleCallback) 这部分源码的实现比较复杂, 可以将其分解为以下几个重要的步骤(有一些细节点可以看注释):

步骤一: 如果有优先级更高的任务, 则通过 postMessage 触发步骤四, 否则如果 requestAnimationFrame 在当前帧没有安排任务, 则开始一个帧的流程;

步骤二: 在一个帧的流程中调用 requestAnimationFrameWithTimeout 函数, 该函数调用了 requestAnimationFrame, 并对执行时间超过 100ms 的任务用 setTimeout 放到下一个事件队列中处理;

步骤三: 执行 requestAnimationFrame 中的回调函数 animationTick, 在该回调函数中得到当前帧的截止时间 frameDeadline, 并通过 postMessage 触发步骤四;

步骤四: 通过 onmessage 接受 postMessage 指令, 触发消息事件的执行。在 onmessage 函数中根据 frameDeadline - currentTime <= 0 判断任务是否可以在当前帧执行，如果可以的话执行该任务, 否则进入下一帧的调用。
```js
export let requestHostCallback;
export let cancelHostCallback;
export let shouldYieldToHost;
export let getCurrentTime;

const ANIMATION_FRAME_TIMEOUT = 100;
let rAFID;
let rAFTimeoutID;
// ② 调用 requestAnimationFrame, 并对执行时间超过 100 ms 的任务用 setTimeout 进行处理
const requestAnimationFrameWithTimeout = function (callback) {
  rAFID = requestAnimationFrame(function (timestamp) {
    clearTimeout(rAFTimeoutID);
    callback(timestamp); // 一帧中任务调用的核心流程的实现, 接着看第 ③ 步
  });
  // 如果在一帧中某个任务执行时间超过 100 ms 则终止该帧的执行并将该任务放入下一个事件队列中
  rAFTimeoutID = setTimeout(function () {
    cancelAnimationFrame(rAFID);
    callback(getCurrentTime());
  }, ANIMATION_FRAME_TIMEOUT);
};

getCurrentTime = function () {
  return performance.now();
};

let scheduledHostCallback = null; // 调度器回调函数
let isMessageEventScheduled = false; // 消息事件是否执行
let timeoutTime = -1;

let isAnimationFrameScheduled = false;

let isFlushingHostCallback = false;

let frameDeadline = 0; // 当前帧的截止时间

// 假设最开始的 FPS(feet per seconds) 为 30, 但这个值会随着动画帧调用的频率而动态变化
let previousFrameTime = 33; // 一帧的时间: 1000 / 30 ≈ 33
let activeFrameTime = 33;

shouldYieldToHost = function () {
  return frameDeadline <= getCurrentTime();
};

const channel = new MessageChannel();
const port = channel.port2;
// ④ 接受 `postMessage` 指令, 触发消息事件的执行。在其中判断任务是否在当前帧执行，如果在的话执行该任务
channel.port1.onmessage = function (event) {
  isMessageEventScheduled = false;

  const prevScheduledCallback = scheduledHostCallback;
  const prevTimeoutTime = timeoutTime;
  scheduledHostCallback = null;
  timeoutTime = -1;

  const currentTime = getCurrentTime();

  let didTimeout = false; // 是否超时
  // 如果当前帧已经没有时间剩余, 检查是否有 timeout 参数，如果有的话是否已经超过这个时间
  if (frameDeadline - currentTime <= 0) {
    if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
      // didTimeout 为 true 后, 在当前帧中执行(针对优先级较高的任务)
      didTimeout = true;
    } else {
      // 在下一帧中执行
      if (!isAnimationFrameScheduled) {
        isAnimationFrameScheduled = true;
        requestAnimationFrameWithTimeout(animationTick);
      }
      scheduledHostCallback = prevScheduledCallback;
      timeoutTime = prevTimeoutTime;
      return;
    }
  }

  if (prevScheduledCallback !== null) {
    isFlushingHostCallback = true;
    try {
      prevScheduledCallback(didTimeout);
    } finally {
      isFlushingHostCallback = false;
    }
  }
};

// ③ requestAnimationFrame 的回调函数。传入的 rafTime 为执行该帧的时间戳。
const animationTick = function (rafTime) {
  // 如果存在调度器回调函数则在一帧的开头急切地安排下一帧的动画回调(急切是因为如果在帧的后半段安排动画回调的话, 就会增大下一帧超过 100ms 的几率, 从而会浪费一个帧的利用, 可以结合步骤②来理解这句话), 如果不存在调度器回调函数否则立马终止执行。
  if (scheduledHostCallback !== null) {
    requestAnimationFrameWithTimeout(animationTick);
  } else {
    isAnimationFrameScheduled = false;
    return;
  }

  let nextFrameTime = rafTime - frameDeadline + activeFrameTime; // 当前帧开始调用动画的时间 - 上一帧调用动画的截止时间 + 当前帧执行的时间，这里的 nextFrameTime 仅仅是临时变量
  // 如果连续两帧的时间都小于当前帧的时间, 则说明得调高 FPS
  if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
    // 将 activeFrameTime 的值减小相当于调高 FPS。同时取 nextFrameTime 与 previousFrameTime 中较大的一个以让前后两帧都不出问题。
    activeFrameTime =
      nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
  } else {
    previousFrameTime = nextFrameTime;
  }
  frameDeadline = rafTime + activeFrameTime; // 当前帧的截止时间(上面几行代码的目的是得到该 frameDeadline 值, 该值在 postMessage 会用来判断)
  if (!isMessageEventScheduled) {
    isMessageEventScheduled = true;
    port.postMessage(undefined); // 最后进入第④步, 通过 postMessage 触发消息事件。
  }
};

// DOM 环境下 requestIdleCallback 的实现, 这里第二个参数在最新的 requestIdleCallback 中因为对象类型
requestHostCallback = function (callback, absoluteTimeout) {
  scheduledHostCallback = callback; // 这里的 callback 为调度器回调函数
  timeoutTime = absoluteTimeout;
  if (isFlushingHostCallback || absoluteTimeout < 0) {
    // 针对优先级较高的任务不等下一个帧，在当前帧通过 postMessage 尽快执行
    port.postMessage(undefined);
  } else if (!isAnimationFrameScheduled) {
    // ① 如果 rAF 在当前帧没有安排任务, 则开始一个帧的流程
    isAnimationFrameScheduled = true;
    requestAnimationFrameWithTimeout(animationTick);
  }
};

cancelHostCallback = function () {
  scheduledHostCallback = null;
  isMessageEventScheduled = false;
  timeoutTime = -1;
};
```

页面流畅与 FPS
页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到 60 时，页面是流畅的，小于这个值时，用户会感觉到卡顿。

1s 60帧，所以每一帧分到的时间是 1000/60 ≈ 16 ms。所以我们书写代码时力求不让一帧的工作量超过 16ms。

Frame
那么浏览器每一帧都需要完成哪些工作？

![frame](./imgs/frame.webp)

通过上图可看到，一帧内需要完成如下六个步骤的任务：

处理用户的交互
JS 解析执行
帧开始。窗口尺寸变更，页面滚去等的处理
requestAnimationFrame(rAF)
布局
绘制
requestIdleCallback
上面六个步骤完成后没超过 16 ms，说明时间有富余，此时就会执行 requestIdleCallback 里注册的任务。

image
从上图也可看出，和 requestAnimationFrame 每一帧必定会执行不同，requestIdleCallback 是捡浏览器空闲来执行任务。

如此一来，假如浏览器一直处于非常忙碌的状态，requestIdleCallback 注册的任务有可能永远不会执行。此时可通过设置 timeout （见下面 API 介绍）来保证执行。

API
var handle = window.requestIdleCallback(callback[, options])
callback：回调，即空闲时需要执行的任务，该回调函数接收一个IdleDeadline对象作为入参。其中IdleDeadline对象包含：
didTimeout，布尔值，表示任务是否超时，结合 timeRemaining 使用。
timeRemaining()，表示当前帧剩余的时间，也可理解为留给任务的时间还有多少。
options：目前 options 只有一个参数
timeout。表示超过这个时间后，如果任务还没执行，则强制执行，不必等待空闲。
IdleDeadline对象参考MDN:https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline

示例
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });
​
// 任务队列
const tasks = [
 () => {
   console.log("第一个任务");
 },
 () => {
   console.log("第二个任务");
 },
 () => {
   console.log("第三个任务");
 },
];
​
function myNonEssentialWork (deadline) {
 // 如果帧内有富余的时间，或者超时
 while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
   work();
 }
​
 if (tasks.length > 0)
   requestIdleCallback(myNonEssentialWork);
 }
​
function work () {
 tasks.shift()();
 console.log('执行任务');
}
超时的情况，其实就是浏览器很忙，没有空闲时间，此时会等待指定的 timeout 那么久再执行，通过入参 dealine 拿到的 didTmieout 会为 true，同时 timeRemaining () 返回的也是 0。超时的情况下如果选择继续执行的话，肯定会出现卡顿的，因为必然会将一帧的时间拉长。

cancelIdleCallback
与 setTimeout 类似，返回一个唯一 id，可通过 cancelIdleCallback 来取消任务。

总结
一些低优先级的任务可使用 requestIdleCallback 等浏览器不忙的时候来执行，同时因为时间有限，它所执行的任务应该尽量是能够量化，细分的微任务（micro task）。

因为它发生在一帧的最后，此时页面布局已经完成，所以不建议在 requestIdleCallback 里再操作 DOM，这样会导致页面再次重绘。DOM 操作建议在 rAF 中进行。同时，操作 DOM 所需要的耗时是不确定的，因为会导致重新计算布局和视图的绘制，所以这类操作不具备可预测性。

Promise 也不建议在这里面进行，因为 Promise 的回调属性 Event loop 中优先级较高的一种微任务，会在 requestIdleCallback 结束时立即执行，不管此时是否还有富余的时间，这样有很大可能会让一帧超过 16 ms。

额外补充一下window.requestAnimationFrame
在没有 requestAnimationFrame 方法的时候，执行动画，我们可能使用 setTimeout 或 setInterval 来触发视觉变化；但是这种做法的问题是：回调函数执行的时间是不固定的，可能刚好就在末尾，或者直接就不执行了，经常会引起丢帧而导致页面卡顿。

image
归根到底发生上面这个问题的原因在于时机，也就是浏览器要知道何时对回调函数进行响应。setTimeout 或 setInterval 是使用定时器来触发回调函数的，而定时器并无法保证能够准确无误的执行，有许多因素会影响它的运行时机，比如说：当有同步代码执行时，会先等同步代码执行完毕，异步队列中没有其他任务，才会轮到自己执行。并且，我们知道每一次重新渲染的最佳时间大约是 16.6 ms，如果定时器的时间间隔过短，就会造成 过度渲染，增加开销；过长又会延迟渲染，使动画不流畅。

requestAnimationFrame 方法不同与 setTimeout 或 setInterval，它是由系统来决定回调函数的执行时机的，会请求浏览器在下一次重新渲染之前执行回调函数。无论设备的刷新率是多少，requestAnimationFrame 的时间间隔都会紧跟屏幕刷新一次所需要的时间；例如某一设备的刷新率是 75 Hz，那这时的时间间隔就是 13.3 ms（1 秒 / 75 次）。需要注意的是这个方法虽然能够保证回调函数在每一帧内只渲染一次，但是如果这一帧有太多任务执行，还是会造成卡顿的；因此它只能保证重新渲染的时间间隔最短是屏幕的刷新时间。

requestAnimationFrame 方法的具体说明可以看 MDN 的相关文档，下面通过一个网页动画的示例来了解一下如何使用。

let offsetTop = 0;
const div = document.querySelector(".div");
const run = () => {
 div.style.transform = `translate3d(0, ${offsetTop += 10}px, 0)`;
 window.requestAnimationFrame(run);
};
run();
如果想要实现动画效果，每一次执行回调函数，必须要再次调用 requestAnimationFrame 方法；与 setTimeout 实现动画效果的方式是一样的，只不过不需要设置时间间隔。
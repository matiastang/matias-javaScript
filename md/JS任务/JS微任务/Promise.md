<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 10:06:35
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-18 13:55:04
 * @Description: Promise
-->
# Promise

[MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
[MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[Promise 浏览器兼容性](https://caniuse.com/?search=Promise)

## 介绍

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 stream 模式是比部署Promise更好的选择。

### 特点

### Promise的三种状态

#### Pending（进行中）

#### Resolved（已完成，又称 Fulfilled）

#### Rejected（已失败）

### 优缺点

#### 优点

#### 缺点

## 使用

## 方法

### Promise.all()

* 所有`promise`有完成（`fulfilled`或`rejected`）的时候执行`promise.resolve`。
* `promise`中有一个失败（`rejected`）的时候执行`promise.reject`。

Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 那个输入的所有promise的resolve回调的结果是一个数组。这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。

### Promise.allSettled()

* 所有`promise`有结果（`fulfilled`或`rejected`）的时候返回`promise`。

Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。

相比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个reject时立即结束。

### Promise.any()

`Promise.any` 方法和 `Promise.race` 类似——只要给定的迭代中的一个 `promise` 成功，就采用第一个 `promise` 的值作为它的返回值，但与 `Promise.race` 的不同之处在于：它会等到所有 `promise` 都失败之后，返回一个失败的 `promise` 和  `AggregateError`类型的实例，它是 `Error` 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和`Promise.all()`是相反的。

### Promise.race()

`Promise.race(iterable)` 方法返回一个 `promise`，只要迭代器中的某个`promise`解决或拒绝，返回的 `promise`就会解决或拒绝。



### Promise.reject()

### Promise.resolve()

## 原型方法

### Promise.prototype.catch()

### Promise.prototype.finally()

### Promise.prototype.then()

## Promise 原理
```js
class MyPromise {
  constructor(fn) {
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    
    this.state = 'PENDING';
    this.value = '';
    
    fn(this.resolve.bind(this), this.reject.bind(this));
    
  }
  
  resolve(value) {
    if (this.state === 'PENDING') {
      this.state = 'RESOLVED';
      this.value = value;
      
      this.resolvedCallbacks.map(cb => cb(value));   
    }
  }
  
  reject(value) {
    if (this.state === 'PENDING') {
      this.state = 'REJECTED';
      this.value = value;
      
      this.rejectedCallbacks.map(cb => cb(value));
    }
  }
  
  then(onFulfilled, onRejected) {
    if (this.state === 'PENDING') {
      this.resolvedCallbacks.push(onFulfilled);
      this.rejectedCallbacks.push(onRejected);
      
    }
    
    if (this.state === 'RESOLVED') {
      onFulfilled(this.value);
    }
    
    if (this.state === 'REJECTED') {
      onRejected(this.value);
    }
  }
}
```
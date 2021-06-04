<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-01 15:52:40
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-04 11:40:45
 * @Description: Redux
-->
# Redux

[Redux 中文文档](http://cn.redux.js.org/)
[简短的教程，可以让你领略 Flux 和 Redux 思想的精髓。(通过 Redux 的用法来理解 flux 的概念)](https://github.com/react-guide/redux-tutorial-cn#redux-tutorial)
[Redux 学习相关链接](https://cn.redux.js.org/docs/introduction/LearningResources.html)
[Redux 生态系统](https://cn.redux.js.org/docs/introduction/Ecosystem.html#library-integration-and-bindings)

在 Redux 中，不可变性被强制执行。除非您返回新值，否则您不会在屏幕上看到任何更新。

## 异步Action

Thunk middleware 并不是 Redux 处理异步 action 的唯一方式：

* 你可以使用 redux-promise 或者 redux-promise-middleware 来 dispatch Promise 来替代函数。
* 你可以使用 redux-observable 来 dispatch Observable。
* 你可以使用 redux-saga 中间件来创建更加复杂的异步 action。
* 你可以使用 redux-pack 中间件 dispatch 基于 Promise 的异步 Action。
* 你甚至可以写一个自定义的 middleware 来描述 API 请求，就像这个 真实场景的案例 中的做法一样。
你也可以先尝试一些不同做法，选择喜欢的，并使用下去，不论有没有使用到 middleware 都行。



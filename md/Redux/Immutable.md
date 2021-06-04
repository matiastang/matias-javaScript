<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-04 11:24:51
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-04 11:37:44
 * @Description: Immutable.js
-->
# Immutable.js

[Redux 中使用 Immutable.js](https://cn.redux.js.org/docs/recipes/UsingImmutableJS.html)
[Immutable.js 和函数式编程概念介绍
](https://auth0.com/blog/intro-to-immutable-js/)
[React.js 使用不可变的优点和缺点](https://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/)
[不可变的数据结构与 JavaScript](https://archive.jlongster.com/Using-Immutable-Data-Structures-in-JavaScript)

## 介绍

`不可变数据结构`即所有`更新`都返回`新值`。

由于目前 `combineReducers` 只能处理普通的 `JavaScript` 对象，对于把 `Immutable.js Map` 对象作为顶层 `state` 树的应用程序来说，可能无法使用 `combineReducers` 管理应用状态。因为很多开发者采用了 `Immutable.js`，所以涌现了大量提供类似功能的工具，例如 [`redux-immutable`](https://github.com/gajus/redux-immutable)。这个第三方包实现了一个能够处理 `Immutable Map` 数据而非普通的 `JavaScript` 对象的 `combineReducers`。

## 优点

### 保证不可变
封装在 Immutable.JS 对象中的数据永远不会发生变换（mutate）。总是会返回一个新的拷贝对象。这与 JavaScript 相反，其中一些操作不会改变数据（例如，一些数组方法，包括 map，filter，concat，forEach 等），但有一些操作会改变数据（Array 的 pop，push，splice 等）。

### 丰富的 API
Immutable.JS 提供了一组丰富的不可变对象来封装数据（例如，Maps，Lists，Sets，Records 等），以及一系列操作它们的方法，包括 sort，filter，数据分组，reverse，flatten 以及创建子集等方法。

### 高性能
Immutable.JS 在实现过程中针对性能优化做了很多工作。这是非常关键的功能，因为使用不可变的数据结构可能需要进行大量昂贵的复制。尤其是对大型复杂数据集（如嵌套的 Redux state tree(状态树)）进行不可变操作时，中间可能会产生很多拷贝对象，当浏览器的垃圾回收器清理对象时，这些拷贝对象会消耗内存并降低性能。

Immutable.JS 内部通过巧妙共享数据结构避免了这种情况，最大限度地减少了拷贝数据的情况。它还能执行复杂的操作链，而不会产生不必要的（且昂贵的）中间数据克隆，这些数据很快就会被丢弃。

你决不会看到这些，当然 - 你给 Immutable.JS 对象的数据永远不会发生变化。但是，它从 Immutable.JS 中生成的 intermediate 数据，可以通过链式调用序列中的数据进行自由的变换。因此，你可以拥有不可变数据结构的所有优势，并且不会产生任何潜在的（或很少）性能问题。

## 缺点

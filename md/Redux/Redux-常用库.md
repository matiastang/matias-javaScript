<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-04 09:45:50
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-04 11:22:49
 * @Description: Redux常用库
-->
# Redux常用库

## Action

## reducers

### Immutable.js

[Redux 中使用 Immutable.js](https://cn.redux.js.org/docs/recipes/UsingImmutableJS.html)
[React.js 使用不可变的优点和缺点](https://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/)

由于目前 `combineReducers` 只能处理普通的 `JavaScript` 对象，对于把 `Immutable.js Map` 对象作为顶层 `state` 树的应用程序来说，可能无法使用 `combineReducers` 管理应用状态。因为很多开发者采用了 `Immutable.js`，所以涌现了大量提供类似功能的工具，例如 [`redux-immutable`](https://github.com/gajus/redux-immutable)。这个第三方包实现了一个能够处理 `Immutable Map` 数据而非普通的 `JavaScript` 对象的 `combineReducers`。

### Redux Undo

[`Redux Undo`](https://github.com/omnidan/redux-undo)，它可以为你的 `Redux` 状态树中的任何部分提供撤销和重做功能。

### reduce-reducers

`reduce-reducers` 可以简化以上操作流程。它接收多个 `reducer` 然后对它们依次执行 `reduce()` 操作，并把产生的中间值依次传递给下一个 `reducer`。

## Middleware

## State

### Normalizr

因为 `API` 经常以嵌套的形式发送返回数据，所以该数据需要在引入状态树之前转化为规范化形态。[`Normalizr`](https://github.com/paularmstrong/normalizr) 库可以帮助你实现这个。你可以定义 `schema` 的类型和关系，将 `schema` 和响应数据提供给 `Normalizr`，他会输出响应数据的范式化变换。输出可以放在 `action` 中，用于 `store` 的更新。有关其用法的更多详细信息，请参阅 `Normalizr` 文档。

### dot-prop-immutable

[`dot-prop-immutable`](https://github.com/debitoor/dot-prop-immutable)

实现不可变更新

### object-path-immutable

[object-path-immutable](https://github.com/mariocasciaro/object-path-immutable)

实现不可变更新

### Redux-ORM

[`Redux-ORM`](https://github.com/tommikaikkonen/redux-orm) 库提供了一个非常有用的抽象层，用于管理 Redux store 中存储的范式化数据。它允许你声明 Model 类并且定义他们之间的关系。然后它可以为你的数据类型生成新“表”，充当用于查找数据的特殊选择器工具，并且对数据执行不可变更新。

### Redux Starter Kit

[Redux Starter Kit](https://redux-starter-kit.js.org/)

我们的 `Redux Starter Kit` 包中包含在内部使用了 `Immer` 的 `createReducer` 实用程序。 因此，您可以编写看似“变异”状态的 `Reducer`，但更新实际上是不可改变的。
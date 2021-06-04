<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-04 11:10:54
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-04 11:10:56
 * @Description: Redux-State
-->
# Redux-State

## 介绍

## 初始化

如果没有使用 combineReducers() 或者类似功能的代码，preloadedState 优先级会比在 reducer 里面使用 state = ... 高 ，这是因为 preloadedState 会做为 state 传递到 reducer 中，state 的值不再是 undefined ，ES6 的默认参数不会生效。

如果使用了 combineReducers() 方法，结果就会有一些细微的差别。那些在 preloadedState 中指明了 state 的 reducer 会以对应传入的值做为初始值。其他的 reducer 接收到的则还是 undefined 则还会使用 state = ... 指定的默认值。

**通常情况下，通过 preloadedState 指定的 state 优先级要高于通过 reducer 指定的 state。这种机制的存在允许我们在 reducer 可以通过指明默认参数来指定初始数据，而且还为通过服务端或者其它机制注入数据到 store 中提供了可能。**

**注意**：通过 preloadedState 传入了初始化数据的 reducers 仍然需要添加默认值来应对传递的 state 为 undefined 的情况。这样，当所有的 reducers 在初始化时被传入 state 的都是 undefined 时，还可以返回一些默认值，默认值可以是任何非 undefined 的值，不过也没有必要复制 preloadedState 做为其默认值。
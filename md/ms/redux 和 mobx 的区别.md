<!--
 * @Author: tangdaoyong
 * @Date: 2021-07-08 23:01:48
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-07-08 23:02:47
 * @Description: redux 和 mobx 的区别和使用场景？
-->
# redux 和 mobx 的区别和使用场景？

1.共同点：
两者都是为了解决状态不好管理，无法有效同步的问题而产生的工具。
都是用来统一管理应用状态的工具
某一个状态只有一个可靠的数据来源
操作更新的方式是统一的，并且是可控的
都支持store与react组件，如react-redux,mobx-react;
Redux
是一个JavaScript库，通过action（一个对象，包含type，和payload属性）中的type判断需要处理的数据是什么，通过payload进行数据负载，Reducer是一个纯函数，用来通过对应每一个action中的type去进行对应的store中的数据进行操作，有两个参数，第一个是store的初始值，第二个是action。store提供三个功能，1.getstate()获取数据，2.dispatch(action)监听action的分发进行数据更新，3.支持订阅store的变更（subscribe(listenner)）当数据，总而言之，当组件中使用store，可以通过getstate()获取到数据，通过dispatch(action)进行数据的更新，通过subscribe监听到数据，当对应的store中的数据也被修改时，组件中的数据也会相应改变。
在redux中纯在异步流，由于Redux对所有的store数据的变更，都应该通过action触发，异步任务（通常是业务或者是获取数据任务）也不例外，而为了不将业务或数据相关的任务混入react组件中，就需要使用其它框架配合管理异步流程，如redux-thunk,和redux-saga等。
Mobx
Mobx是一个透明函数响应式编程的状态管理库（Transparently Functional Reactive Programming,TFPR）,它使得状态管理简单可压缩：
-Mobx在action中定义改变状态的动作函数，包括如何变更状态。
-Mobx在store中集中管理状态(state)和动作(action)

Mobx和Redux的对比总结
1.redux将数据保存在单一的store中，而mobx将数据保存在分散的多个store中
2.redux使用plain object保存数据，需要手动处理变化后的操作，mobx使用observable保存数据，数据变化后自动处理响应的操作。
3.redux使用的是不可变状态，意味着状态只是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数；mobx中的状态是可变的，可以直接对其进行修改。
4.mobx相对来说比较简单，在其中有很多的抽象，mobx使用的更多的是面向对象的思维，redux会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用。
5.mobx中有更多的抽象和封装，所以调试起来会更加复杂，同时结果也更难以预测，而redux提供可以进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加容易。

关键词：
`mobx:面向对象思维、多个store、observable自动响应变化操作、mobx状态可变，直接修改、更多的抽象和封装，调试复杂，结果难以预测。`
`redux:函数式编程思想、单一store，plan object保存数据，手动处理变化后的操作、使用不可变状态，意味着状态只读，使用纯函数修改，返回的是一个新的状态、提供时间回溯的开发工具。`
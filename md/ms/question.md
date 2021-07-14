<!--
 * @Author: tangdaoyong
 * @Date: 2021-07-08 22:31:24
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-07-13 22:26:38
 * @Description: question
-->
# question

腾讯看点
一

写一个 LRU 缓存函数
写个防抖和节流函数
你们服务是怎么部署的？Node Agent 做了什么工作？
Grpc 的优缺点？
http2 的相关特性？
viewport 和移动端布局方案
实现一个 compose 函数
开发中有遇到过比较难定位的问题吗？Node 内存泄露有遇到过吗？

二

react ssr 是在什么场景下做的？
react ssr 双端怎么做构建的？区别在哪里？
有没有做过同构组件？服务端和客户端怎么同步状态的？
render 和 renderToString 的底层实现上的区别？
客户端怎么处理 JS 事件失效的问题？客户端不重新加载 JS 的情况下怎么实现？
做服务端渲染的时候有没有遇到过比较难的点？
react ssr 和 ejs 性能的差异？
服务回滚是怎么做的？上线流程是怎样的？k8s 回滚、拉取以前的镜像
webpack plugin 的原理是什么？
plugin 中有异步请求会阻塞后面的 plugin 吗？
做过哪些 webpack 的性能优化？
hard-source-webpack-plugin 是怎么做缓存的？修改文件后会怎么样？
parallel 的原理是什么？多个子进程怎么通信？
你们 webpack 是怎么做拆包的？
服务端监控是怎么做的？服务有上报过什么指标？
Node 服务怎么去定位 CPU 占用暴涨的情况？怎么去定位内存泄露？
编写 grpc 服务和 http 服务的区别？
做过哪些 react 相关的优化？函数组件怎么实现 shouldComponentUpdate？
如果有一个非常大的 react 页面，我想优先渲染某一部分，这该怎么做？
react 函数组件和 class 组件里面 state 的区别？
react useEffect 对应 class 组件的哪些生命周期？
前端的监控是怎么做的？除了 sentry 还做了其他异常处理吗？

三

讲一下你做的比较复杂的项目？以及你在项目中担当了什么角色？
你是怎么看待现在各种造轮子的？
有一个一亿长度的字符串，怎么存储设计可以让它更好去查询、修改？
怎么优化 H5 让它可以在 300ms 之内打开？
你们 WebView 加载一般耗时多久？
你们为什么从 Python 重构到 Node？好处是什么？
你是怎么看待做后台管理系统的？很多人觉得它没有难点，你觉得呢？（问这个问题是因为我现在在做后台管理系统）

总监面（有点儿记不清了）

新加坡和深圳内网是怎么连通的？
未来的职业规划是什么样的？
对当前新的技术有了解吗？
对客户端知识有了解吗？
为什么要离职？

拒了，岗位不是很喜欢
蚂蚁金服
一

React setState 怎么获取到更新后的值？异步函数中为什么 setState 会立即更新？
做过离线包吗？H5 离线包的原理？客户端根据什么拦截静态资源请求？
JS Bridge 的原理？你们这套方案的s优缺点？
怎么判断 webview 是否加载完成？
怎么实现 App 头部和页面的背景渐变？
PC 端做过比较有意义的项目？
微前端子应用之间怎么通信？有没有了解过业界的一些方案？

二

你们部署的 Jenkins 是怎么做的？
JS Bridge 原理？有没有安全漏洞？
有没有做过和安全相关的？waf 主要做了什么？
有没有做过埋点和性能上报相关？
如果你们用一个第三方的上报库，但页面加载这个 JS 失败了，还想上报该怎么办？
实现两个大数相加
实现 DOM 字符串转虚拟 DOM 对象（不能用 DOM 相关的 api）
有木有做过你觉得比较困难的项目？

三

管理系统都做了哪些业务？有没有做一些提高开发效率的东西？
常用的组件是哪个？解决了什么问题？
平时 Node 都用来做什么？怎么实现的？
SSR 的实现原理是什么？
项目中遇到的技术难点有哪些？
你觉得你们比 lazada 做得更好是哪些原因？

拼多多
一

有没有做过比较复杂的页面？携程的 React-imvc 做了什么？
使用 Redux 的好处，以及和 Mobx 的区别
对 React 最新特性有了解吗？class 组件和函数组件的区别？
useState 为什么不能放到条件语句里面？
实现一个 Promise.all
React SSR 是怎么实现的？
有用过代码规范相关的吗？Eslint 和 Prettier 冲突怎么解决？
实现一个数组转树形结构的函数

二

说几个你觉得足够复杂的项目？
你是怎么去做 React SSR 的？
有没有做过性能优化相关的？
实现一个深拷贝
实现一个二叉搜索树转链表的方法

拒了，不想去卖命
商汤
一

在工作中，主要是做什么内容？
有用过 lerna 吗？多个项目之间共用的东西怎么共享？
讲一讲微前端是怎么做的？怎么独立部署？子应用通信怎么做？
webpack 构建流程是怎样的？
webpack loader 和 plugin 的原理和区别？
webpack 热更新原理？
webpack 怎么做分包？
做过 webpack 性能优化吗？有用过 rollup 吗？
react-imvc 是什么？它做了什么？
react 和 react-dom 的区别是什么？
redux 和 mobx 的区别和优劣？用过 redux-saga 吗？
react diff 的复杂度，以及 react diff 的原理
react class 组件和 hooks 的区别？
什么是 TS 泛型？
从输入 url 到页面展示经过了哪些步骤？
讲一下重绘和回流
知道 BFC 吗？使用场景有哪些？
怎么判断是否为数组？
页面卡顿怎么去定位？
数组有10万个数据，取第一个和取第10万个的耗时多久？
有用过 canvas 相关的吗？
JS 垃圾回收机制？怎么定位 Node 内存泄露问题？
你是怎么理解前端的？
工作中遇到过最难的问题？有没有什么让你自豪的项目？
周末你都在做什么？学习前端的途径是什么？

其他公司面的差不多了，这个后续面试就都拒了

字节跳动

## 一

tcp 和 udp 的区别和使用场景？
quic 基于 udp 怎么保证可靠性？
讲一下同源策略和跨域方案？CORS 的几个头部是什么？
讲一下 react fiber？
vue 双向绑定原理？
redux 和 mobx 的区别和使用场景？
### typeof null？null instanceof Object？

[MDN typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
typeof 操作符返回一个字符串，表示未经计算的操作数的类型。
// JavaScript 诞生以来便如此
typeof null === 'Object'

[MDN instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
null instanceof Object === false

### typeof 可以判断哪些类型？instanceof 做了什么？

typeof 可以判断 undefined string boolean number bigint symbol function
不能区别Object 和null

### 实现一个 bind 函数

```js
// 定义这个方法为myBind
Function.prototype.myBind = function(thisArg) {
  if (typeof this !== 'function') {
    return;
  }
  var _self = this;
  var args = Array.prototype.slice.call(arguments, 1) //从第二个参数截取
  return function() {
    return _self.apply(thisArg, args.concat(Array.prototype.slice.call(arguments))); // 注意参数的处理
  }
}
```

不使用`apply`等`API`则需要将this挂载到传入的this上，使用完后删除

求数组里面最大连续项的和
event loop

## 二

怎么优化 h5 的加载速度？
离线包怎么更新？怎么知道需要打开哪个离线包？
js bridge 通信原理？
怎么实现 h5 页面秒开？
明明不是同一个语言，为什么 js 和 native 可以通信？
怎么实现 js bridge 跨多个 app 共用？
### grpc 相比 http 的优势？

[grpc](https://blog.csdn.net/qq_40133108/article/details/110000930)

rpc 的调用流程？前端怎么调用 grpc 的？
为什么要用 grpc？
服务发现为什么用 ip，而不用域名？
怎么做 DNS 预解析？
怎么实现移动端的布局？
iOS 下软键盘输入框遮挡遇到过问题么？怎么解决顶不起来的问题？
实现两个大数相加
求一个数组最大子项的和，要求这些子项在数组中的位置不是连续的
常用的 react hooks 方法
useState 怎么做缓存的？
react fiber 是什么？
怎么解决 useState 闭包的问题？
useReducer 比 redux 好在哪里？

## 三

做过哪些公共组件？DatePicker 怎么实现的？难点在哪里？
组件封装有哪些原则？
组件数据和 UI 怎么分离？
有没有做过一些提高工作效率的东西？
有没有了解过拖拽？觉得它有哪些难点？
有没有做过优化相关的？webpack 做了哪些优化？
### cache-loader 和 hard-source-webpack-plugin 的区别是什么？

1. HardSourceWebpackPlugin是webpack的插件，用于为模块提供中间缓存步骤。为了查看结果，您需要使用此插件运行两次webpack：第一次构建将花费正常时间。第二个版本将明显更快。适合用在开发模式development和生产模式production下。速度提升的效果是原来的好几倍。
2. cache-loader缓存加载器的编译的结果，避免重新编译。

最近遇到的比较难的项目是什么？你们服务是怎么部署的？
Puppeteer 可以用来做什么？


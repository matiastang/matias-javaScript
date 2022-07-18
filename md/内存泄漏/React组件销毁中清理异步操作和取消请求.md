<!--
 * @Author: matiastang
 * @Date: 2022-07-18 11:17:50
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-18 13:42:29
 * @FilePath: /matias-javaScript/md/内存泄漏/React组件销毁中清理异步操作和取消请求.md
 * @Description: 
-->
# 问题描述

当我们在平时切换组件的时候，会遇到这种情况，如果组件中有异步请求任务，【当接口已经发出请求，但是组件已经销毁，那么接口返回数据后
会有这么一个警告
`Warning: Can’t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.`
复制代码翻译： 警告：无法对未安装的组件执行响应状态更新。这是一个禁止操作，但它表示应用程序内存泄漏。要修复，请取消componentwillunmount方法中的所有订阅和异步任务。

[内存泄漏](https://blog.csdn.net/github_40122084/article/details/124876939)
[方案处理](https://www.zhihu.com/question/61389307)
[处理](https://dev.to/nans/an-elegant-solution-for-memory-leaks-in-react-1hol)
[React内存泄漏](https://blog.csdn.net/github_40122084/article/details/124876939)
[React: 内存泄露常见问题解决方案](https://cloud.tencent.com/developer/article/1783372)
[如何修复 React 中的内存泄漏](https://blog.csdn.net/github_40122084/article/details/124876939)
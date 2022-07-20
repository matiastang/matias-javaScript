<!--
 * @Author: matiastang
 * @Date: 2022-07-20 09:59:18
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-20 10:00:37
 * @FilePath: /matias-javaScript/md/微前端/ModuleFederation.md
 * @Description: webpack5 Module Federation
-->
# Module Federation

Module Federation是Webpack5提出的概念，module federation用来解决多个应用之间代码共享的问题，让我们更加优雅的实现跨应用的代码共享。
MF想做的事和微前端想解决的问题是类似的，把一个应用进行拆分成多个应用，每个应用可独立开发，独立部署，一个应用可以动态加载并运行另一个应用的代码，并实现应用之间的依赖共享。
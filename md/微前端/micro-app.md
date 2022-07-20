<!--
 * @Author: matiastang
 * @Date: 2022-07-20 09:59:03
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-20 11:02:22
 * @FilePath: /matias-javaScript/md/微前端/micro-app.md
 * @Description: micro-app
-->
# micro-app

single-spa是通过监听 url change 事件，在路由变化时匹配到渲染的子应用并进行渲染，这个思路也是目前实现微前端的主流方式。同时single-spa要求子应用修改渲染逻辑并暴露出三个方法：bootstrap、mount、unmount，分别对应初始化、渲染和卸载，这也导致子应用需要对入口文件进行修改。因为qiankun是基于single-spa进行封装，所以这些特点也被qiankun继承下来，并且需要对webpack配置进行一些修改。

micro-app并没有沿袭single-spa的思路，而是借鉴了WebComponent的思想，通过CustomElement结合自定义的ShadowDom，将微前端封装成一个类WebComponent组件，从而实现微前端的组件化渲染。并且由于自定义ShadowDom的隔离特性，micro-app不需要像single-spa和qiankun一样要求子应用修改渲染逻辑并暴露出方法，也不需要修改webpack配置，是目前市面上接入微前端成本最低的方案。
<!--
 * @Author: matiastang
 * @Date: 2022-07-21 10:26:05
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-21 10:35:08
 * @FilePath: /matias-javaScript/md/JavaScript/请求/ServiceWorkers.md
 * @Description: Service Workers
-->
[Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
[Cache](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache)

Service Worker API
Service workers 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用来采取适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API。

Service worker 的概念和用法
Service worker 是一个注册在指定源和路径下的事件驱动worker。它采用 JavaScript 控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。你可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现。

Service worker 运行在 worker 上下文，因此它不能访问 DOM。相对于驱动应用的主 JavaScript 线程，它运行在其他线程中，所以不会造成阻塞。它设计为完全异步，同步 API（如XHR和localStorage (en-US)）不能在 service worker 中使用。

出于安全考量，Service workers 只能由 HTTPS 承载，毕竟修改网络请求的能力暴露给中间人攻击会非常危险。在 Firefox 浏览器的用户隐私模式，Service Worker 不可用。

注意：Service workers 之所以优于以前同类尝试（如[AppCache](https://alistapart.com/article/application-cache-is-a-douchebag/)），是因为它们无法支持当操作出错时终止操作。Service workers 可以更细致地控制每一件事情。

注意：Service workers 大量使用Promise，因为通常它们会等待响应后继续，并根据响应返回一个成功或者失败的操作。Promise 非常适合这种场景。
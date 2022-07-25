<!--
 * @Author: matiastang
 * @Date: 2022-07-25 11:20:57
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 17:54:16
 * @FilePath: /matias-javaScript/md/ServiceWorkers/ServiceWorkers.md
 * @Description: Service Workers
-->
# Service Workers

[MDN Service_Worker_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
[navigator.serviceWorker.register](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerContainer/register)
[requestPermission](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission)
[Service Worker](https://segmentfault.com/a/1190000017749922)

## 要求 HTTPS 的原因

在构建 Web 应用程序时，通过 localhost 使用 Service Workers，但是一旦将其部署到生产环境中，就需要准备好 HTTPS( 这是使用HTTPS 的最后一个原因)。

使用 Service Worker，可以很容易被劫持连接并伪造响应。如果不使用 HTTPs，人的web应用程序就容易受到黑客的攻击。

为了更安全，你需要在通过 HTTPS 提供的页面上注册 Service Worker，以便知道浏览器接收的 Service Worker 在通过网络传输时未被修改。
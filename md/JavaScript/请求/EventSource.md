<!--
 * @Author: matiastang
 * @Date: 2022-07-20 17:26:06
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-20 17:26:15
 * @FilePath: /matias-javaScript/md/JavaScript/请求/EventSource.md
 * @Description: EventSource
-->
[EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)

EventSource 是服务器推送的一个网络事件接口。一个 EventSource 实例会对 HTTP 服务开启一个持久化的连接，以text/event-stream 格式发送事件，会一直保持开启直到被要求关闭。

一旦连接开启，来自服务端传入的消息会以事件的形式分发至你代码中。如果接收消息中有一个事件字段，触发的事件与事件字段的值相同。如果没有事件字段存在，则将触发通用事件。

与 WebSockets,不同的是，服务端推送是单向的。数据信息被单向从服务端到客户端分发。当不需要以消息形式将数据从客户端发送到服务器时，这使它们成为绝佳的选择。例如，对于处理社交媒体状态更新，新闻提要或将数据传递到客户端存储机制（如 IndexedDB 或 Web 存储）之类的，EventSource 无疑是一个有效方案。
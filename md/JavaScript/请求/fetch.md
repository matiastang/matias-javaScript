<!--
 * @Author: matiastang
 * @Date: 2022-07-20 17:18:21
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-21 10:25:28
 * @FilePath: /matias-javaScript/md/JavaScript/请求/fetch.md
 * @Description: fetch
-->
[fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
[Fetch 基本概念](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Basic_concepts)
[使用 Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

[Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 是大量使用 Fetch 的 API 的一个示例

fetch 规范与 jQuery.ajax() 主要有以下的不同：

* 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。
* fetch 不会发送跨域 cookie，除非你使用了 credentials 的初始化选项。（自 2018 年 8 月以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改）

备注： 当请求使用 credentials: 'include' 时，响应的 Access-Control-Allow-Origin 不能使用通配符 "*"。在这种情况下，Access-Control-Allow-Origin 必须是当前请求的源，在使用 CORS Unblock 插件的情况下请求仍会失败。
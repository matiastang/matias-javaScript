<!--
 * @Author: matiastang
 * @Date: 2022-07-25 10:50:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 11:04:47
 * @FilePath: /matias-javaScript/md/数据持久化/Cookie.md
 * @Description: Cookie
-->
# Cookie

[DOM 存储简介](https://docs.microsoft.com/zh-cn/previous-versions//cc197062(v=vs.85)?redirectedfrom=MSDN)

Cookie 只能存储 4 KB 的数据。 对于此字节总数，既可以是一个名称/值对的大小为 4 KB，也可以是最多 20 个名称/值对的总大小为 4 KB。 相比之下，DOM 存储可为每个存储区域提供大约 10 MB 的大小。

HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie主要用于以下三个方面：

会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
个性化设置（如用户自定义设置、主题等）
*　浏览器行为跟踪（如跟踪分析用户行为等）
Cookie曾一度用于客户端数据的存储，因当时并没有其它合适的存储办法而作为唯一的存储手段，但现在随着现代浏览器开始支持各种各样的存储方式，Cookie渐渐被淘汰。由于服务器指定Cookie后，浏览器的每次请求都会携带Cookie数据，会带来额外的性能开销（尤其是在移动环境下）。

cookie 类型有两种:

会话 Cookie  —  浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期Cookie不需要指定过期时间（Expires）或者有效期（Max-Age）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期Cookie也会被保留下来，就好像浏览器从来没有关闭一样。

持久 Cookie — 和关闭浏览器便失效的会话期Cookie不同，持久性Cookie可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。

当机器处于不安全环境时，切记不能通过HTTP Cookie存储、传输敏感信息，且所有浏览器都广泛支持cookie。
<!--
 * @Author: tangdaoyong
 * @Date: 2021-07-08 22:47:03
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-07-08 22:48:36
 * @Description: 查看那些网站使用了HTTP2和QUIC
-->
# 查看那些网站使用了HTTP2和QUIC

QUIC是一种新的传输 方式，与TCP相比可以减少延迟。 表面上，QUIC与在UDP上实现 的TCP + TLS + HTTP /2非常相似。由于TCP是在操作系统内核和中间件固件中实现的，所以对TCP进行重大改变几乎是不可能的。但是，由于QUIC是建立在UDP之上的，所以没有这样的限制。

QUIC相比于上述介绍的HTTP、HTTPS和HTTP2协议最大的不同就在于，其传输层采用的是UDP协议而不是TCP协议，因此其具备的特性有以下几点：

0-RTT 建联(首次建联除外)
类似TCP的可靠传输
类似TLS的加密传输，支持完美前向安全
用户空间的拥塞控制，最新的BBR算法
支持h2的基于流的多路复用， 但没有TCP的HOL问题
前向纠错FEC
类似MPTCP的Connection migration

那在实际环境中，如何知道哪些访问使用了HTTP2、哪些访问使用了QUIC协议呢？

这里就要提到chrome的一个插件——`HTTP/2 and SPDY indicator`，当下载该插件并成功访问后，我们就可以看到浏览器地址栏右侧会多一个⚡️标志：

会发现标志变为蓝色，鼠标移到该标志时，提示HTTP2已经使能，这说明在YouTube上面已经开始使用HTTP2协议了，在chrome浏览器中输入`chrome://net-internals/#http2`就可以看到具体哪些网站使用了HTTP2和QUIC：
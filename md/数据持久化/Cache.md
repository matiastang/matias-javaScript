<!--
 * @Author: matiastang
 * @Date: 2022-07-25 11:07:55
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 11:13:04
 * @FilePath: /matias-javaScript/md/数据持久化/Cache.md
 * @Description: Cache
-->
# Cache

[CacheStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage)

Cache 接口为缓存的 Request/Response 对象对提供存储机制，例如，作为 ServiceWorker 生命周期的一部分。请注意，Cache 接口像 workers 一样，是暴露在 window 作用域下的。尽管它被定义在 service worker 的标准中, 但是它不必一定要配合 service worker 使用.

一个域可以有多个命名 Cache 对象。你需要在你的脚本 (例如，在 ServiceWorker 中)中处理缓存更新的方式。除非明确地更新缓存，否则缓存将不会被更新；除非删除，否则缓存数据不会过期。使用 CacheStorage.open(cacheName) 打开一个Cache 对象，再使用 Cache 对象的方法去处理缓存.

你需要定期地清理缓存条目，因为每个浏览器都硬性限制了一个域下缓存数据的大小。缓存配额使用估算值，可以使用 StorageEstimate API 获得。浏览器尽其所能去管理磁盘空间，但它有可能删除一个域下的缓存数据。浏览器要么自动删除特定域的全部缓存，要么全部保留。确保按名称安装版本缓存，并仅从可以安全操作的脚本版本中使用缓存。查看 Deleting old caches 获取更多信息.

CacheStorage 接口表示 Cache 对象的存储。

它提供了一个 ServiceWorker，其它类型worker或者 window 范围内可以访问到的所有命名cache的主目录（它并不是一定要和 service workers 一起使用，即使它是在 service workers 规范中定义的），并维护一份字符串名称到相应 Cache 对象的映射。

使用 CacheStorage.open() 获取 Cache 实例。

使用 CacheStorage.match() 检查给定的 Request 是否是 CacheStorage 对象跟踪的任何 Cache 对象中的键。

你可以通过 caches 属性访问 CacheStorage .
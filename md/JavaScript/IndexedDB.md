<!--
 * @Author: matiastang
 * @Date: 2022-07-20 16:58:05
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-20 17:09:20
 * @FilePath: /matias-javaScript/md/JavaScript/IndexedDB.md
 * @Description: IndexedDB
-->
[IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

IndexedDB 是一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。该 API 使用索引实现对数据的高性能搜索。虽然 Web Storage 在存储较少量的数据很有用，但对于存储更大量的结构化数据来说力不从心。而 IndexedDB 提供了这种场景的解决方案。

注意：IndexedDB API 是强大的，但对于简单的情况可能看起来太复杂。如果你更喜欢一个简单的 API，请尝试  localForage、dexie.js、PouchDB、idb、idb-keyval、JsStore 或者 lovefield  之类的库，这些库使 IndexedDB 对开发者来说更加友好。

localForage：一个简单的 Polyfill，提供了简单的客户端数据存储的值语法。它在后台使用 IndexedDB，并在不支持 IndexedDB 的浏览器中回退到   WebSQL 或 localStorage。
Dexie.js：IndexedDB 的包装，通过简单的语法，可以更快地进行代码开发。
ZangoDB：类似 MongoDB 的 IndexedDB 接口，支持 MongoDB 的大多数熟悉的过滤、投影、排序、更新和聚合功能。
JsStore：一个带有 SQL 语法的 IndexedDB 包装器。
MiniMongo：由 localstorage 支持的客户端内存中的 mongodb，通过 http 进行服务器同步。MeteorJS 使用 MiniMongo。
PouchDB：使用 IndexedDB 在浏览器中实现 CouchDB 的客户端。
idb：一个微小的（〜1.15k）库，大多 API 与 IndexedDB 类似，但做了一些小的改进，让数据库的可用性得到了大大的提升。
idb-keyval：使用 IndexedDB 实现的超级简单且小巧的（~600B）基于 Promise 的键值对存储。
sifrr-storage：一个非常小的（~2kB）基于 Promise 的客户端键值数据库。基于 IndexedDB、localStorage、WebSQL 和 Cookies 实现。它可以自动选择上述支持的数据库，并按照优先顺序使用。
lovefield：Lovefield 是一个用于 Web App 的关系型数据库，使用 JavaScript 编写，可以在不同的浏览器环境中运行，提供了类似 SQL 的 API，速度快、安全且易用。
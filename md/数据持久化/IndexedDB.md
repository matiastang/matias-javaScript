<!--
 * @Author: matiastang
 * @Date: 2022-07-25 11:09:33
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 11:09:37
 * @FilePath: /matias-javaScript/md/数据持久化/IndexedDB.md
 * @Description: IndexedDB
-->
# IndexedDB

IndexedDB 是一种在用户浏览器中持久存储数据的方法。因为它允许你创建具有丰富查询功能的 Web 应用程序，无论网络可用性如何，这些应用程序都可以在线和离线工作。IndexedDB 对于存储大量数据的应用程序(例如，借出库中的 DVD 目录)和不需要持久 internet 连接才能工作的应用程序(例如，邮件客户机、待办事项列表和记事本)非常有用。

在本文中，会更详细地讨论存储数据库，因为其余的存储 Api 都是众所周知的。另外，随着 Web 应用程序的复杂性越来越高，IndexedDB 也越来越受欢迎。

IndexedDB的内部结构
IndexedDB 通过“键”来存储和检索对象。对数据库所做的所有更改都发生在事务中，像大多数 Web 存储解决方案一样，IndexedDB 遵循同源策略。因此，虽然可以访问域中存储的数据，但是不能跨不同的域访问数据。

IndexedDB 是一个 异步 API，可以在大多数上下文中使用，包括 WebWorkers。它过去也包括一个同步版本，供 Web 开发者使用，但是由于 Web 社区对它缺乏兴趣，所以从规范中删除了这个版本。

IndexedDB 曾经有一个与之竞争的规范，称为 WebSQL 数据库，但是 W3C 弃用了它。虽然 IndexedDB 和WebSQL 都是存储解决方案，但它们提供的功能不同。WebSQL 数据库是一个关系数据库访问系统，而IndexedDB 是一个索引表系统。

不要一开始就使用 IndexedDB，这依赖于你对其他类型数据库的假设。相反，应该仔细阅读文档，以下是一些需要牢记的基本概念:

IndexedDB 数据库使用 key-value 键值对储存数据  —  values 数据可以是结构非常复杂的对象，key可以是对象自身的属性。你可以对对象的某个属性创建索引（index）以实现快速查询和列举排序。key可以是二进制对象。

IndexedDB 是事务模式的数据库 —  任何操作都发生在事务(transaction)中。 IndexedDB API提供了索引(indexes)、表(tables)、指针(cursors)等等，但是所有这些必须是依赖于某种事务的。因此，你不能在事务外执行命令或者打开指针。事务(transaction)有生存周期，在生存周期以后使用它会报错。并且，事务(transaction)是自动提交的，不可以手动提交。

The IndexedDB API 基本上是异步的 — IndexedDB 的 API 不通过 return 语句返回数据，而是需要你提供一个回调函数来接受数据。执行 API 时，你不以同步（synchronous）方式对数据库进行“存储”和“读取”操作，而是向数据库发送一个操作“请求”。当操作完成时，数据库会以DOM事件的方式通知你，同时事件的类型会告诉你这个操作是否成功完成。这个过程听起来会有些复杂，但是里面是有明智的原因的。这个和 XMLHttpRequest 请求是类似的。

IndexedDB数据库“请求”无处不在 — 每一个“请求”都包含 onsuccess 和 onerror 事件属性，同时你还对 “事件” 调用 addEventListener() 和 removeEventListener()。“请求” 还包括 readyState，result 和 errorCode 属性，用来表示“请求”的状态。result 属性尤其神奇，他可以根据“请求”生成的方式变成不同的东西，例如：IDBCursor 实例、刚插入数据库的数值对应的键值（key）等。

IndexedDB是面向对象的 — indexedDB 不是用二维表来表示集合的关系型数据库,这一点非常重要，将影响你设计和建立你的应用程序。

indexedDB 不使用结构化查询语言（SQL） — 它通过索引(index)所产生的指针(cursor)来完成查询操作，从而使你可以迭代遍历到结果集合。如果你不熟悉NoSQL系统，可以参考维基百科相关文章。

IndexedDB遵循同源（same-origin）策略 — “源”指脚本所在文档URL的域名、应用层协议和端口。每一个“源”都有与其相关联的数据库。在同一个“源”内的所有数据库都有唯一、可区别的名称。

IndexedDB局限性
以下情况不适合使用IndexedDB

全球多种语言混合存储。国际化支持不好。需要自己处理。
和服务器端数据库同步。你得自己写同步代码。
全文搜索。IndexedDB 接口没有类似 SQL 语句中 LIKE 的功能。
注意，在以下情况下，数据库可能被清除:

用户请求清除数据。
浏览器处于隐私模式。最后退出浏览器的时候，数据会被清除。
硬盘等存储设备的容量到限。
数据损坏。
进行与特性不兼容的操作。
确切的环境和浏览器特性会随着时间改变，但浏览器厂商通常会遵循尽最大努力保留数据的理念。
确切的环境和浏览器特性会随着时间改变，但浏览器厂商通常会遵循尽最大努力保留数据的理念。
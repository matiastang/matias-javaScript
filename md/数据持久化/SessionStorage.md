<!--
 * @Author: matiastang
 * @Date: 2022-07-25 11:03:05
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 11:03:10
 * @FilePath: /matias-javaScript/md/数据持久化/SessionStorage.md
 * @Description: SessionStorage
-->
# SessionStorage

sessionStorage 属性允许你访问一个 session Storage 对象。它与 localStorage 相似，不同之处在于 localStorage 里面存储的数据没有过期时间设置，而存储在 sessionStorage 里面的数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话，这点和 session cookies 的运行方式不同。

应该注意的是，无论是 localStorage 还是 sessionStorage 中保存的数据都仅限于该页面的协议。
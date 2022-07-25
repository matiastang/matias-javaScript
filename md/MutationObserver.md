<!--
 * @Author: matiastang
 * @Date: 2022-07-25 10:03:07
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 10:05:34
 * @FilePath: /matias-javaScript/md/MutationObserver.md
 * @Description: MutationObserver
-->
# MutationObserver

[MutationObserver](https://github.com/qq449245884/xiaozhi/issues/10)

## 备择方案
MutationObserver 在之前还没有的，那么在 MutationObserver 还没出现之前，开发者采用什么方案呢？

这是几个可用的其他选项：

* 轮询（Polling）
* MutationEvents
* CSS animations

### 轮询（Polling）

最简单和最简单的方法是轮询。使用浏览器 setInterval 方法，可以设置一个任务，定期检查是否发生了任何更改。当然，这种方法会显著降低web 应用程序/网站的性能。

### MutationEvents

在2000年，MutationEvents API 被引入。虽然很有用，但在 DOM中 的每一次更改都会触发改变事件，这同样会导致性能问题。现在 MutationEvents API 已经被弃用，很快现代浏览器将完全停止支持它。

### CSS animations

另一个有点奇怪的选择是依赖 CSS 动画。这听起来可能有点令人困惑。基本上，我们的想法是创建一个动画，一旦元素被添加到 DOM 中，动画就会被触发。动画开始的那一刻，animationstart 事件将被触发:如果已经将事件处理程序附加到该事件，那么你将确切地知道元素何时被添加到 DOM 中。动画的执行时间周期应该很小，用户几乎看不到它。
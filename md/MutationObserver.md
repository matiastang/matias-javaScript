<!--
 * @Author: matiastang
 * @Date: 2022-07-25 10:03:07
 * @LastEditors: matiastang
 * @LastEditTime: 2023-07-26 15:14:04
 * @FilePath: /matias-javaScript/md/MutationObserver.md
 * @Description: MutationObserver
-->
# MutationObserver

[MutationObserver](https://github.com/qq449245884/xiaozhi/issues/10)

MutationObserver 是一个 JavaScript API，用于在 DOM 的结构、属性或子节点发生变化时得到通知。你可以使用它来监控 DOM 的变化。

这是一个基本的 MutationObserver 使用示例：

javascript
// 选择需要观察变动的节点  
var targetNode = document.getElementById('someElementId');  
  
// 观察器的配置（需要观察什么变化）  
var config = { attributes: true, childList: true, subtree: true };  
  
// 当观察到变化时执行的回调函数  
var callback = function(mutationsList, observer) {  
    // `mutationsList` 是所有被观察到的变化的数组  
    for (var mutation of mutationsList) {  
        if (mutation.type === 'childList') {  
            console.log('A child node has been added or removed.');  
        } else if (mutation.type === 'attributes') {  
            console.log('The ' + mutation.attributeName + ' attribute was modified.');  
        }  
    }  
};  
  
// 创建一个观察器实例并传入回调函数  
var observer = new MutationObserver(callback);  
  
// 以上面的配置开始观察目标节点  
observer.observe(targetNode, config);  
  
// 你可以随时停止观察  
observer.disconnect();
在这个例子中，我们选择了一个元素，并配置了我们希望观察的变化类型（属性变化、子节点添加或删除、子树结构变化等）。每次观察到变化时，我们都会执行一个回调函数，这个函数会接收到一个包含所有被观察到的变化的数组。

MutationObserver 是非常强大的，可以用于各种复杂的的情况，比如监控元素的属性变化、监控 AJAX 加载出的新元素等。

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
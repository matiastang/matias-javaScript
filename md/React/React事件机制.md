<!--
 * @Author: matiastang
 * @Date: 2022-07-20 15:15:06
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-20 16:42:49
 * @FilePath: /matias-javaScript/md/React/React事件机制.md
 * @Description: React事件机制
-->
# React事件机制

[原生事件](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)
[React事件机制](https://zhuanlan.zhihu.com/p/78669634)

为了避免频繁创建和释放事件对象导致性能损耗(对象创建和垃圾回收)，React使用一个事件池来负责管理事件对象，使用完的事件对象会放回池中，以备后续的复用。

这也意味着，在事件处理器同步执行完后，SyntheticEvent对象就会马上被回收，所有属性都会无效。所以一般不会在异步操作中访问SyntheticEvent事件对象。你也可以通过以下方法来保持事件对象的引用：

* 调用SyntheticEvent#persist()方法，告诉React不要回收到对象池
* 直接引用SyntheticEvent#nativeEvent, nativeEvent是可以持久引用的，不过为了不打破抽象，建议不要直接引用nativeEvent

React 原生事件的原理：合成事件（Synthetic Events）
由于虚拟 DOM 的存在，在 React 中即使绑定一个事件到原生的 DOM 节点，事件也并不是绑定在对应的节点上，而是所有的事件都是绑定在根节点上。然后由 React 统一监听和管理，获取事件后再分发到具体的虚拟 DOM 节点上。
在 React 17 之前，所有的事件都是绑定在 document 上的，而从 React 17 开始，所有的事件都绑定在整个 App 上的根节点上，这主要是为了以后页面上可能存在多版本 React 的考虑。

React 这么做的原因主要有两个:
虚拟 DOM render 的时候， DOM 很可能还没有真实地 render 到页面上，所以无法绑定事件。
React 可以屏蔽底层事件的细节，避免浏览器的兼容性问题。同时呢，对于 React Native 这种不是通过浏览器 render 的运行时，也能提供一致的 API。
由于浏览器事件的冒泡模型。无论事件在哪个节点被触发， React 都可以通过事件的 srcElement这个属性，知道它是从哪个节点开始发出的，这样 React 就可以收集管理所有的事件，然后再以一致的 API 暴露出来。
虽然自定义事件和原生事件看上去类似，但是两者的机制是完全不一样的：
原生事件是浏览器的机制；
而自定义事件则是纯粹的组件自己的行为，本质是一种回调函数机制。
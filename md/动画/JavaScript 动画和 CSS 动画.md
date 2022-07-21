<!--
 * @Author: matiastang
 * @Date: 2022-07-21 17:10:15
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-21 17:30:13
 * @FilePath: /matias-javaScript/md/动画/JavaScript 动画和 CSS 动画.md
 * @Description: JavaScript 动画和 CSS 动画
-->
# JavaScript 动画和 CSS 动画

[重要-系列好文](https://github.com/qq449245884/xiaozhi)
[JavaScript 和 CSS 动画比较](https://segmentfault.com/a/1190000017927665)

## JavaScript 动画和 CSS 动画该如果抉择
根据 Google Developer，渲染线程分为 `主线程 (main thread)` 和 `合成线程 (compositor thread)`。如果 `CSS 动画`只是改变 `transforms` 和 `opacity`，这时整个 CSS 动画得以在 `合成线程` 完成（而`JS动画`则会在 `主线程` 执行，然后触发合成线程进行下一步操作），在 JS 执行一些昂贵的任务时，主线程繁忙，CSS 动画由于使用了合成线程可以保持流畅
在许多情况下，也可以由合成线程来处理 transforms 和 opacity 属性值的更改。
对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码。
CSS动画有天然事件支持（TransitionEnd、AnimationEnd，但是它们都需要针对浏览器加前缀），JS则需要自己写事件。
如果有任何动画触发绘画，布局或两者，则需要 “主线程” 才能完成工作。 这对于基于 CSS 和 JavaScript 的动画都是如此，布局或绘制的开销可能会使与 CSS 或 JavaScript 执行相关的任何工作相形见绌，这使得问题没有实际意义。
CSS3有兼容性问题，而JS大多时候没有兼容性问题。
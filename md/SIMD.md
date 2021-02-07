<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 11:41:59
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 14:00:45
 * @Description: SIMD
-->
# SIMD

[腾讯云 SIMD](https://cloud.tencent.com/developer/section/1192077)
[MDN SIMD](https://developer.mozilla.org/en-US/docs/Glossary/SIMD)
[SIMD 单指令，多数据](http://jsrun.net/t/qgKKp)

## 介绍

`SIMD`（发音`/sim-dee/`）是`Single Instruction/Multiple Data`的缩写，意为`单指令，多数据`。它是 `JavaScript` 操作 `CPU` 对应指令的接口（`CPU`基本指令集的扩展），你可以看做这是一种不同的运算执行模式。与它相对的是 `SISD（Single Instruction/Single Data）`，即`单指令，单数据`。`SIMD` 的含义是使用一个指令，完成多个数据的运算。`SIMD` 的执行效率要高于 `SISD`，所以被广泛用于`3D`图形运算、物理模拟等运算量超大的项目之中。

**注意**[](https://github.com/tc39/ecmascript_simd)SIMD.js已从TC39中的活跃开发中撤出，并已从第3阶段中删除，Web浏览器不追求将其实施。WebAssembly中正在公开开发暴露于Web的SIMD操作，其操作基于SIMD.js操作。使用WebAssembly进行高级开发或在多个浏览器中发布时，似乎足以将asm.js用例包含在内，被认为是更广泛的用例。尽管一些开发人员已经表示有兴趣在asm.js之外使用SIMD.js，但是实现者发现，针对这种情况进行实现和优化确实会带来很多复杂性，因此决定专注于在WASM中交付WebAssembly和SIMD指令。

有关当前开发，请参见https://github.com/WebAssembly/simd。

此存储库保留SIMD.js规范工作的历史快照：

权威的API参考文档是从tc39 / spec.html生成的。您可以在http://tc39.github.io/ecmascript_simd/上查看渲染的副本。
src / ecmascript_simd.js上的polyfill，它无法实现值语义，但包括所有功能的正确实现
src / ecmascript_simd_tests.js上的广泛测试，可以使用src /中的其他文件来运行。基准和示例代码位于同一目录中。
在tc39 / SIMD-128 TC-39.pdf上介绍了动机并概述了该方法。

## 运行

[SIMD](https://stackoverflow.com/questions/33402204/how-can-i-try-out-simd-instructions-in-chrome)

我想试用SIMD(单指令多数据).从Google集团发布的内容中可以看出,人们一直在加入Google Chrome,但是当我尝试在Chrome 46中打电话给SIMD.Float32x4时,我发现SIMD未定义.
我的谷歌表明,可能有一些实验版本的Chrome具有SIMD支持.包含它的最新版本是什么,需要设置哪些命令行标志才能使用？我需要使用严格的模式吗？

什么时候SIMD可以滚动到稳定的Chrome构建？

如果我运行的是32位版本的Chrome或64位版本,还会运行SIMD指令吗？

更新：现在可以在最新版本的Chrome中添加一个标志：
--js-flags="--harmony-simd"
在Chrome快捷方式属性(即桌面上)中,“目标”字段将看起来像这样

"C:\Users\Pav\AppData\Local\Google\Chrome SxS\Application\chrome.exe" --js-flags="--harmony-simd"
老回答：

您可以在Node中尝试使用它们,然后再将其添加到Chrome(相同的JavaScript引擎)

>从https://nodejs.org/en/安装最新的节点
>运行您的JavaScript作为“节点–harmony-simd index.js”(您的index.js中的代码)
>从您的脚本打印输出,就像在Chrome控制台中使用console.log(‘BANG’)或只是记录(‘TEST 2’)

选项2

不是Chrome解决方案,但您可以在Firefox中使用SIMD.
下载具有SIMD的Firefox Nightly已经集成.浏览器之间SIMD几乎相同.

https://nightly.mozilla.org/

如果有人可以解释如何使用原生SIMD(不是现在的polyfill)来构建最新的Chromium,那么支持将是巨大的.
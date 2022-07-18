<!--
 * @Author: matiastang
 * @Date: 2022-07-18 10:40:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-18 10:45:55
 * @FilePath: /matias-javaScript/md/JS引擎.md
 * @Description: JavaScript 运行时 & JS 引擎
-->
# JavaScript 运行时

## Node

Node 和 Deno 用的 JS 引擎是 V8 (Chromium)，Bun 用的是 JavaScriptCore (Safari)，不同的引擎也有可能产生性能差异。
Zig 是一门新的系统级编程语言，相当于加强版 C 语言。Node (C++)，Deno (Rust) 和 Bun (Zig) 各用各的，非常有趣。
但 C++、Rust 和 Zig 同为系统级编程语言，都可以用 LLVM，不会造成明显的性能差异。

## Deno

[Deno](https://baijiahao.baidu.com/s?id=1719391522138609238&wfr=spider&for=pc)

## Bun

[Bun](https://www.zhihu.com/question/541820800/answer/2563671123)

# JS 引擎

## V8

## JavaScriptCore

# 我应该使用哪个？
Deno 不太可能在短期内取代Node.js，如果有的话。虽然 Node 并不完美，但正如 Deno 恰如其分地强调的那样，它具有庞大的社区和非常强大的采用率的优势。从 Node.js 迁移到 Deno 并非易事；尽管核心 JavaScript 没有改变，但您需要考虑全局变量、标准库组件和包管理方面的差异。

在可预见的未来，Node.js 可能仍然是通用 JavaScript 程序的最佳选择。有大量可用的框架、库和教程。Node 在过去几年也没有停滞不前——现在稳定支持ES6 模块和其他语言功能，如顶级await.

Deno 是 JavaScript 生态系统最前沿的新项目的更好选择。如果你正在使用 TypeScript，想要一个去中心化的包管理系统，或者你需要强大的安全控制，那么 Deno 是更合适的选择。

虽然 Deno 在宣布后的三年里引起了很多兴趣和炒作，但这还没有转化为大规模的现实世界使用。但这并不意味着你不应该使用它——Deno 现在很稳定，并得到了强大的标准库的支持。

最好根据 Node.js 和 Deno 的个别特性评估您的每个新项目，然后判断您使用哪个。尝试为每个代码库使用相同的运行时可能意味着您会错过其他平台的一些优势。

概括
Deno 是来自 Node.js 原始开发人员的年轻 JavaScript 运行时。它解决了 Node 的许多缺点，避免了完全分布式模型的集中式包管理，添加了细粒度的运行时级权限模型，并将 TypeScript 集成为一等公民。

尽管 Deno 尚未达到与 Node.js 相同的范围，但它已经是您下一个项目的一个有价值的竞争者。如果您想切换到 TypeScript 或正在开发安全关键的工作负载，则尤其如此。

现在 Deno 正在积极添加增强的 Node.js 兼容性，兴趣和采用率可能会开始增长。该杰诺的团队在努力完成全面节点仿真，可能提供了现有项目的可行途径过渡。

Deno 的动力最终可能来自外部因素，例如 TypeScript 生态系统的强劲增长。Deno 的标准库是用 TypeScript 编写的，展示了它对项目的重要性。尽管 Node.js 和 TypeScript 可以轻松集成，但您需要一个中间构建阶段将 TypeScript 源代码转换为 Node 可以执行的 JavaScript。Deno 缩短了反馈循环，从一开始就通过集成的 TypeScript 提供改进的开发人员体验。
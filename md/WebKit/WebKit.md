<!--
 * @Author: tangdaoyong
 * @Date: 2021-03-15 10:02:52
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-03-15 13:36:20
 * @Description: WebKit
-->
# WebKit

[认识 V8 引擎](https://zhuanlan.zhihu.com/p/27628685)

渲染引擎：能够将HTML/CSS/JavaScript文本及相应的资源文件转换成图像结果。渲染引擎的主要作用是将资源文件转化为用户可见的结果。在浏览器的发展过程中，不同的厂商开发了不同的渲染引擎，如Tridend(IE)、Gecko(FF)、WebKit(Safari,Chrome,Andriod浏览器)等。WebKit是由苹果2005年发起的一个开源项目，引起了众多公司的重视，几年间被很多公司所采用，在移动端更占据了垄断地位。更有甚者，开发出了基于WebKit的支持HTML5的web操作系统(如：Chrome OS、Web OS)。

下面是WebKit的大致结构：
![WebKit](../imgs/WebKit.png)

上图中实线框内模块是所有移植的共有部分，虚线框内不同的厂商可以自己实现。下面进行介绍：

操作系统：是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。WebKit也是在操作系统上工作的。
第三方库，为了WebKit提供支持，如图形库、网络库、视频库等。
WebCore 是各个浏览器使用的共享部分，包括HTML解析器、CSS解析器、DOM和SVG等。JavaScriptCore是WebKit的默认引擎，在谷歌系列产品中被替换为V8引擎。WebKit Ports是WebKit中的非共享部分，由于平台差异、第三方库和需求的不同等原因，不同的移植导致了WebKit不同版本行为不一致，它是不同浏览器性能和功能差异的关键部分。
WebKit嵌入式编程接口，供浏览器调用，与移植密切相关，不同的移植有不同的接口规范。
测试用例，包括布局测试用例和性能测试用例，用来验证渲染结果的正确性。
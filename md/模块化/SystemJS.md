<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-18 15:57:00
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-18 15:57:42
 * @Description: SystemJS
-->
# SystemJS

什么是[SystemJS](https://github.com/systemjs/systemjs) SystemJS是一个可运行于浏览器端的模块加载器，是一个polifill，可以让我们在浏览器上直接使用ES模块等先进语法，而不用管浏览器是否支持该语法。

对应的，SystemJS有一个运行于Nodejs的版本：system-node.cjs。

为什么会出现SystemJS
Chrome浏览器其实已经支持js代码中的import、export有一段时间了，语法规则为<script type="module" src="xxx"></script>。

这个特性可以让我们在浏览器端import一个js模块，例如：

//在html里
<script type="module" src="./index.js"></script>

//然后在 index.js 中可以直接使用import
import lodash from "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.min.js";
我们也可以通过名称来 import 一个 js 模块：import lodash from "lodash";，注意：本地不需要安装lodash模块，但需要我们要给这个名称做一个映射配置——importmap：

<script type="importmap">
  {
    "imports": {
      "lodash": "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.min.js" 
    }
  }
</script>
Chrome是目前唯一实现importmap的浏览器，以上写法，要开启chrome的feature标记才可以体验。在普通模式下，上述写法是会报错的。如果想要在普通模式下使用importmap，那就要用到SystemJS了。

SystemJS是一个支持importmaps和其他js未来特性的pollyfill，这意味着你可以在IE11或者任何浏览器下使用importmaps而不用等这些浏览器支持importmaps等特性。

SystemJS的几个特性
除了importmaps，SystemJS还有5个让你现在就可以使用 js 模块新特性的能力，这些特性是不能直接依赖浏览器来使用的。其中importmaps是当中最重要的一个。

importmaps。

通过1个文件加载多个js模块。正常情况下，加载一个js文件必须发起1次网络请求，如果只使用浏览器的能力，100个js文件就要发100个网络请求。通过SystemJS，允许你通过system.set 和 system.register apis，一次网络请求加载多个js文件。

检测已注册模块，通过 system.get 和 system.has，system.entries apis 可以查看所有可用的js模块。

import.meta.resolve，得到任何模块的完整url。如果浏览器不支持import.meta，可以改为使用 systemjs.contex.meta.resolve。

Import.meta.url, 返回当前模块的url。

除了js模块，SystemJS还支持其他类型模块，如下类型已经进入提案：json模块、css模块、html模块等，这些模块的加载，浏览器暂时还不支持，但是SystemJS已经支持。

如何使用SystemJS
首先，要修改script标签的type，由importmap改为systemjs-importmap。

- <script type="importmap">
+ <script type="systemjs-importmap">
  {
    "imports": {
      "lodash": "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.min.js" 
    }
  }
</script>
接着，引入模块的script也要修改type，由module改为systemjs-module。

- <script type="module" src="./index.js"></script>
+ <script type="systemjs-module" src="./index.js"></script>
除了使用systemjs-module我们还可以直接在script标签里System.import('./xxx.js');（这种写法更常见）。注意，模块导入是一个异步过程，返回的是一个Promise对象，可以配合then来使用。

然后，我们不能在模块中再使用import关键字了。
SystemJS维护它自己的js模块列表，与浏览器跟踪的js模块不一样，如果继续在浏览器使用import，浏览器识别它，并会去跟踪查明它到底是什么模块，而我们正在使用的是一个浏览器在未来才会支持的特性，所以浏览器会报错。所以我们要使用另一种只有SystemJS才能理解而不被浏览器去解析的语法System.register：

- import lodash from 'lodash';
+ System.register(['lodash'], (exports) => {
+    return {
+      setters: [
+        () => {};
+      ],
+      execute() {
+        console.log('test');
+        exports({_: lodash});
+      })
+    }
+  }
+ })
这个语法，打包工具（例如webpack或者rollup）会自动帮我们转换，省得咱们去记。

在webpack下只需要将libraryTarget设置为system即可：

// Webpack 关键配置
{
  output: {
    libraryTarget: 'system', 
  }
}
rollup中配置的是format字段：

// rollup 关键配置
output: {
    format: 'system',
},
最后，我们要在页面加载SystemJS。
使用script标签加载：

<script src="https://lib.baomitu.com/systemjs/latest/system.js"></script>
总结起来，就是我们需要：加载SystemJS、配置systemjs-importmap和systemjs-module（或者使用system.import）、加载使用 sytemjs.registry 代替 import 的 js 模块，然后刷新页面就就可以看到运行效果了。

需要注意的是：
配置 systemjs-import 的资源url时候，url对应的资源内容不能是 es6 module（有import和export）必须是es5 module。

Unable to resolve bare specifier 报错的解决
使用SystemJS的过程中，如果遇到Unable to resolve bare specifier xxx的报错，那是因为SystemJS找不到xxx对应的url。而通过importmaps ，SystemJS可以将 “bare specifier” 转换为URL，所以此时只需要配置importmap将对应的资源地址告诉SystemJS即可。

另外，以下几种行为，会触发 SystemJS 获取模块的 url：
• 直接加载模块： System.import(‘specifier’)
• 将模块作为依赖来加载：System.register([‘specifier’], …)
• 手动resolve：System.resolve(‘specifier’)

更多SystemJS错误可参考：https://github.com/systemjs/systemjs/blob/master/docs/errors.md#8
<!--
 * @Author: matiastang
 * @Date: 2022-07-25 16:11:13
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 17:09:01
 * @FilePath: /matias-javaScript/md/html/HTML的Emmet语法.md
 * @Description: HTML的Emmet语法
-->
# Emmet语法

[Emmet 官网](https://emmet.io/)

```html
    <!-- .+类名 快速生成类选择器 .a -->
    <div class="a"></div>
    <!-- #+id名 快速生成id选择器 #b -->
    <div id="b"></div>
    <!-- 标签+标签 快速生成兄弟级标签 div+img -->
    <div></div>
    <img src="" alt="">
    <!-- 标签>标签 快速生成父子级标签 ul>li -->
    <ul>
        <li></li>
    </ul>
    <!-- 上级 ul>li^bq(这个可以多个^一起写) -->
    <ul>
        <li></li>
    </ul>
    <blockquote></blockquote>
    <!-- 标签*number 快速生成number个标签 div*5 -->
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <!-- $ 自增符号 ul>li*5{$} -->
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    <li>4</li>
        <li>5</li>
    </ul>
    <!-- 标签+{内容} 快速生成内容 div{hello world} -->
    <div>hello world</div>
    <!-- 自定义属性内容：ul>li>a[href='#'] -->
    <ul>
        <li><a href="#"></a></li>
    </ul>
    <!-- 自定义属性：ul>li>test[data-content='this_is_data_value'] -->
    <ul>
        <li>
            <test data-content="this_is_data_value"></test>
        </li>
    </ul>
    <!-- shift+Alt+F——格式化文档(主要是对编写不规范的代码进行格式化，比如没对齐，没缩进等) -->
```

## Vue 中使用Emment

1、在VSCode的插件内搜索Mithril Emmet，选择并安装

2、使用
Ctrl + Shift + P
打开命令面板，输入Open Settings (JSON)，选择并进入设置的JSON格式配置页面。

3、并添加下面的键值内容（用于增加对.vue .wxml页面的扩展支持）

"emmet.includeLanguages": {
"wxml": "html",
"vue": "html"
}

vue里使用缩写，emmet不会自动弹出展开提示，在settings.json中加入：

  //显式弹出语法展开提示
  "emmet.showSuggestionsAsSnippets": true,
  //将语法展开提示在提示列表中置顶
  "editor.snippetSuggestions": "top",
  //emmet只显示标记语言和样式表的展开提示
  "emmet.showExpandedAbbreviation": "inMarkupAndStylesheetFilesOnly",
  //emmet能识别缩写语法的场景
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "vue-html": "html",
    "plaintext": "jade"

## React 中使用Emment

vscode内置emmet功能，可以用在html、jsx、css、sass、less等文件上。但是默认没有开启。

在setting中添加：

  "emmet.triggerExpansionOnTab": true,
之后，在.html文件里输入div.myclass，vscode会自动弹出提示，询问你是否展开该语法，按下tap键盘后会自动展开html，完美～

 

但是在react或vue里使用缩写，emmet不会自动弹出展开提示，我大致看了下文档emmet部分 ，解决方案如下：

在setting中添加下面几句：

  //显式弹出语法展开提示
  "emmet.showSuggestionsAsSnippets": true,
  //将语法展开提示在提示列表中置顶
  "editor.snippetSuggestions": "top",
  //emmet只显示标记语言和样式表的展开提示
  "emmet.showExpandedAbbreviation": "inMarkupAndStylesheetFilesOnly",
  //emmet能识别缩写语法的场景
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "vue-html": "html",
    "plaintext": "jade"
  
这样，在react/vue中，或模板jade里，都可以使用emmet语法了，并且提示列表里会优先显示emmet语法扩展。

 

期间遇到一个小问题，就是按下tab键无效，只能在弹出提示的时候按下enter来展开jsx，随后找到了原因：

因为我之前将vscode的go to definition的快捷键改为tab+space。由于是user设定的快捷键，优先级比默认的高，所以覆盖了emmet的tab。在我按下tab键之后，软件会继续等我按下space，而不是直接执行emmet的语法展开。

solution：将自定义的go to definition的热键删除，或换成其他键，确保不会与emmet的快捷键冲突即可。
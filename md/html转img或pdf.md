<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-05 13:58:08
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-05 14:34:19
 * @Description: html转img或pdf
-->
<!-- TOC -->

- [html转img或pdf](#html转img或pdf)
    - [命令行工具wkhtmltoimage或wkhtmltopdf](#命令行工具wkhtmltoimage或wkhtmltopdf)
        - [使用wkhtmltopdf](#使用wkhtmltopdf)
        - [问题及注意](#问题及注意)

<!-- /TOC -->
# html转img或pdf

## 命令行工具wkhtmltoimage或wkhtmltopdf

[wkhtmltopdf](https://wkhtmltopdf.org/index.html)

### 使用wkhtmltopdf

1. 下载[安装包](https://wkhtmltopdf.org/downloads.html)
2. 安装
3. 命令行使用

* `cd`到目标`.html`目录。 
```
wkhtmltoimage index.html out.png
```
* 指定引入的文件，如引入`echarts.min.js`，可以使用**相对位置**和**决定位置**引入。

```
wkhtmltoimage --allow ./js/echarts.min.js --allow ./js/data.js index.html out.png
```
* 指定优先宽度。
```
--width 0
```
* 延时
```
--javascript-delay 2000
```
* 输出调试，查找位置时使用
```
--debug-javascript
```
* 更多命令
```
wkhtmltoimage -help
wkhtmltoimage -H
```
### 问题及注意

* 使用`wkhtmltoimage`时，不要使用`ES6`的语法，反正我没生成成功。
* `echarts` 最好设置 `animation:false`，不然需要设置延迟时间也可以。
* `position`属性使用注意

```js
// 只是部分代码
var option = {
    animation: false,
    tooltip: {
        formatter: function(params) {
            // 自己编辑需要显示的`tooltip`
            return "";
        }
    }
}
// js触发`tooltip`的显示
lineBar.dispatchAction({
    type: 'showTip',
    seriesIndex: lineBarOption.series.length - 1,  // 显示第几个series
    dataIndex: data.xAxis.length - 1 // 显示第几个数据
});
// 自己定义要显示的内容
```

*说明*: 以前做的是这么一个需求：`echarts`画了个折线图，需要生成`PDF`(只是PDF的已部分，所有先要把图谱转换为img)，使用`dispatchAction`默认显示一个`tooltip`信息。后面生成的时候发现这样使用默认的`tooltip`渲染出来的没有在图谱上，而是在下方。最后发现是默认`div`是使用`position: absolute`来定位的问题。

* 不设计`position`时 PDF文档正常
* `position:static` 时 PDF 文档正常
* `position:relative` 时 PDF 文档正常
* `position:fixed` 时 PDF 文档是空白
* `position:absolute` 时 PDF 文档是空白

以上情况下在浏览器中页面显示都是正常的。

有两种解决方法，都是改用`position:relative`替换`position:absolute`

1. 还是使用默认的，只是渲染完成之后修改默认的`tooltip``div`的`position`。
2. 自己写`div`，`tooltip.formatter`返回`return "";`即，不渲染。还是调用`dispatchAction`提供默认选中效果。然后自定定义的`div`放到合适的位置。

我是采用的第二种方法，实现的当时的需求。

**注意**，因为`echarts`默认获取图片的方法，获取到的图片是不包含`tooltip`信息的，所有需要使用`wkhtmltoimage`工具来做，更何况还有其他空间也要求在图片上，不仅仅只有图谱。
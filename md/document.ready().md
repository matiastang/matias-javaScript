# document.ready & window.onload

## document.ready

执行时机：在DOM完全就绪时就可以被调用。
多次使用：在同一个文件中多次使用，一次调用。
理解：document.ready()的意思是在DOM加载完成之后执行ready()方法中的代码，换句话说，这个方法的本意是为了让代码的执行时间是在DOM加载完成之后才开始执行。
在dom文档树加载完之后执行一个函数,（注意，这里面的ready 是 DOM树加载完成，不是onload的页面资源加载完成的）
```js
// jq的写法
$(document).ready(function(){
    //do something
});
// 简写，默认document
$().ready(function(){
    //do somethin
});
// 简写
$(function(){
    //do something
});
```

**注意**原生js本身并没有提供 document.ready方法。
```js
// 方法一
document.ready = function (callback) {
    // 兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false)
            callback()
        }, false)
    }
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee)
                callback()
            }
        })
    }
    else if (document.lastChild == document.body) {
        callback()
    }
};
// 方法二
(function() {
    var ie = !!(window.attachEvent && !window.opera)
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525)//判断webkit版本
    var fn = []
    var run = function() { for (var i = 0; i < fn.length; i++) fn[i]()}
    var d = document
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener) {
            return d.addEventListener('DOMContentLoaded', f, false)
        }
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {d.documentElement.doScroll('left');run();}
                catch (err) {setTimeout(arguments.callee, 0)}
            })()
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0)
    }
})()
```

## window.onload

执行时机：在网页中所有元素(包括元素的所有关联文件)完全加载到浏览器后才执行，即JavaScript此时可以访问网页中的所有元素。
多次执行：JavaScript的onload事件一次只能保存对一个函数的引用，他会自动调用最后面的函数覆盖前面的函数。
```js
window.onload = function(){
    //do something
}
//等价于
$(window).load(function(){
    //do something
})
```

## document.ready & window.onload 区别
上面定义的document.ready方法在DOM树加载完成后就会执行，而window.onload是在页面资源（比如图片和媒体资源，它们的加载速度远慢于DOM的加载速度）加载完成之后才执行。也就是说$(document).ready要比window.onload先执行。
document.ready和window.onload的区别——JavaScript文档加载完成事件。
页面加载完成有两种事件：
一是ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。
二是onload，指示页面包含图片等文件在内的所有元素都加载完成。

$(document).ready() 里的代码是在页面内容都加载完才执行的，如果把代码直接写到script标签里，当页面加载完这个script标签就会执行里边的代码了，此时如果你标签里执行的代码调用了当前还没加载过来的代码或者dom，那么就会报错，当然如果你把script标签放到页面最后面那么就没问题了，此时和ready效果一样。
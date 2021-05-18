// document.ready = function (callback) {
//     // 兼容FF,Google
//     if (document.addEventListener) {
//         document.addEventListener('DOMContentLoaded', function () {
//             document.removeEventListener('DOMContentLoaded', arguments.callee, false)
//             callback()
//         }, false)
//     }
//     else if (document.attachEvent) {
//         document.attachEvent('onreadystatechange', function() {
//             if (document.readyState == 'complete') {
//                 document.detachEvent('onreadystatechange', arguments.callee)
//                 callback()
//             }
//         })
//     }
//     else if (document.lastChild == document.body) {
//         callback()
//     }
// };

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
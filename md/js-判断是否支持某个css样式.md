<!--
 * @Author: tangdaoyong
 * @Date: 2021-04-27 10:40:47
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-27 10:41:50
 * @Description: 判断浏览器是否支持某个css属性
-->
# 判断浏览器是否支持某个css属性

```js
/**
 * 是否是支持摸个Css属性
 */
supportCss3(style) { 
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i, 
        humpString = [], 
        htmlStyle = document.documentElement.style, 
        _toHumb = function(string) { 
            return string.replace(/-(\w)/g, function($0, $1) { 
                return $1.toUpperCase(); 
            }); 
        }; 
        
    for (i in prefix) {
        humpString.push(_toHumb(prefix[i] + '-' + style));
    } 
        
    humpString.push(_toHumb(style)); 
        
    for (i in humpString) {
        if (humpString[i] in htmlStyle) {
            return true;
        }
    }
        
    return false; 
}
```
**注意**：如果支持的话, 会输出 ""，如果不支持的话, 会输出 undefined，新版本的浏览器不用判断前缀了, 老版本的浏览器还是需要判断前缀。
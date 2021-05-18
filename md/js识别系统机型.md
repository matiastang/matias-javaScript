<!--
 * @Descripttion: 
 * @version: 
 * @Author: matias tang
 * @Date: 2020-09-25 12:19:03
 * @LastEditors: matias tang
 * @LastEditTime: 2020-09-25 12:23:27
-->
# js识别系统及机型

## 介绍

js获取设备信息有以下几种方式

使用浏览器的userAgent获取（对安卓有效）
通过屏幕尺寸判断，但是这种方式只能粗粒度的得到一组设备，不能细粒度区分。如6s和7/8 的屏幕宽高比都是一样的，所以没办法做到最细粒度区分
通过CPU压力测试，不稳定，精度不高，不推荐
获取GPU信息检测设备，该方法在iOS12.2之前没问题，但是在iOS12.2之后，苹果删除了这个信息，只能拿到Apple GPU这个标识
最后一种方式，也是目前有效的一种方法，通过webGL 信息获取，[参考这篇博客](https://51degrees.com/blog/51degrees-open-sources-gpu-renderer-technique-to-identify-apple-devices-using-ios-122-or-higher)

## 

[使用iOS 12.2或更高版本的开源GPU渲染器技术来识别Apple设备](https://51degrees.com/blog/51degrees-open-sources-gpu-renderer-technique-to-identify-apple-devices-using-ios-122-or-higher)
[51degrees/renderer](https://github.com/51degrees/renderer)